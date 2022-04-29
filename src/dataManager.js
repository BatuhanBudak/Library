import firebase from "firebase/compat/app";
import { pubsub } from "./pubsub";
import { fireStoreModule } from "./firestore";
import Book from "./Book";
import { bookCard } from "./bookCard";
import { nanoid } from "nanoid";

export const dataManager = () => {
  const handleAnonymousUserSignIn = () => {
    if (localStorage.getItem("myBooks")) {
      const books = JSON.parse(localStorage.getItem("myBooks"));
      books.forEach(({ title, author, pages, read }) => {
        const id = nanoid();
        const book = new Book(title, author, pages, read,id);
        bookCard.createBookCard(book);
      });
    } else {
      localStorage.setItem("myBooks", []);
    }
  };

  const handleSignedInUserData = (user) => {
    if (user.isAnonymous) {
      handleAnonymousUserSignIn();
    } else {
      const books = fireStoreModule.getBooksFromDb();
      books.forEach(({title, author, pages, read,id}) => {
        const book = new Book(title, author, pages, read,id);
        bookCard.createBookCard(book);
      });
    }
  };
  const handleNewBook = ({ title, author, totalPages, readPages, read,id }) => {
    if (firebase.auth().currentUser.isAnonymous) {
      const oldBooks = localStorage.getItem("myBooks");
      localStorage.setItem(
        "myBooks",
        JSON.stringify({
          ...oldBooks,
          title: title,
          author: author,
          totalPages: totalPages,
          readPages: readPages,
          read: read,
          id:id
        })
      );
    } else {
      fireStoreModule.createBookInDb(
        title,
        author,
        totalPages,
        readPages,
        read,
        
      );
    }
  };
  const handleRemoveBook = (id) => {
    if (firebase.auth().currentUser.isAnonymous) {
        const books = JSON.parse(localStorage.getItem("myBooks"));
        const newBooks = books.filter(book => book.id !== id);
        localStorage.setItem("myBooks", JSON.stringify(newBooks));
    }else{
            const allBooks = fireStoreModule.getBooksFromDb();
            const bookToDelete = allBooks.find(book => book.id === id );
            fireStoreModule.deleteBookFromDb(bookToDelete.dbId);
    }
  }

  pubsub.subscribe("userSignedIn", handleSignedInUserData);
  pubsub.subscribe("userSignedOut", handleSignedOutUser);
  pubsub.subscribe("userreSign", handleResign);
  pubsub.subscribe("newBookCreated", handleNewBook);
  pubsub.subscribe("cardRemoved", handleRemoveBook);
};
