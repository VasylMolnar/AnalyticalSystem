import './style.css';
import { addTr, addTd, formHandler } from './functions.js';

document.getElementById('addTr').addEventListener('click', addTr);
document.getElementById('addTd').addEventListener('click', addTd);
document.getElementById('criteriaForm').addEventListener('submit', formHandler);
