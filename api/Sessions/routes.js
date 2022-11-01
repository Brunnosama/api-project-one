const { Router } = require("express");
const route = Router();
const SessionsController = require("./controllers/SessionsController")

//Players
route.get('/sessions', SessionsController.getAllSessions);
route.get('/session/:session_id', SessionsController.getOneSession);
route.post('/session', SessionsController.createSession);
route.put('/session/:session_id', SessionsController.editSession);
route.delete('/delete-session/:session_id', SessionsController.deleteSession)

module.exports = route;