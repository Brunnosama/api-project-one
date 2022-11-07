const database = require("../../../dbConfig/db/models");

class SessionsController {
    static async getAllSessions(req, res) {
        try {
            const allSessions = await database.Sessions.findAll()
            return res.status(200).send(allSessions);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }

    static async getOneSession(req, res) {
        const { session_id } = req.params;
        try {
            const oneSession = await database.Sessions.findOne({
                where: { id: Number(session_id) }
            });
            return res.status(200).send(oneSession);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }

    static async getCharactersBySession(req, res) {
        const { session_id } = req.params;
        try {
            const charactersOfSessions = await database.Characters.findAll({
                where: { session_id: Number(session_id) }
            });
            if (charactersOfSessions.length <= 0) {
                return res.status(404).send({ msgError: "This Sessions has no Characters!" });
            }
            return res.status(200).send(charactersOfSessions);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }

    static async getCharactersPerSession(req, res) {
        const { session_id } = req.params;
        try {
            const selectedSession = await database.Sessions.findOne({
                where: {
                    id: Number(session_id)
                }
            });

            const charactersOfSession = await selectedSession.getCharactersofSession();
            if (!selectedSession) {
                return res.status(203).send({ msgError: "Session couldn't be found" });
            }
            if (charactersOfSession.length <= 0) {
                return res.status(404).send({ msgError: "This Sessions has no Characters!" });
            }
            return res.status(200).send(charactersOfSession);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }

    static async createSession(req, res) {
        const newSession = req.body
        try {
            const newCreatedSession = await database.Sessions.create(newSession)
            return res.status(200).send(newCreatedSession);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }

    static async editSession(req, res) {
        const { session_id } = req.params;
        const newSessionInfo = req.body
        try {
            await database.Sessions.update(newSessionInfo, {
                where: { id: Number(session_id) }
            });
            const updatedSession = await database.Sessions.findOne({
                where: { id: Number(session_id) }
            })
            return res.status(200).send(updatedSession);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }

    static async deleteSession(req, res) {
        const { session_id } = req.params;
        try {
            const verifyingDeletion = await database.Sessions.findOne({
                where: { id: Number(session_id) }
            })
            if (!verifyingDeletion) {
                return res.status(404).send({ msg: "Session couldn't be found!" });
            }
            await database.Sessions.destroy({
                where: { id: Number(session_id) }
            });
            return res.status(200).send({ msg: "Session successfully deleted!" });
        } catch (error) {
            return res.status(500).send({ msg: "Session delete failed!", error: error.message })
        }
    }

    static async restoreSession(req, res) {
        const { session_id } = req.params;
        try {
            const verifyingRestore = await database.Sessions.findOne({
                where: { id: Number(session_id) },
                paranoid: false
            })
            if (!verifyingRestore) {
                return res.status(404).send({ msg: "Session couldn't be found!" });
            }
            await database.Sessions.restore({
                where: { id: Number(session_id) }
            });
            return res.status(200).send({ msg: "Session successfully restored!" });
        } catch (error) {
            return res.status(500).send({ msg: "Session delete failed!", error: error.message })
        }
    }

}

module.exports = SessionsController;