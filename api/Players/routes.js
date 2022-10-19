const { Router } = require("express");
const route = Router();
const playersController = require("./controllers/PlayersController")

route.get('/players', playersController.getAll);

module.exports = route;