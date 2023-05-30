
import { Location } from "../entities/Location.js";
import { Message } from "../util/Message.js";
import { Utility } from "../util/Utility.js";

import locationsJSON from "../data/locations.json" assert {type: "json"};

export class LocationsJSONloader {

  constructor() {
    this.locations = locationsJSON.locations.map(
      location => new Location(location.id, location.name, location.parentID));
  }

  getLocations() {
    return this.locations;
  }

  get(locationID) {
    const location = this.locations.find(location => location.id == locationID);

    if (Utility.checkEmpty(location)) {
      throw new Error(Message.ERROR_LOCATION_ID_NOT_EXIST);
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
      // TODO: Check location parent if exist or have a location name and location parent update
      locForUpdating.parentID = locUpdated.parentID;
    }

    this.locations.forEach(location => {
      if (location.id === locForUpdating.id) {
        location = locForUpdating;
      }
    });

    return Message.SUCCESS;
  }

  delete(locationID) {

    let hasDeleted = false;

    this.locations = this.locations.filter(location => {

      if (location.id != locationID) {
        return location;

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

  add(location) {
    // TODO: Check if parent exists
    this.locations.push(location);
    return Message.SUCCESS;
  }

}