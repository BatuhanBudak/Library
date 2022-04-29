export default class Book {
    constructor(title, author, totalPages,readPages, read) {
      this.title = title;
      this.author = author;
      this.totalPages = totalPages + " pages";
      this.readPages = readPages + " pages";
      this.read = read;
    }
  }