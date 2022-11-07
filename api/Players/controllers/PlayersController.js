const database = require("../../../dbConfig/db/models");
const validator = require('validator');
const { MissingEmailException, InvalidRolePlayerException, InvalidRoleNarratorException } = require("../common/exceptions");

class PlayersController {
    static async getAllActivePlayers(req, res) {
        try {
            const allActive = await database.Players.findAll()
            return res.status(200).send(allActive);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }

    static async getAllPlayers(req, res) {
        try {
            const allPlayers = await database.Players.scope("all").findAll()
            return res.status(200).send(allPlayers);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }

    static async getOneActivePlayer(req, res) {
        const { player_id } = req.params;
        try {
            const activePlayer = await database.Players.findOne({
                where: { id: Number(player_id) }
            });
            if (!activePlayer) {
                return res.status(404).send("Player is not registered. Try a new id.")
            }
            return res.status(200).send(activePlayer);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }

    static async getOnePlayer(req, res) {
        const { player_id } = req.params;
        try {
            const player = await database.Players.scope("all").findOne({
                where: { id: Number(player_id) }
            });
            if (!player) {
                return res.status(404).send("Player is not registered. Try a new id.")
            }
            return res.status(200).send(player);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }

    static async getCharactersByPlayer(req, res) {
        const { player_id } = req.params;
        try {
            const charactersOfPlayer = await database.Characters.findAll({
                where: { player_id: Number(player_id) }
            });
            if (charactersOfPlayer.length <= 0) {
                return res.status(404).send({ msgError: "This Player has no Characters!" });
            }
            return res.status(200).send(charactersOfPlayer);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }

    static async getSessionsByPlayer(req, res) {
        const { player_id } = req.params;
        try {
            const sessionsOfPlayer = await database.Sessions.findAll({
                where: { narrator_id: Number(player_id) }
            });
            if (sessionsOfPlayer.length <= 0) {
                return res.status(404).send({ msgError: "This Narrator has no Sessions!" });
            }
            return res.status(200).send(sessionsOfPlayer);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }

    static async createPlayer(req, res) {
        const { name, email, active, role } = req.body;
        try {
            const verifyingUser = await database.Players.findOne({
                where: { email: email }
            });
            if (verifyingUser) {
                return res.status(409).send({ msg: "This user is already registered", verifyingUser });
            }

            const player = await database.Players.create({
                name,
                email,
                active,
                role
            })
            return res.status(200).send({ msg: "Player successfully created!", ...player })
        } catch (error) {
            return res.status(500).send(error.message)
        }
    }

    static async editPlayer(req, res) {
        const { player_id } = req.params;
        const newPlayer = req.body;
        try {
            await database.Players.update(newPlayer, {
                where: { id: Number(player_id) }
            });

            const updatePlayer = await database.Players.findOne({
                where: { id: Number(player_id) }
            });
            return res.status(200).send({ msg: "Player successfully updated!", ...updatePlayer });

        } catch (error) {
            return res.status(500).send(error.message);
        }
    }

    static async deletePlayer(req, res) {
        const { player_id } = req.params;
        try {
            const verifyingDeletion = await database.Players.findOne({
                where: { id: Number(player_id) }
            })
            if (!verifyingDeletion) {
                return res.status(404).send({ msg: "Player couldn't be found!" });
            }
            await database.Players.destroy({
                where: { id: Number(player_id) }
            });
            return res.status(200).send({ msg: "Player successfully deleted!" });
        } catch (error) {
            return res.status(500).send({ msg: "Player delete failed!", error: error.message })
        }
    }
    static async restorePlayer(req, res) {
        const { player_id } = req.params;
        try {
            const verifyingRestore = await database.Players.findOne({
                where: { id: Number(player_id) },
                paranoid: false
            })
            if (!verifyingRestore) {
                return res.status(404).send({ msg: "Player couldn't be found!" });
            }
            await database.Players.restore({
                where: { id: Number(player_id) }
            });
            return res.status(200).send({ msg: "Player successfully restored!" });
        } catch (error) {
            return res.status(500).send({ msg: "Player delete failed!", error: error.message })
        }
    }
}

module.exports = PlayersController;