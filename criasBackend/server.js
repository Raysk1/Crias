const express = require("express");
const app = express();
const port = 3010;
const path = require("path");
const { initDatabase } = require("./src/Database");
const cors = require("cors");
const CriasController = require("./src/controllers/CriasController");
const SensoresController = require("./src/controllers/SensoresController");
const UsuarioController = require("./src/controllers/UsuarioController");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/crias/listado", async function (req, res) {
  CriasController.getAll(req, res);
});

app.post("/crias/agregar", async function (req, res) {
  CriasController.create(req, res);
});

app.get("/sensores/listado", async function (req, res) {
  SensoresController.getAll(req, res);
});

app.post("/sensores/agregar", async function (req, res) {
  SensoresController.create(req, res);
});

app.post("/login", async function (req, res) {
  UsuarioController.login(req, res);
});

app.get("/usuarios/modulos/:username", async function (req, res) {
  UsuarioController.getModulos(req, res);
});

app.post("/crias/clasificar", async function (req, res) {
  CriasController.clasificacionCarne(req, res);
});

app.get("/crias/enfermas", async function (req, res) {
  CriasController.getCriasEnfermas(req, res);
});

app.get("/crias/cuarentena", async function (req, res) {
  CriasController.getCriasEnCuarentena(req, res);
});

app.post("/crias/cuarentena/:id", async function (req, res) {
  CriasController.ponerEnCuarentena(req, res);
});


app.listen(port, () => {
  // Code.....
  console.log("The app is running on port " + port);
  initDatabase();
});
