let myLibrary = [{title: "batuhan",author:"halit",pages:100,read:true},
{title: "batuhan",author:"halit",pages:100,read:true},
{title: "batuhan",author:"halit",pages:100,read:true}];

function Book(title, author, pages, read=false){
    this.title = title;
    this.author= author;
    this.pages = pages;
    this.read = read;
    
}

function addBookToLibrary(){

}
myLibrary.forEach(book => console.dir(book));