import { pubsub } from "./pubsub";

export const editBookFormModule = (() => {
  const editBookModal = document.querySelector(".edit-book-modal");
  const editBookForm = document.getElementById("edit-book-modal--form");
  const editBookFormTitle = document.getElementById("edit-book-title");
  const editBookFormAuthor = document.getElementById("edit-book-author");
  const editBookFormTotalPages = document.getElementById(
    "edit-book-totalPages"
  );
  const editBookFormReadPages = document.getElementById("edit-book-readPages");
  const editBookFormReadButton = document.getElementById("edit-book-read");
  const editBookFormSubmitButton = document.getElementById(
    "edit-book-submit-button"
  );
  const editBookFormCancelButton = document.getElementById(
    "edit-book-cancel-button"
  );
  const stampFormWithDataset = (dataId) => {
    editBookForm.setAttribute("data-id", dataId);
  };

  function getChildrenTextFromCard(cardToEdit) {
    const childrenText = [...cardToEdit.children]
      .slice(1, 5)
      .map((child) => child.textContent);
    const filteredText = childrenText.map((child) => {
      const semiColonIndex = child.indexOf(":");
      const text = child.slice(semiColonIndex + 2);
      return text;
    });
    return filteredText;
  }
  const getReadValueFromCard = (cardToEdit) => {
    const readValue = cardToEdit.children[5].children[1].textContent === "Read" ? true : false;
    return readValue;
  };

  const populateEditFormValues = (cardId) => {
    stampFormWithDataset(cardId);
    const allCards = document.querySelectorAll(".card");
    const cardToEdit = [...allCards].find((card) => card.id === cardId);
    const readValue = getReadValueFromCard(cardToEdit);
    const filteredText = getChildrenTextFromCard(cardToEdit);

    editBookFormTitle.value = filteredText[0];
    editBookFormAuthor.value = filteredText[1];
    editBookFormTotalPages.value = Number(filteredText[2]);
    editBookFormReadPages.value = Number(filteredText[3]);
    editBookFormReadPages.value = Number(filteredText[3]);
    editBookFormReadButton.checked = readValue;
  };

  const handleEditBookFormSubmit = (e) => {
    if (e.submitter === editBookFormCancelButton) return;
    e.preventDefault();
    const cardId = editBookForm.getAttribute("data-id");
    const allCards = document.querySelectorAll(".card");
    const cardToEditId = [...allCards].find((card) => card.id === cardId).id;
    const editedBookInfo = {
      title: editBookForm.editBookTitle.value,
      author: editBookForm.editBookAuthor.value,
      totalPages: editBookForm.editBookTotalPages.value,
      readPages: editBookForm.editBookReadPages.value,
      read: editBookForm.editBookRead.checked,
    };

    pubsub.publish("cardEditComplete", {
      cardId: cardToEditId,
      ...editedBookInfo,
    });
    editBookForm.reset();
  };
  const hideEditBookModalClicked = (e) => {
    e.preventDefault();
    pubsub.publish("hideEditBookModalClicked");
  }
  pubsub.subscribe("editCardClicked", populateEditFormValues);
  editBookForm.addEventListener("submit", handleEditBookFormSubmit);
  editBookFormCancelButton.addEventListener('click', hideEditBookModalClicked)
})();
