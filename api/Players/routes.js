const { Router } = require("express");
const route = Router();
const PlayersController = require("./controllers/PlayersController")

//Players
route.get('/players', PlayersController.getAllPlayers);
route.get('/player/:player_id', PlayersController.getOnePlayer);
route.get('/character-of-player/:player_id', PlayersController.getCharactersByPlayer);
route.get('/sessions-of-player/:player_id', PlayersController.getSessionsByPlayer);
route.post('/player', PlayersController.createPlayer);
route.put('/edit-player/:player_id', PlayersController.editPlayer);
route.delete('/delete-player/:player_id', PlayersController.deletePlayer);



module.exports = route;