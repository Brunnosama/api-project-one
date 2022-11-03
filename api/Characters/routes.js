const { Router } = require("express");
const route = Router();
const CharactersController = require("./controllers/CharactersController")

route.get('/characters', CharactersController.getAllCharacters);
route.get('/character/:character_id', CharactersController.getOneCharacter);
route.post("/character/session/:session_id/player/:player_id", CharactersController.createCharacter);
route.put("/character/:character_id", CharactersController.editCharacter);
route.delete('/delete-character/:character_id', CharactersController.deleteCharacter);
route.post('/restore-character/:character_id', CharactersController.restoreCharacter);

module.exports = route;