const Database = require('./database/db');

const { subjects, weekdays, getSubject, convertHoursToMinuto } = require('./utils/format');

function pageLanding(req, res) {
  return res.render("index.html")
}

async function pageStudy(req, res) {
  const filters = req.query;

  if (!filters.subject || !filters.weekday || !filters.time) {
    return res.render("study.html", { filters, subjects, weekdays });
  }

  // converter horas em minutos
  const timeToMinutes = convertHoursToMinuto(filters.time);

  const query = `
    SELECT classes.*, proffys.* 
    FROM proffys
    JOIN classes ON (classes.proffy_id = proffys.id)
    WHERE EXISTS (
      SELECT class_schedule.*
      FROM class_schedule
      WHERE class_schedule.class_id = classes.id
      AND class_schedule.weekday = ${filters.weekday}
      AND ${timeToMinutes} BETWEEN class_schedule.time_from AND class_schedule.time_to
    )
    AND classes.subject = '${filters.subject}';
  `;

  try {
    const db = await Database;
    const proffys = await db.all(query);

    proffys.map( (proffy) => {
      proffy.subject = getSubject(proffy.subject);
    });

    return res.render("study.html", { proffys, filters, subjects, weekdays });
  } catch (error) {
    console.log(error);
  }
}

function pageGiveClasses(req, res) {
  return res.render("give-classes.html", { subjects, weekdays });
}

async function saveClasses(req, res) {
  const createProffy = require('./database/createProffy');
  
  const proffyValue = {
    name: req.body.name,
    avatar: req.body.avatar,
    whatsapp: req.body.whatsapp,
    bio: req.body.bio,
  }

  const classValue = {
    subject: req.body.subject, 
    cost: req.body.cost,
  }

  const classScheduleValues = req.body.weekday.map( (weekday, index) => {
    return {
      weekday: weekday,
      time_from: convertHoursToMinuto( req.body.time_from[index] ), 
      time_to: convertHoursToMinuto( req.body.time_to[index] )
    }
  } )

  try {
    const db = await Database;
    await createProffy(db, { proffyValue, classValue, classScheduleValues });
    let queryString = "?subject=" + req.body.subject;
    queryString += "&weekday=" + req.body.weekday;
    queryString += "&time=" + req.body.time_from;
    return res.redirect("/give-classes-success" + queryString);
  } catch (error) {
    console.log(error);
  }
}

function pageGiveClassesSuccess(req, res) {
  let queryString = "?subject=" + req.query.subject;
  queryString += "&weekday=" + req.query.weekday;
  queryString += "&time=" + req.query.time_from;
  res.render("give-classes-success.html", { queryString });
}

module.exports = {
  pageLanding,
  pageStudy,
  pageGiveClasses,
  saveClasses,
  pageGiveClassesSuccess
}