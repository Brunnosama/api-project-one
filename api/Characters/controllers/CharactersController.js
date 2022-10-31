const database = require("../../../dbConfig/db/models");
class CharactersController {
    static async getAll(req, res) {
        try {
            const allCharacters = await database.Characters.findAll()
            return res.status(200).send(allCharacters);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }
}

module.exports = CharactersController;