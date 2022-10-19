const playersApi = require("../api/Players/routes");
const charactersApi = require("../api/Characters/routes");

module.exports = (app) => {
    app.get("/", (req, res) => res.send("Welcome to the Game Session API!"));
    app.use("/players-api", playersApi);
    app.use("/characters-api", charactersApi);
    
}