
import { Book } from "../entities/Book.js";
import { Message } from "../util/Message.js";
import { Utility } from "../util/Utility.js";

import booksJSON from "../data/books.json" assert {type: "json"};

export class BooksJSONloader {

  constructor() {
    this.books = booksJSON.books.map(
      book => new Book(book.id, book.title, book.location));
  }

  getBooks() {
    return this.books;
  }

  get(bookID) {
    const book = this.books.find(book => book.id == bookID);

    if (Utility.checkEmpty(book)) {
      throw new Error(Message.ERROR_BOOK_ID_NOT_EXIST);
    }

    return book;
  }

  update(bookUpdated) {
    const bookForUpdating = this.get(bookUpdated.id);

    if (Utility.checkEmpty(bookForUpdating)) {
      return Message.ERROR_BOOK_ID_NOT_EXIST;
    }
    
    if (bookUpdated && bookUpdated.title) {
      bookForUpdating.title = bookUpdated.title;
    }

    if (bookUpdated && bookUpdated.location) {
      bookForUpdating.location = bookUpdated.location;
    }

    this.books.forEach(book => {
      if (book.id === bookForUpdating.id) {
        book = bookForUpdating;
      }
    });

    return Message.SUCCESS;
  }

  delete(bookID) {

    let hasDeleted = false;

    this.books = this.books.filter(book => {

      if (book.id != bookID) {
        return book;

      } else {
        hasDeleted = true;
      }

    });

    if (hasDeleted) {
      return Message.SUCCESS;

    } else {
      return Message.ERROR_BOOK_ID_NOT_EXIST;
    }

  }

  add(book) {
    this.books.push(book);
    return Message.SUCCESS;
  }

}