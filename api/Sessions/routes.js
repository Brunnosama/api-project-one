const { Router } = require("express");
const route = Router();
const SessionsController = require("./controllers/SessionsController")

//Players
route.get('/sessions', SessionsController.getAllSessions);
route.get('/session/:session_id', SessionsController.getOneSession);
route.get('/characters-of-session/:session_id', SessionsController.getCharactersBySession);
route.get('/characters-per-session/:session_id', SessionsController.getCharactersPerSession);
route.post('/session', SessionsController.createSession);
route.put('/session/:session_id', SessionsController.editSession);
route.delete('/delete-session/:session_id', SessionsController.deleteSession)
route.post('/restore-session/:session_id', SessionsController.restoreSession)

module.exports = route;