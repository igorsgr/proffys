document.querySelector('#add-time')
.addEventListener('click', cloneField);

function cloneField() {
  
  const fieldsContainer = document.querySelectorAll('.schedule-item');
  fieldContainer = fieldsContainer[fieldsContainer.length - 1];
    
  const valueWeekday = fieldContainer.querySelector('select').value;
  const valuesTime = fieldContainer.querySelectorAll('input');
  
  if(valueWeekday.length > 0 && valuesTime[0].value != '' && valuesTime[1].value != '') {
    const newFieldContainer = document.querySelector('.schedule-item').cloneNode(true);
    const fields = newFieldContainer.querySelectorAll('input');
    
    fields.forEach(field => {
      field.value = "";
    });
    
    document.querySelector('#schedule-itens').appendChild(newFieldContainer);
  } else {
    //TODO: Implementar modal para melhorar a apresentação do alerta.
    alert("É necessário preencher os campos de horário na tela para ser possível adicionar novos campos");
  }
}