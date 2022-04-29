import './style.css' 
import {fireBaseModule} from './firebase';
import { pubsub } from "./pubsub";
import {uiController} from "./uiController"

let myLibrary = [];


const formContainer = document.getElementsByClassName("form-popup");
const addBookButton = document.getElementById("new-book-button");
const cancelButton = document.getElementById("cancel");
const submitButton = document.querySelector("#submit");
const form = document.querySelector("#form-container");

document.onkeydown = handleKeyboardInput;

addBookButton.onclick = () => (formContainer[0].style.display = "block");
cancelButton.onclick = () => (formContainer[0].style.display = "none");
cancelButton.onkey;
form.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  if (e.submitter.id === "cancel") return;
  e.preventDefault();

  const newBook = new Book(
    form.title.value,
    form.author.value,
    form.totalPages.value,
    form.readPages.value,
    form.read.checked
  );

  myLibrary.push(newBook);
  localStorage.setItem("myBooks",JSON.stringify(myLibrary));
  createBookCard(newBook);

  formContainer[0].style.display = "none";
  form.reset();
}



function handleKeyboardInput(e) {
  if (e.key === "Escape") {
    formContainer[0].style.display = "none";
  }
}





