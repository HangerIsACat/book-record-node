
import Database from "better-sqlite3";
import { Book } from "./../entities/Book.js";

import booksJSON from "../data/books.json" assert {type: "json"};
import { Message } from "../util/Message.js";

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
      SELECT id, title, location 
      FROM books WHERE id = ?;
    `);
    
    return sql.run(bookID);;
  }

  update(bookUpdated) {
    
  }

  delete(bookID) {
    
  }

  add(book) {
    const sql = this.db.prepare(`
      INSERT INTO books(title, location) 
      VALUES(?, ?);
    `);

    sql.run(book.title, book.location);

    return Message.SUCCESS;
  }

}
