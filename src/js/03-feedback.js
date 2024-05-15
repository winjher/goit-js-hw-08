
import '../css/common.css';
import '../css/03-feedback.css';
import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const refs = {
  form: document.querySelector('.feedback-form'),
  textarea: document.querySelector('.feedback-form textarea'),
  input: document.querySelector('.feedback-form input'),
};
let formData = loadFormData();

populateTextarea();

refs.form.addEventListener('input', throttle(onInput, 500));

refs.form.addEventListener('submit', onSubmit);

function onInput(e) {
  const { name, value } = e.target;
  formData = { ...formData, [name]: value };
  saveFormData(formData);
}

function onSubmit(e) {
  e.preventDefault();
  e.currentTarget.reset();
  clearFormData();
}

function populateTextarea() {
  refs.textarea.value = formData.message || '';
  refs.input.value = formData.email || '';
}

function saveFormData(data) {
  const stringifiedData = JSON.stringify(data);
  localStorage.setItem(STORAGE_KEY, stringifiedData);
}

function loadFormData() {
  const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  return savedData;
}

function clearFormData() {
  localStorage.removeItem(STORAGE_KEY);
  formData = {};
  populateTextarea(); 
}