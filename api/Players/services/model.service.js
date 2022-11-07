const database = require("../../../dbConfig/db/models");

class ModelService {
    constructor(modelName) {
        this.modelName = modelName;
    }

    async getAllDetails() {
        return database[this.modelName].scope("all").findAll();
    }

    async getActiveDetails() {
        return database[this.modelName].findAll();
    }

    async getOneDetail(player_id) {
        return database[this.modelName].scope("all").findOne({
            where: { id: Number(player_id) }
        });
    }

    async getOneActiveDetail(player_id) {
        return database[this.modelName].findOne({
            where: { id: Number(player_id) }
        });
    }
}

module.exports = ModelService;

