const express = require("express");
const db = require("./database");

const app = express();
const PORT = 3000;

app.use(express.json());
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

app.listen(PORT, () => {
    console.log(`🚀 Servidor activo en http://localhost:${PORT}`);
});
