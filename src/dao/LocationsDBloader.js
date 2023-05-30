
import Database from "better-sqlite3";

import { Location } from "./../entities/Location.js";
import { Message } from "../util/Message.js";
import { Utility } from "../util/Utility.js";

import locationsJSON from "../data/locations.json" assert {type: "json"};

export class LocationsDBloader {

  // TODO: DB factory
  constructor() {

    this.db = new Database(":memory:", { verbose: console.log });

    let locationsFromJSON = locationsJSON.locations.map(
      location => new Location(location.id, location.name, location.parentID));

    this.loadDB(locationsFromJSON);

  }

  loadDB(locations) {

    this.db.exec(`
      CREATE TABLE IF NOT EXISTS locations (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        name TEXT, 
        parentID INTEGER);
    `);

    locations.forEach(location => this.add(location));
  }

  getLocations() {
    return this.db.prepare(`
      SELECT id, name, parentID FROM locations;
    `).all();
  }

  get(locationID) {
    const sql = this.db.prepare(`
      SELECT id, name, parentID FROM locations WHERE id = ?;
    `);

    const location = sql.get(locationID);

    if (Utility.checkEmpty(location)) {
      return Message.ERROR_LOCATION_ID_NOT_EXIST;
    }

    return location;
  }

  update(locUpdated) {

    const locForUpdating = this.get(locUpdated.id);

    if (Utility.checkEmpty(locForUpdating)) {
      return Message.ERROR_LOCATION_ID_NOT_EXIST;
    }
    
    if (locUpdated && locUpdated.name) {
      locForUpdating.name = locUpdated.name;
    }

    if (locUpdated && locUpdated.parentID) {
      locForUpdating.parentID = locUpdated.parentID;
    }

    const sql = this.db.prepare(`
      UPDATE locations SET name = ?, parentID = ? 
      WHERE id = ?;
    `);

    let result = sql.run(
      locForUpdating.name, 
      locForUpdating.parentID, 
      locForUpdating.id);

    if (result.changes > 0) {
      return Message.SUCCESS;

    } else {
      return Message.ERROR_BOOK_ID_NOT_EXIST;
    }

  }

  delete(locationID) {

    const sql = this.db.prepare(`
      DELETE from locations WHERE id = ?;
    `);

    let result = sql.run(locationID);

    if (result.changes > 0) {
      return Message.SUCCESS;

    } else {
      return Message.ERROR_LOCATION_ID_NOT_EXIST;
    }

  }

  add(location) {
    const sql = this.db.prepare(`
      INSERT INTO locations(name, parentID) 
      VALUES(?, ?);
    `);

    let result = sql.run(location.name, location.parentID);

    if (result.changes > 0) {
      return Message.SUCCESS;

    } else {
      return Message.ERROR_ON_INSERT;
    }

  }

}
