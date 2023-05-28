# Book Record REST APIs
REST API for book record web application.

### Commands (Linux)

**Install dependencies**: `npm install`

**Run** (at port 3001): `npm start`

**Debug**: Please see .vscode/launch.json for config

---

### Get all book records
**GET** [/books](http://localhost:3001/books)

### Get book record
**GET** /book/{id}
#### Required parameter
* _id_ - ID of the book to view

### Update book record
**POST** /book/{id}
#### Required parameter
* _id_ - ID of the book to update
#### Body parameters
* _title_ - Book's updated title
* _location_ - Book's updated location

### Delete book record
**DELETE** /book/{id}
#### Required parameter
* _id_ - ID of the book to delete

### Add new book record
**POST** /book
#### Body parameters
* _title_ - Book's title
* _location_ - Book's location


_**Note**: Please see BookRecord_boomerang.json for more info on the endpoints._

---

### Test
To test the APIs, install Boomerang API's extension on Google Chrome or Chromium then, go to [https://app.boomerangapi.com/](https://app.boomerangapi.com/). Then, import BookRecord_boomerang.json.
