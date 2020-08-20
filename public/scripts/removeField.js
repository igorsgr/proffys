document.querySelector('#remove-time')
.addEventListener('click', removeField);

function removeField() {
  
  const fieldsContainer = document.querySelectorAll('.schedule-item');
  
  if (fieldsContainer.length > 1) {
    fieldContainer = fieldsContainer[fieldsContainer.length - 1];
    document.querySelector('#schedule-itens').removeChild(fieldContainer);
  } else {
    //TODO: Implementar modal para melhorar a apresentação do alerta.
    alert("Não é possível remover o horário");
  }

}