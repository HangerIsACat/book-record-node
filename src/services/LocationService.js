
import { LocationsDBloader } from "./../dao/LocationsDBloader.js";
import { Message } from "../util/Message.js";
import { Utility } from "../util/Utility.js";

export class LocationService {

  constructor() {
    this.locLoader = new LocationsDBloader();
  }

  getLocationsTree() {
    return this.locLoader.getLocationsTree();
  }

  getLocations() {
    return this.locLoader.getLocations();
  }

  get(locationID) {
    return this.locLoader.get(locationID);
  }

  update(location) {
    if (Utility.checkEmpty(location)) {
      return Message.ERROR_LOCATION_NULL;
    }

    return this.locLoader.update(location);
  }

  delete(locationID) {
    if (Utility.checkEmpty(locationID)) {
      return Message.ERROR_LOCATION_ID_NOT_EXIST;
    }

    return this.locLoader.delete(locationID);
  }

  add(location) {
    if (Utility.checkEmpty(location)) {
      return Message.ERROR_LOCATION_NULL;
    }
    
    return this.locLoader.add(location);
  }

}
