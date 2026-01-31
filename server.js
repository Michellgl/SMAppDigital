const express = require("express");
const session = require("express-session");
const db = require("./database");


const app = express();
const PORT = 3000;


app.use(express.json());
app.use(session({
    secret: "smapp-secret",
    resave: false,
    saveUninitialized: false
}));

app.use(express.static("./"));


app.post("/guardar-mensaje", (req, res) => {
    const { nombre, email, mensaje } = req.body;

    db.run(
        "INSERT INTO mensajes (nombre, email, mensaje) VALUES (?, ?, ?)",
        [nombre, email, mensaje],
        (err) => {
            if (err) {
                return res.status(500).json({ ok: false });
            }
            res.json({ ok: true });
        }
    );
});


app.get("/mensajes", (req, res) => {
    db.all("SELECT * FROM mensajes ORDER BY fecha DESC", [], (err, rows) => {
        res.json(rows);
    });
});

app.post("/admin-login", (req, res) => {
    const { usuario, password } = req.body;

    db.get(
        "SELECT * FROM admin WHERE usuario = ? AND password = ?",
        [usuario, password],
        (err, row) => {
            if (row) {
                req.session.admin = true;
                res.json({ ok: true });
            } else {
                res.json({ ok: false });
            }
        }
    );
});

function authAdmin(req, res, next) {
    if (req.session.admin) next();
    else res.status(401).json({ error: "No autorizado" });
}

app.get("/admin-mensajes", authAdmin, (req, res) => {
    db.all("SELECT * FROM mensajes ORDER BY fecha DESC", [], (err, rows) => {
        res.json(rows);
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor activo en http://localhost:${PORT}`);
});
