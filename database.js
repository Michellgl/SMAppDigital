const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./mensajes.db", (err) => {
    if (err) console.error(err.message);
    else console.log(" Base de datos conectada");
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

db.run(`
    CREATE TABLE IF NOT EXISTS admin (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario TEXT UNIQUE,
        password TEXT
    )
`);

// Crear admin por defecto (solo la primera vez)


db.run(`
    INSERT OR IGNORE INTO admin (usuario, password)
    VALUES ('Michell', '1234')
`);

db.run(`
    INSERT OR IGNORE INTO admin (usuario, password)
    VALUES ('admin', '1234')
`);
