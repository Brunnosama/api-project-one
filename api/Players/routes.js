const { Router } = require("express");
const route = Router();
const playersController = require("./controllers/PlayersController")

//Players
route.get('/players', playersController.getAll);
route.get('/player/:playerId', playersController.getOne);
route.post('/player', playersController.createPlayer)
route.put('/edit-player/:playerId', playersController.editPlayer)
route.delete('/delete-player/:playerId', playersController.deletePlayer)

//Characters
route.get("/player/:player_id/character/:character_id", playersController.getCharacter);
route.post("/character/:player_id/player", playersController.createCharacter);

module.exports = route;