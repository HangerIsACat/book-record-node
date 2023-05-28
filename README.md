# Book Record REST APIs
REST API for book record web application. Uses SQLite in-memory DB. It can also use an impermanent JSON-based store.

---

### Requirements
* [Node.js v18.16.0](https://nodejs.org/dist/v18.16.0/node-v18.16.0-linux-x64.tar.xz)
* npm v9.5.1 (usually bundled with Node.js)
* [Boomerang API](https://app.boomerangapi.com/) for testing (see Test section on how to setup).

---

### Commands (Linux)

**Install dependencies**: `npm install`

**Run** (at port 3001): `npm start`

**Debug**: Please see .vscode/launch.json for config

---

## Book Record APIs

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

---

## Location APIs

### Get all locations
**GET** [/locations](http://localhost:3001/locations)

### Get location
**GET** /location/{id}
#### Required parameter
* _id_ - ID of the location to view

### Update location record
**POST** /location/{id}
#### Required parameter
* _id_ - ID of the location to update
#### Body parameters
* _name_ - Location's updated name
* _parentID_ - Parent location's ID

### Delete location record
**DELETE** /location/{id}
#### Required parameter
* _id_ - ID of the location to delete

### Add new location record
**POST** /location
#### Body parameters
* _name_ - Location's name
* _parentID_ - Parent location's ID

---

_**Note**: Please see BookRecord_boomerang.json for more info on the endpoints._

---

### Test
To test the APIs, install Boomerang API's extension on Google Chrome or Chromium then, go to [https://app.boomerangapi.com/](https://app.boomerangapi.com/). Then, import BookRecord_boomerang.json.
