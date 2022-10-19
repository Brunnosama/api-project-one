const { Router } = require("express");
const route = Router();
const charactersController = require("./controllers/CharactersController")

route.get('/characters', charactersController.getAll);

module.exports = route;