let myLibrary = [];

function Book(title, author, pages, read=false){
    this.title = title;
    this.author= author;
    this.pages = pages;
    this.read = read;
    
}



const formContainer = document.getElementsByClassName("form-popup");
const addBookButton = document.getElementById("new-book-button");
const cancelButton = document.getElementById("cancel");
const submitButton = document.querySelector("#submit");
const form = document.querySelector("#form-container");
const cardContainer = document.querySelector(".card-container");

form.addEventListener("submit", handleSubmit);


addBookButton.onclick = () => formContainer[0].style.display = "block";
cancelButton.onclick = () => formContainer[0].style.display = "none";

function handleSubmit(e){
    if(e.submitter.id === "cancel") return;
    e.preventDefault();
    const newBook = getFormData();

    createBookCard(newBook);
    
        function getFormData() {
            const formData = new FormData(e.target);
            const newBook = Object.fromEntries(formData);
            return newBook;
        }
   
    formContainer[0].style.display = "none";
}

function createBookCard(newBook) {
    myLibrary.push(newBook);
    const newCard = createMainCardElements();
    createCardButtonElements();
    
    function createMainCardElements() {
        const newCard = document.createElement("div");
        newCard.setAttribute("data-key", `${myLibrary.length - 1}`);
        newCard.classList.add("card");
        newCard.textContent = `${newBook["title"]} ${newBook["author"]} ${newBook["pages"]}`;
        return newCard;
    }

    function createCardButtonElements() {
        const cardDeleteButton = document.createElement("button");
        const cardReadButton = document.createElement("button");
        cardReadButton.textContent = newBook["read"] ? `${newBook["read"]}` : `Not read`;
        cardDeleteButton.textContent = "Remove";
        newCard.appendChild(cardDeleteButton);
        newCard.appendChild(cardReadButton);
        cardContainer.appendChild(newCard);
        
        cardReadButton.addEventListener("click", toggleReadValue);
        cardDeleteButton.addEventListener("click", removeCard);
    }

}

function removeCard(e){
   const parentNode = e.target.parentNode;
   parentNode.remove();
}
function toggleReadValue(e){
    e.target.textContent ==="Read"? e.target.textContent = "Not Read" : e.target.textContent = "Read";

}
