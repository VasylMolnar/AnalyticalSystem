import './style.css';
import { addTr, addTd, formHandler } from './functions.js';

document.getElementById('addTr').addEventListener('click', addTr);
document.getElementById('addTd').addEventListener('click', addTd);
document.getElementById('criteriaForm').addEventListener('submit', formHandler);

const form = document.getElementById('criteriaForm');
const submitButton = document.getElementById('submitButton');

form.addEventListener('input', function () {
  const inputs = form.querySelectorAll('input');
  let formIsValid = true;

  inputs.forEach(input => {
    if (!input.value.trim()) {
      formIsValid = false;
    }
  });

  if (formIsValid) {
    submitButton.removeAttribute('disabled');
  } else {
    submitButton.setAttribute('disabled', 'disabled');
  }
});
