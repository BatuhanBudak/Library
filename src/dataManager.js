import { pubsub } from "./pubsub";
import { fireStoreModule } from "./firestore";
import Book from "./Book";
import { bookCard } from "./bookCard";

export const dataManager = () => {
  
  const handleAnonymousUser = () => {
    if (localStorage.getItem("myBooks")) {
        const books = JSON.parse(localStorage.getItem("myBooks"));
        books.forEach(({ title, author, pages, read }) => {
          const book = new Book(title, author, pages, read);
          bookCard.createBookCard(book);
        });
      } else {
        localStorage.setItem("myBooks", [])
      }
  }  

  const handleSignedInUser = (user) => {
    if (user.isAnonymous) {
        handleAnonymousUser();
    }else{
        fireStoreModule.getBooksFromDb();
    }
  };


  pubsub.subscribe("userSignedIn", handleSignedInUser);
  pubsub.subscribe("userSignedOut", handleSignedOutUser);
  pubsub.subscribe("userreSign", handleResign);
};
