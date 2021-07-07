import Dexie from "dexie";
//import hash from "object-hash";

class AnnotationDB {
  constructor() {
    this.idb = new Dexie("NewsAppClient");

    // the following 2 lines are only for developing
    // they reset the db every time the app is started (also when refreshing)
    this.idb.delete();
    this.idb = new Dexie("NewsAppClient");

    this.idb.version(2).stores({
      meta: "authenticated", // we probably want to use cookies for this, but for now idb manages tokens
      eyetracking: "++id", // we'll use idb to remember eyetracking calibration of the used device
    });
  }

  // META
  async authenticate() {
    if (!(await this.isAuthenticated()))
      this.idb.meta.add({ authenticated: 1 });
    return null;
  }
  async isAuthenticated() {
    return this.idb.meta.get(1);
  }
}

const db = new AnnotationDB();
export default db;
