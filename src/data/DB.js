const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'users.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT,
      userid INTEGER
    )
  `);
});

function addUser(username, userid) {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO users (username, userid) VALUES (?, ?)`;
    db.run(query, [username, userid], function (err) {
      if (err) {
        return reject(err);
      }
      resolve({ id: this.lastID });
    });
  });
}

function userExists(userid) {
  return new Promise((resolve, reject) => {
    const query = `SELECT COUNT(*) as count FROM users WHERE userid = ?`;
    db.get(query, [userid], (err, row) => {
      if (err) {
        return reject(err);
      }
      resolve(row.count > 0);
    });
  });
}

function getUserCount() {
  return new Promise((resolve, reject) => {
    const query = `SELECT COUNT(*) as count FROM users`;
    db.get(query, (err, row) => {
      if (err) {
        return reject(err);
      }
      resolve(row.count);
    });
  });
}

// TO-DO: Need refactor
function getAllUsers() {
  return new Promise((resolve, reject) => {
    const query = `SELECT userid FROM users`;
    db.all(query, (err, rows) => {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    });
  });
}

module.exports = {
  addUser,
  userExists,
  getUserCount,
  getAllUsers,
};