import { pubsub } from "./pubsub";
import { bookCard } from "./bookCard";
import { nanoid } from "nanoid";
export const addNewBookForm = (() => {
  const formContainer = document.getElementsByClassName("form-popup");
  const addBookButton = document.getElementById("new-book-button");
  const cancelButton = document.getElementById("cancel");
  const submitButton = document.querySelector("#submit");
  const form = document.querySelector("#form-container");

  document.onkeydown = handleKeyboardInput;

  function handleSubmit(e) {
    if (e.submitter.id === "cancel") return;
    e.preventDefault();
    const newBook = {title: form.title.value,
        author: form.author.value,
        totalPages: form.totalPages.value,
        readPages: form.readPages.value,
        read: form.read.checked,
        id: nanoid()}
    pubsub.publish("newBookCreated",newBook);
    formContainer[0].style.display = "none";
    form.reset();
    bookCard.createBookCard(newBook);
  }

  function handleKeyboardInput(e) {
    if (e.key === "Escape") {
      formContainer[0].style.display = "none";
    }
  }
  addBookButton.onclick = () => (formContainer[0].style.display = "block");
  cancelButton.onclick = () => (formContainer[0].style.display = "none");
  form.addEventListener("submit", handleSubmit);
})();
