const { Router } = require("express");
const route = Router();
const SessionsController = require("./controllers/SessionsController")

//Players
route.get('/sessions', SessionsController.getAllSessions);
route.get('/session/:session_id', SessionsController.getOneSession);

module.exports = route;