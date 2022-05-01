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
        
        const book = new Book(title, author, Number(totalPages),Number(readPages), Boolean(read),id);
        bookCard.createBookCard(book);
      });
    } else {
      localStorage.setItem("myBooks", []);
    }
  };

  const handleSignedInUserData = async (user) => {
    
      const books = await fireStoreModule.getBooksFromDb();
      books.forEach(({title, author, totalPages,readPages, read,id}) => {
        const book = new Book(title, author, totalPages, readPages, read,id);
        bookCard.createBookCard(book);
      });
    
  };
  const handleNewBook = ({ title, author, totalPages, readPages, read,id }) => {
    if (!firebase.auth().currentUser) {
      const oldBooks = JSON.parse(localStorage.getItem("myBooks"));
      const newBooks = [...oldBooks,{title:title, author:author, totalPages:totalPages, readPages:readPages, read:read,id:id}]
      //TODO
      localStorage.setItem(
        "myBooks",
        JSON.stringify(newBooks)
      );
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
        const newBooks = [...books].filter(book => book.id !== id);
        localStorage.setItem("myBooks", JSON.stringify(newBooks));
    }else{
            const allBooks = await fireStoreModule.getBooksFromDb();
            console.log(allBooks);
            const bookToDelete = allBooks.find(book => book.id === id );
            fireStoreModule.deleteBookFromDb(bookToDelete.dbId);
    }
  }

  pubsub.subscribe("userSignedIn", handleSignedInUserData);
  pubsub.subscribe("localUserSignedIn", handleLocalUserSignIn);
    //TODO
  // pubsub.subscribe("userSignedOut", handleSignedOutUser);
  // pubsub.subscribe("userreSign", handleResign);
  pubsub.subscribe("newBookCreated", handleNewBook);
  pubsub.subscribe("cardRemoved", handleRemoveBook);
})();
