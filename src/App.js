
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { Book } from "./entities/Book.js";
import { BookService } from "./services/BookService.js";
import { Location } from "./entities/Location.js"
import { LocationService } from "./services/LocationService.js"

const PORT = 3001;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const bookService = new BookService();
const locationService = new LocationService();

app.get("/books", (req, res) => {
  const books = bookService.getBooks();
  res.send(books);
});

app.get("/book/:id", (req, res) => {
  const books = bookService.get(req.params.id);
  console.log(books);
  
  res.send(books);
});

app.get("/book/:id", (req, res) => {
  const book = bookService.get(req.params.id);
  res.send(book);
});

app.post("/book/:id", (req, res) => {
  const message = bookService.update(
    new Book(
      req.params.id, 
      req.body.title, 
      req.body.location));

  res.send(message);
});

app.delete("/book/:id", (req, res) => {
  const message = bookService.delete(req.params.id);
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

app.get("/locations", (req, res) => {
  const locations = locationService.getLocations();
  res.send(locations);
});

app.listen(PORT, () => {
  console.log(`Server is running @ port ${PORT}`);
});

app.get("/location/:id", (req, res) => {
  const location = locationService.get(req.params.id);
  res.send(location);
});

app.post("/location/:id", (req, res) => {
  const message = locationService.update(
    new Location(
      req.params.id, 
      req.body.name, 
      parseInt(req.body.parentID)
    ));

  res.send(message);
});

app.delete("/location/:id", (req, res) => {
  const message = locationService.delete(req.params.id);
  res.send(message);
});

app.post("/location", (req, res) => {
  const location  = new Location(
    parseInt(req.body.id), 
    req.body.name, 
    req.body.parentID);

  const message = locationService.add(location);
  res.send(message);
});
