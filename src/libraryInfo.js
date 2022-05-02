import firebase from "firebase/compat/app";
import { fireStoreModule } from "./firestore";
export const libraryInfo = (() => {
  const libraryInfoButton = document.getElementById("library-info-button");
  const getBooks = async () => {
    const user = firebase.auth().currentUser;
    if (!user) {
      const allBooks = JSON.parse(localStorage.getItem("myBooks"));
      return allBooks;
    } else {
      return await fireStoreModule.getBooksFromDb();
    }
  };

  const calculateTotalBooks = (books) => books.length;
  const calculateReadBooks = (books) => {
    return books.filter((book) => book.read).length;
  };
  const calculateTotalPages = (books) => {
    return books
      .map((book) => Number(book.totalPages))
      .reduce((current, next) => current + next, 0);
  };
  const calculateReadPages = (books) => {
    return books
      .map((book) => Number(book.readPages))
      .reduce((current, next) => current + next, 0);
  };
  const createLibraryInfoModal = async () => {
    const allBooks = await getBooks();
    const previousLibrary = document.querySelector(".library-info-modal");
    if (previousLibrary) {
      document.body.removeChild(previousLibrary);
    }
    const libraryInfoModal = document.createElement("div");
    libraryInfoModal.classList.add("library-info-modal");

    const libraryInfoModalContent = document.createElement("div");
    libraryInfoModalContent.classList.add("library-info-modal--content");

    const libraryInfoModalTitle = document.createElement("h2");
    libraryInfoModalTitle.classList.add("library-info-modal--title");
    libraryInfoModalTitle.textContent = "Library Content";

    const libraryInfoModalTotalBooks = document.createElement("h3");
    libraryInfoModalTotalBooks.classList.add("library-info-modal--total-books");
    libraryInfoModalTotalBooks.textContent =
      "Total Books: " + `${calculateTotalBooks(allBooks)}`;

    const libraryInfoModalReadBooks = document.createElement("h3");
    libraryInfoModalReadBooks.classList.add("library-info-modal--read-books");
    libraryInfoModalReadBooks.textContent =
      "Read Books: " + `${calculateReadBooks(allBooks)}`;

    const libraryInfoModalTotalPages = document.createElement("h3");
    libraryInfoModalTotalPages.classList.add("library-info-modal--total-pages");
    libraryInfoModalTotalPages.textContent =
      "Total Pages: " + `${calculateTotalPages(allBooks)}`;

    const libraryInfoModalReadPages = document.createElement("h3");
    libraryInfoModalReadPages.classList.add("library-info-modal--read-pages");
    libraryInfoModalReadPages.textContent =
      "Read Pages: " + `${calculateReadPages(allBooks)}`;

    const libraryInfoModalCloseButton = document.createElement("button");
    libraryInfoModalCloseButton.classList.add(
      "library-info-modal--close-button"
    );
    libraryInfoModalCloseButton.textContent = "X";
    
    libraryInfoModalContent.appendChild(libraryInfoModalTitle);
    libraryInfoModalContent.appendChild(libraryInfoModalTotalBooks);
    libraryInfoModalContent.appendChild(document.createElement('hr'));
    libraryInfoModalContent.appendChild(libraryInfoModalReadBooks);
    libraryInfoModalContent.appendChild(document.createElement('hr'));
    libraryInfoModalContent.appendChild(libraryInfoModalTotalPages);
    libraryInfoModalContent.appendChild(document.createElement('hr'));
    libraryInfoModalContent.appendChild(libraryInfoModalReadPages);
    libraryInfoModalContent.appendChild(document.createElement('hr'));
    libraryInfoModalContent.appendChild(libraryInfoModalCloseButton);
    libraryInfoModal.appendChild(libraryInfoModalContent);
    document.body.appendChild(libraryInfoModal);

    const hideInfoModal = () => {
        libraryInfoModal.classList.add("hidden")
        }  
      document.querySelector('.library-info-modal--close-button').addEventListener('click', hideInfoModal )
};
    
  libraryInfoButton.addEventListener("click", createLibraryInfoModal);
})();
