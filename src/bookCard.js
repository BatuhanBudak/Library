import { pubsub } from "./pubsub";
export const bookCard = (() => {

    const cardContainer = document.querySelector(".card-container");
    
    function createBookCard(newBook) {
        const newCard = document.createElement("div");
        newCard.setAttribute("id", newBook.id);
        newCard.classList.add("card");
      
        const titleHeader = document.createElement("h3");
        const authorHeader = document.createElement("h3");
        const pagesHeader = document.createElement("h3");
        const cardDeleteButton = document.createElement("button");
        const cardReadButton = document.createElement("button");
      
        titleHeader.textContent = "Book: " + newBook.title;
        authorHeader.textContent = "Author: " + newBook.author;
        pagesHeader.textContent = "Pages: "+ newBook.pages;
        cardReadButton.textContent = newBook.read.checked ? `Read` : `Not read`;
        cardDeleteButton.textContent = "Remove";
      
        newCard.appendChild(titleHeader);
        newCard.appendChild(authorHeader);
        newCard.appendChild(pagesHeader);
        newCard.appendChild(cardDeleteButton);
        newCard.appendChild(cardReadButton);
        newCard.appendChild(cardDeleteButton);
        newCard.appendChild(cardReadButton);
        cardContainer.appendChild(newCard);
      
        //TODO
        // cardReadButton.addEventListener("click", toggleReadValue);
        cardDeleteButton.addEventListener("click", removeCard);
      }

      
      function removeCard(e) {
        const parentNode = e.target.parentNode;
        // myLibrary.splice(parentNode.id, 1);
        pubsub.publish("cardRemoved",parentNode.id)
        parentNode.remove();
      }
      //TODO
    //   function toggleReadValue(e) {
    //     const parentNodeId = e.target.parentNode.id;
    //     myLibrary[parentNodeId].read
    //       ? (e.target.textContent = "Not Read")
    //       : (e.target.textContent = "Read");
    //     myLibrary[parentNodeId].read = !myLibrary[parentNodeId].read;
    //   }
     
     

      return {createBookCard}
})()