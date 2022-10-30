const { Router } = require("express");
const route = Router();
const playersController = require("./controllers/PlayersController")

route.get('/players', playersController.getAll);
route.get('/player/:playerId', playersController.getOne);
route.post('/player', playersController.createPlayer)
route.put('/edit-player/:playerId', playersController.editPlayer)
route.delete('/delete-player/:playerId', playersController.deletePlayer)

module.exports = route;