
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { Book } from "./entities/Book.js";
import { BookService } from "./services/BookService.js";

const PORT = 3001;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const bookService = new BookService();

app.get("/books", (req, res) => {
  const books = bookService.getBooks();
  res.send(books);
});

app.get("/book/:id", (req, res) => {
  let bookID = req.params.id;

  const books = bookService.get(bookID);
  console.log(books);
  
  res.send(books);
});

app.get("/book/:id", (req, res) => {
  let bookID = req.params.id;

  const book = bookService.get(bookID);
  res.send(book);
});

app.post("/book/:id", (req, res) => {
  let bookID = req.params.id;

  const message = bookService.update(
    new Book(
      bookID, 
      req.body.title, 
      req.body.location));

  res.send(message);
});

app.delete("/book/:id", (req, res) => {
  let bookID = req.params.id;

  const message = bookService.delete(bookID);
  res.send(message);
});

app.post("/book", (req, res) => {
  const book = new Book(
    parseInt(req.body.id), 
    req.body.title, 
    req.body.location);

  const message = bookService.add(book);
  res.send(message);
});

app.listen(PORT, () => {
  console.log(`Server is running @ port ${PORT}`);
});
