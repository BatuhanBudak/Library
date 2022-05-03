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
        const cardEditRemoveButtonContainer = document.createElement('div');
        cardEditRemoveButtonContainer.classList.add("card-edit-remove-button-container");
        const cardDeleteButton = document.createElement("button");
        cardDeleteButton.setAttribute('id', 'card-delete-button');
        const cardEditButton = document.createElement('button');
        cardEditButton.setAttribute('id', 'card-edit-button');
        const cardReadButton = document.createElement("button");
        const bookPageOperationButtonsContainer = document.createElement('div');
        bookPageOperationButtonsContainer.classList.add('page-operation-buttons-container');
        cardReadButton.setAttribute('id','read-book');
        const cardIncrementPageCountButton = document.createElement('button');
        cardIncrementPageCountButton.setAttribute('id','increment-pages');
        const cardDecrementPageCountButton = document.createElement('button');
        cardDecrementPageCountButton.setAttribute('id','decrement-pages');

        titleHeader.textContent = "Book: " + newBook.title;
        authorHeader.textContent = "Author: " + newBook.author;
        totalPagesHeader.textContent = "Total Pages: "+ newBook.totalPages;
        readPagesHeader.textContent = "Read Pages: "+ newBook.readPages;
        cardReadButton.textContent = newBook.read ? `Read` : `Not read`;
        cardDeleteButton.textContent = "Remove";
        cardEditButton.textContent= 'Edit';
        cardIncrementPageCountButton.textContent = "+";
        cardDecrementPageCountButton.textContent = "-";

        bookPageOperationButtonsContainer.appendChild(cardIncrementPageCountButton);
        bookPageOperationButtonsContainer.appendChild(cardReadButton);
        bookPageOperationButtonsContainer.appendChild(cardDecrementPageCountButton);
        cardEditRemoveButtonContainer.appendChild(cardEditButton)
        cardEditRemoveButtonContainer.appendChild(cardDeleteButton)
        newCard.appendChild(cardEditRemoveButtonContainer);
        newCard.appendChild(titleHeader);
        newCard.appendChild(authorHeader);
        newCard.appendChild(totalPagesHeader);
        newCard.appendChild(readPagesHeader);
        newCard.appendChild(bookPageOperationButtonsContainer);
        
        cardContainer.appendChild(newCard);
      
        //TODO
        cardReadButton.addEventListener("click", editReadValue);
        cardDeleteButton.addEventListener("click", removeCard);
        cardEditButton.addEventListener("click", editCardClicked);
      }
      //TODO
      function editReadValue(e){
        const card = document.getElementById(e.target.parentNode.parentNode.id);
        const buttonValue = card.children[5].children[1].textContent === 'Read' ? true : false;
        card.children[5].children[1].textContent = buttonValue ? `Not read`: `Read`;
        pubsub.publish("readValueEdited", {id: card.id, readValue:buttonValue });
      }
      function removeCard(e) {
        const parentNode = e.target.parentNode.parentNode;
        pubsub.publish("cardRemoved",parentNode.id)
        parentNode.remove();
      }
     
      function editCardClicked(e) {
        const parentNodeId = e.target.parentNode.parentNode.id;
        pubsub.publish('editCardClicked', parentNodeId);
       
      }
      function editCardComplete({cardId,title,
        author,
        totalPages,
        readPages,
        read}){
          const card = document.getElementById(cardId);
          card.children[1].textContent = "Book: " + title;
          card.children[2].textContent = "Author: " + author;
          card.children[3].textContent = "Total Pages: " + totalPages;
          card.children[4].textContent = "Read Pages: " + readPages;
          card.children[5].children[1].textContent = read ? `Read` : `Not read`;
      }
     
     
      pubsub.subscribe('cardEditComplete',editCardComplete );
      return {createBookCard}
})()