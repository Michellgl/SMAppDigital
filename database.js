const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./mensajes.db", (err) => {
    if (err) console.error(err.message);
    else console.log("✅ Base de datos conectada");
});

db.run(`
    CREATE TABLE IF NOT EXISTS mensajes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT,
        email TEXT,
        mensaje TEXT,
        fecha DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`);

module.exports = db;
