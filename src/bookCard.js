import { pubsub } from "./pubsub";
export const bookCard = (() => {

    const cardContainer = document.querySelector(".card-container");
    
    function createBookCard(newBook) {
        const newCard = document.createElement("div");
        newCard.setAttribute("id", newBook.id);
        newCard.classList.add("card");
      
        const titleHeader = document.createElement("h3");
        const authorHeader = document.createElement("h3");
        const totalPagesHeader = document.createElement("h3");
        const readPagesHeader = document.createElement("h3");
        const cardDeleteButton = document.createElement("button");
        const cardReadButton = document.createElement("button");
        const cardEditButton = document.createElement('button');
      
        titleHeader.textContent = "Book: " + newBook.title;
        authorHeader.textContent = "Author: " + newBook.author;
        totalPagesHeader.textContent = "Total Pages: "+ newBook.totalPages;
        readPagesHeader.textContent = "Read Pages: "+ newBook.readPages;
        cardReadButton.textContent = newBook.read ? `Read` : `Not read`;
        cardDeleteButton.textContent = "Remove";
        cardEditButton.textContent= 'Edit';
      
        newCard.appendChild(titleHeader);
        newCard.appendChild(authorHeader);
        newCard.appendChild(totalPagesHeader);
        newCard.appendChild(readPagesHeader);
        newCard.appendChild(cardReadButton);
        newCard.appendChild(cardEditButton);
        newCard.appendChild(cardDeleteButton);
        cardContainer.appendChild(newCard);
      
        //TODO
        cardReadButton.addEventListener("click", editReadValue);
        cardDeleteButton.addEventListener("click", removeCard);
        cardEditButton.addEventListener("click", editCardClicked);
      }
      //TODO
      function editReadValue(e){
        const card = document.getElementById(e.target.parentNode.id);
        const buttonValue = card.children[4].textContent === 'Read' ? true : false;
        card.children[4].textContent = buttonValue ? `Not read`: `Read`;
        pubsub.publish("readValueEdited", {id: card.id, readValue:buttonValue });
      }
      function removeCard(e) {
        const parentNode = e.target.parentNode;
        pubsub.publish("cardRemoved",parentNode.id)
        parentNode.remove();
      }
     
      function editCardClicked(e) {
        const parentNodeId = e.target.parentNode.id;
        pubsub.publish('editCardClicked', parentNodeId);
       
      }
      function editCardComplete({cardId,title,
        author,
        totalPages,
        readPages,
        read}){
          const card = document.getElementById(cardId);
          card.children[0].textContent = "Book: " + title;
          card.children[1].textContent = "Author: " + author;
          card.children[2].textContent = "Total Pages: " + totalPages;
          card.children[3].textContent = "Read Pages: " + readPages;
          card.children[4].textContent = read ? `Read` : `Not read`;
      }
     
     
      pubsub.subscribe('cardEditComplete',editCardComplete );
      return {createBookCard}
})()