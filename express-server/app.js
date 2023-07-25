var express = require("express"), cors = require("cors");
var app = express();
app.use(express.json());
app.use(cors());
app.listen(3000, () => console.log("Server running in port 3000"));
let noticias = [
    "Pasaporte REML", "Restitutio a integrum", "Letras de cambio", "SPC (Secured Party Creditor)"
];
app.get("/get", (req, res, next) => 
res.json(noticias.filter((c) => c.toLowerCase().indexOf(req.query.q.toString().toLowerCase()) > -1)));

let misFavoritos = [];
app.get("/favs", (req, res, next) => res.json(misFavoritos));
app.post("/favs", (req, res, next) => {
    console.log(req.body);
    misFavoritos.push(req.body.nuevo);
    res.json(misFavoritos);
})