
import Database from "better-sqlite3";

import { Book } from "./../entities/Book.js";
import { Message } from "../util/Message.js";
import { Utility } from "../util/Utility.js";

import booksJSON from "../data/books.json" assert {type: "json"};

export class BooksDBloader {

  constructor() {

    this.db = new Database(":memory:", { verbose: console.log });

    let booksFromJSON = booksJSON.books.map(
      book => new Book(book.id, book.title, book.location));

    this.loadDB(booksFromJSON);

  }

  loadDB(books) {

    this.db.exec(`
      CREATE TABLE IF NOT EXISTS books (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        title TEXT, 
        location TEXT);
    `);

    books.forEach(book => this.add(book));
  }

  getBooks() {
    return this.db.prepare(`
      SELECT id, title, location FROM books;
    `).all();
  }

  get(bookID) {
    const sql = this.db.prepare(`
      SELECT id, title, location FROM books WHERE id = ?;
    `);

    const book = sql.get(bookID);

    if (Utility.checkEmpty(book)) {
      return Message.ERROR_BOOK_ID_NOT_EXIST;
    }

    return book;
  }

  update(bookUpdated) {
    
    console.log(bookUpdated);

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

    const sql = this.db.prepare(`
      UPDATE books SET title = ?, location = ? 
      WHERE id = ?;
    `);

    let result = sql.run(
      bookForUpdating.title, 
      bookForUpdating.location, 
      bookForUpdating.id);

    if (result.changes > 0) {
      return Message.SUCCESS;

    } else {
      return Message.ERROR_BOOK_ID_NOT_EXIST;
    }

  }

  delete(bookID) {

    const sql = this.db.prepare(`
      DELETE from books WHERE id = ?;
    `);

    let result = sql.run(bookID);

    if (result.changes > 0) {
      return Message.SUCCESS;

    } else {
      return Message.ERROR_BOOK_ID_NOT_EXIST;
    }

  }

  add(book) {
    const sql = this.db.prepare(`
      INSERT INTO books(title, location) 
      VALUES(?, ?);
    `);

    let result = sql.run(book.title, book.location);

    if (result.changes > 0) {
      return Message.SUCCESS;

    } else {
      return Message.ERROR_ON_INSERT;
    }

  }

}
