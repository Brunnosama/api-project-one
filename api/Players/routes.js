const { Router } = require("express");
const route = Router();
const PlayersController = require("./controllers/PlayersController")

//Players
route.get('/active-players', PlayersController.getAllActivePlayers);
route.get('/active-player/:player_id', PlayersController.getOneActivePlayer);
route.get('/players', PlayersController.getAllPlayers);
route.get('/player/:player_id', PlayersController.getOnePlayer);
route.get('/characters-of-player/:player_id', PlayersController.getCharactersByPlayer);
route.get('/sessions-of-player/:player_id', PlayersController.getSessionsByPlayer);
route.post('/player', PlayersController.createPlayer);
route.put('/edit-player/:player_id', PlayersController.editPlayer);
route.delete('/delete-player/:player_id', PlayersController.deletePlayer);
route.post('/restore-player/:player_id', PlayersController.restorePlayer);



module.exports = route;