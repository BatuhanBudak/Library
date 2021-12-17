let myLibrary = [];

function Book(title, author, pages, read=false){
    
    this.title = title;
    this.author= author;
    this.pages = pages + " pages";
    this.read = read;
}

const formContainer = document.getElementsByClassName("form-popup");
const addBookButton = document.getElementById("new-book-button");
const cancelButton = document.getElementById("cancel");
const submitButton = document.querySelector("#submit");
const form = document.querySelector("#form-container");
const cardContainer = document.querySelector(".card-container");
document.onkeydown = handleKeyboardInput;

addBookButton.onclick = () => formContainer[0].style.display = "block";
cancelButton.onclick = () => formContainer[0].style.display = "none";
cancelButton.onkey
form.addEventListener("submit", handleSubmit);




function handleSubmit(e){
    if(e.submitter.id === "cancel") return;
    e.preventDefault();
                
    const newBook = new Book(form.title.value,
                            form.author.value,
                            form.pages.value,
                            form.read.checked);
     
    createBookCard(newBook);
   
    formContainer[0].style.display = "none";
    form.reset();
}

function handleKeyboardInput(e) {
    if (e.key === 'Escape') {
        formContainer[0].style.display = "none";}
  }

function createBookCard(newBook) {
    myLibrary.push(newBook); 

    const newCard = document.createElement("div");
    
    newCard.setAttribute("id", findBookByTitle(newBook.title));
    newCard.classList.add("card");

  
    const titleHeader = document.createElement("h3");
    const authorHeader = document.createElement("h3");
    const pagesHeader = document.createElement("h3");
    const cardDeleteButton = document.createElement("button");
    const cardReadButton = document.createElement("button");

    titleHeader.textContent = newBook.title;
    authorHeader.textContent = newBook.author;
    pagesHeader.textContent = newBook.pages;
    cardReadButton.textContent = newBook.read.checked ? `Read` : `Not read`; // .checked e bakarak bu değerleri ata bool donruyor
    cardDeleteButton.textContent = "Remove";

    newCard.appendChild(titleHeader);
    newCard.appendChild(authorHeader);
    newCard.appendChild(pagesHeader);
    newCard.appendChild(cardDeleteButton);
    newCard.appendChild(cardReadButton);
    newCard.appendChild(cardDeleteButton);
    newCard.appendChild(cardReadButton);
    cardContainer.appendChild(newCard);
    
    cardReadButton.addEventListener("click", toggleReadValue);
    cardDeleteButton.addEventListener("click", removeCard);
    
}

function removeCard(e){
  const parentNode = e.target.parentNode;
  myLibrary.splice(parentNode.id,1);
  parentNode.remove();
}

function toggleReadValue(e){
    const parentNodeId = e.target.parentNode.id;
    myLibrary[parentNodeId].read ? e.target.textContent = "Not Read" : e.target.textContent = "Read";
    myLibrary[parentNodeId].read = !myLibrary[parentNodeId].read;
}

function findBookByTitle(title) {
    return myLibrary.findIndex((book) =>  book.title === title)
};


