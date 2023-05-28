
import { BooksDBloader } from "../dao/BooksDBloader.js";
import { Message } from "../util/Message.js";
import { Utility } from "../util/Utility.js";

export class BookService {

  constructor() {
    this.bookLoader = new BooksDBloader();
  }

  getBooks() {
    return this.bookLoader.getBooks();
  }

  get(bookID) {
    return this.bookLoader.get(bookID);
  }

  update(book) {
    if (Utility.checkEmpty(book)) {
      return Message.ERROR_BOOK_NULL;
    }

    return this.bookLoader.update(book);
  }

  delete(bookID) {
    if (Utility.checkEmpty(bookID)) {
      return Message.ERROR_BOOK_ID_NOT_EXIST;
    }

    return this.bookLoader.delete(bookID);
  }

  add(book) {
    if (Utility.checkEmpty(book)) {
      return Message.ERROR_BOOK_NULL;
    }
    
    return this.bookLoader.add(book);
  }

}
