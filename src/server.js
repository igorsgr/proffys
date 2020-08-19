// Servidor
const express = require('express');
const server = express();
const {pageLanding, pageStudy, pageGiveClasses, saveClasses, pageGiveClassesSuccess} = require('./pages');

//configurar nunjucks (tenplate engine)
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
  express: server,
  noCache: true,
})

// Início e configuração do servidor
server
// receber os dados do req.body
.use(express.urlencoded({ extended: true }))
// configurar arquivos estáticos (css, scripts, imagens)
.use(express.static("public"))
// rotas da aplicação
.get("/", pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
.post("/save-classes", saveClasses)
.get("/give-classes-success", pageGiveClassesSuccess)
// Start do servidor
.listen(5500)