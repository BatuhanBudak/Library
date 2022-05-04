import firebase from "firebase/compat/app";
import { pubsub } from "./pubsub";
import { fireStoreModule } from "./firestore";
import Book from "./Book";
import { bookCard } from "./bookCard";

export const dataManager = (() => {
  const handleLocalUserSignIn = () => {
    if (localStorage.getItem("myBooks")) {
      const books = JSON.parse(localStorage.getItem("myBooks"));
      books.forEach(({ title, author, totalPages, readPages, read, id }) => {
        const book = new Book(
          title,
          author,
          Number(totalPages),
          Number(readPages),
          Boolean(read),
          id
        );
        bookCard.createBookCard(book);
      });
    } else {
      localStorage.setItem("myBooks", []);
    }
  };

  const handleSignedInUserData = async () => {
    const books = await fireStoreModule.getBooksFromDb();
    books.forEach(({ title, author, totalPages, readPages, read, id }) => {
      const book = new Book(title, author, totalPages, readPages, read, id);
      bookCard.createBookCard(book);
    });
  };
  const handleNewBook = ({
    title,
    author,
    totalPages,
    readPages,
    read,
    id,
  }) => {
    if (!firebase.auth().currentUser) {
      const oldBooks = JSON.parse(localStorage.getItem("myBooks"));
      const newBooks = [
        ...oldBooks,
        {
          title: title,
          author: author,
          totalPages: totalPages,
          readPages: readPages,
          read: read,
          id: id,
        },
      ];
      localStorage.setItem("myBooks", JSON.stringify(newBooks));
    } else {
      fireStoreModule.createBookInDb(
        title,
        author,
        totalPages,
        readPages,
        read,
        id
      );
    }
  };
  const handleRemoveBook = async (id) => {
    if (!firebase.auth().currentUser) {
      const books = JSON.parse(localStorage.getItem("myBooks"));
      const newBooks = [...books].filter((book) => book.id !== id);
      localStorage.setItem("myBooks", JSON.stringify(newBooks));
    } else {
      const allBooks = await fireStoreModule.getBooksFromDb();
      const bookToDelete = allBooks.find((book) => book.id === id);
      fireStoreModule.deleteBookFromDb(bookToDelete.dbId);
    }
  };
  const handleEditReadValue = async ({ id, readValue }) => {
    if (!firebase.auth().currentUser) {
      const allBooks = JSON.parse(localStorage.getItem("myBooks"));
      const editedBooks = [...allBooks].map((book) => {
        if (book.id === id) {
          return {
            ...book,
            read: !readValue,
          };
        } else {
          return book;
        }
      });
      localStorage.setItem("myBooks", JSON.stringify(editedBooks));
    } else {
      const allBooks = await fireStoreModule.getBooksFromDb();
      const bookToDUpdateId = allBooks.find((book) => book.id === id).dbId;
      await fireStoreModule.updateBookReadValueInDb(
        bookToDUpdateId,
        !readValue
      );
    }
  };

  async function editBookInDb(
    bookId,
    title,
    author,
    totalPages,
    readPages,
    read
  ) {
    const allBooks = await fireStoreModule.getBooksFromDb();
    const bookToDUpdateId = allBooks.find((book) => book.id === bookId).dbId;
    await fireStoreModule.updateBookInDb(
      bookToDUpdateId,
      title,
      author,
      totalPages,
      readPages,
      read
    );
  }

  function editLocalBook(bookId, title, author, totalPages, readPages, read) {
    const allBooks = JSON.parse(localStorage.getItem("myBooks"));
    const editedBooks = [...allBooks].map((book) => {
      if (book.id === bookId) {
        return {
          ...book,
          title: title,
          author: author,
          totalPages: totalPages,
          readPages: readPages,
          read: read,
        };
      } else {
        return book;
      }
    });
    localStorage.setItem("myBooks", JSON.stringify(editedBooks));
  }

  const handleEditBook = async ({
    cardId: bookId,
    title,
    author,
    totalPages,
    readPages,
    read,
  }) => {
    const user = firebase.auth().currentUser;
    if (!user) {
      editLocalBook(bookId, title, author, totalPages, readPages, read);
    } else {
      await editBookInDb(bookId, title, author, totalPages, readPages, read);
    }
  };

  const updateReadPagesLocalBook = (id, newReadPagesValue) => {
    const allBooks = JSON.parse(localStorage.getItem("myBooks"));
    const editedBooks = [...allBooks].map((book) => {
      if (book.id === id) {
        return {
          ...book,
          readPages: newReadPagesValue,
        };
      } else {
        return book;
      }
    });
    localStorage.setItem("myBooks", JSON.stringify(editedBooks));
  };

  const updateReadPagesValue = async ({ cardId, newReadPagesValue }) => {
    const user = firebase.auth().currentUser;
    if (!user) {
      updateReadPagesLocalBook(cardId, newReadPagesValue);
    } else {
      const allBooks = await fireStoreModule.getBooksFromDb();
      const bookToEdit = allBooks.find((book) => book.id === cardId);
      await fireStoreModule.updateReadPagesValueInDb(
        bookToEdit.dbId,
        newReadPagesValue
      );
    }
  };

  const handleSignedOutUser = () => {
    handleLocalUserSignIn();
  };

  const handleResign = () => {
    handleSignedInUserData();
  };

  pubsub.subscribe("userSignedIn", handleSignedInUserData);
  pubsub.subscribe("localUserSignedIn", handleLocalUserSignIn);
  pubsub.subscribe("userSignedOut", handleSignedOutUser);
  pubsub.subscribe("userreSign", handleResign);
  pubsub.subscribe("newBookCreated", handleNewBook);
  pubsub.subscribe("cardRemoved", handleRemoveBook);
  pubsub.subscribe("cardEditComplete", handleEditBook);
  pubsub.subscribe("readValueEdited", handleEditReadValue);
  pubsub.subscribe("incrementReadPagesComplete", updateReadPagesValue);
  pubsub.subscribe("decrementReadPagesComplete", updateReadPagesValue);
})();
