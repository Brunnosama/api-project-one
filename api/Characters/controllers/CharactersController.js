const database = require("../../../dbConfig/db/models");
class CharactersController {

    static async getAllCharacters(req, res) {
        try {
            const allCharacters = await database.Characters.findAll()
            return res.status(200).send(allCharacters);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }

    static async getOneCharacter(req, res) {
        const { character_id } = req.params;
        try {
            const oneCharacter = await database.Characters.findOne({
                where: {
                    id: Number(character_id)
                }
            });
            if (!oneCharacter) {
                return res.status(404).send({ msgError: "Character couldn't be find!" });
            }
            return res.status(200).send(oneCharacter);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }

    static async createCharacter(req, res) {
        const { player_id, session_id } = req.params;
        const newCharacter = { ...req.body, player_id: Number(player_id), session_id: Number(session_id) };
        try {
            const verifyingSession = await database.Characters.findOne({
                where: { session_id: Number(session_id), player_id: Number(player_id) }
            })
            if (verifyingSession) {
                return res.status(400).send({ msgError: "You already have a Character registered to this Session." });
            }
            const createdCharacter = await database.Characters.create(newCharacter)
            return res.status(200).send({ msgSuccess: "Character successfully registered!", ...createdCharacter })
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }

    static async editCharacter(req, res) {
        const { character_id } = req.params;
        const newCharacterInfo = req.body
        try {
            await database.Characters.update(newCharacterInfo, {
                where: { id: Number(character_id) }
            })
            const updatedCharacter = await database.Characters.findOne({
                where: {
                    id: Number(character_id)
                }
            });
            return res.status(200).send(updatedCharacter);
        } catch (error) {
            return res.status(500).send({ msg: "Character update failed!", error: error.message });
        }
    }

    static async deleteCharacter(req, res) {
        const { character_id } = req.params;
        try {
            const verifyingDeletion = await database.Characters.findOne({
                where: { id: Number(character_id) }
            })
            if (!verifyingDeletion) {
                return res.status(404).send({ msg: "Character couldn't be found!" });
            }
            await database.Characters.destroy({
                where: { id: Number(character_id) }
            });
            return res.status(200).send({ msg: "Character successfully deleted!" });
        } catch (error) {
            return res.status(500).send({ msg: "Character delete failed!", error: error.message })
        }
    }

    static async restoreCharacter(req, res) {
        const { character_id } = req.params;
        try {
            const verifyingRestore = await database.Characters.findOne({
                where: { id: Number(character_id) },
                paranoid: false
            })
            if (!verifyingRestore) {
                return res.status(404).send({ msg: "Character couldn't be found!" });
            }
            await database.Characters.restore({
                where: { id: Number(character_id) }
            });
            return res.status(200).send({ msg: "Character successfully restored!" });
        } catch (error) {
            return res.status(500).send({ msg: "Character delete failed!", error: error.message })
        }
    }
}

module.exports = CharactersController;