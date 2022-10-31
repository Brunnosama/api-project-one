const { Router } = require("express");
const route = Router();
const SessionsController = require("./controllers/SessionsController")

//Players
route.get('/sessions', SessionsController.getAllSessions);
route.get('/session/:session_id', SessionsController.getOneSession);
route.post('/session', SessionsController.createSession);
route.put('/session/:session_id', SessionsController.editSession);

module.exports = route;