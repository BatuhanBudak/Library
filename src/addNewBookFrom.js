import { pubsub } from "./pubsub";
import { bookCard } from "./bookCard";
import { nanoid } from "nanoid";
import { customFormValidation } from "./customFormValidation";

export const addNewBookForm = (() => {
  const formContainer = document.getElementsByClassName("form-popup");
  const addBookButton = document.getElementById("new-book-button");
  const cancelButton = document.getElementById("cancel");
  const form = document.querySelector("#form-container");

  document.onkeydown = handleKeyboardInput;

  function handleSubmit(e) {
    e.preventDefault();

    let hasErrors = customFormValidation.checkForErrors(form);
    // If there are errrors, don't submit form and focus on first element with error
    if (hasErrors) {
      e.preventDefault();
      hasErrors.focus();
    } else {
      const newBook = {
        title: form.title.value,
        author: form.author.value,
        totalPages: form.totalPages.value,
        readPages: form.readPages.value,
        read: form.read.checked,
        id: nanoid(),
      };
      pubsub.publish("newBookCreated", newBook);
      formContainer[0].style.display = "none";
      form.reset();
      bookCard.createBookCard(newBook);
    }
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
