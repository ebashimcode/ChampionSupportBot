const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

class DatabaseInterface {
  constructor() {
    this.initializeDatabase();
  }

  async initializeDatabase() {
    try {
      this.db = await open({
        filename: 'src/database.db',
        driver: sqlite3.Database,
      });

      await this.db.run(`CREATE TABLE IF NOT EXISTS Users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username VARCHAR(33),
        userId INTEGER UNIQUE
      );`);
    } catch (error) {
      console.error('Error initializing database:', error);
    }
  }

  async performQuery(query, params) {
    try {
      return await this.db.run(query, params);
    } catch (error) {
      console.error('Error performing query:', error);
    }
  }
}

module.exports = new DatabaseInterface();