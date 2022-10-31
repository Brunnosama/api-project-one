const playersApi = require("../api/Players/routes");
const charactersApi = require("../api/Characters/routes");
const sessionsApi = require("../api/Sessions/routes")

module.exports = (app) => {
    app.get("/", (req, res) => res.send("Welcome to the Game Session API!"));
    app.use("/players-api", playersApi);
    app.use("/characters-api", charactersApi);
    app.use("/sessions-api", sessionsApi);
    
}