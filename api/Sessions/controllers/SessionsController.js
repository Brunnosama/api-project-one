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
                where: {
                    id: Number(session_id)
                }
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
                where: {
                    session_id: Number(session_id)
                }
            });
            if (charactersOfSessions.length <= 0) {
                return res.status(404).send({ msgError: "This Sessions has no Characters!" });
            }
            return res.status(200).send(charactersOfSessions);
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
                where: {
                    id: Number(session_id)
                }
            });
            const updatedSession = await database.Sessions.findOne({
                where: {
                    id: Number(session_id)
                }
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
                where: {
                    id: Number(session_id)
                }
            })
            if (!verifyingDeletion) {
                return res.status(400).send({ msg: "Session couldn't be found!"});
            }
            await database.Sessions.destroy({
                where: {
                    id: Number(session_id)
                }
            });
            return res.status(200).send({ msg: "Session successfully deleted!" });
        } catch (error) {
            return res.status(500).send({ msg: "Session delete failed!", error: error.message })
        }
    }

}

module.exports = SessionsController;

// const sum = (a, b) => {
//     let sum = a + b;
//     return sum;
// };

// const name = (name) => {
//     let fullName = name + " Pessoa"
//     return fullName;
// };

// const verifyItems = (arr) => {
//     let newArr = arr.map((item) => item);
//     for (let index = 0; index <= newArr.length; index++) {
//         if (!newArr[index]) {
//             return false
//         }
//         return newArr[index];
//     }
//     return newArr;
// };

// const page1 = (req, res) => {
//     res.send("Page1");
// };

// const testReq = (req, res) => {
//     const { id } = req.params
//     if (!id) {
//         return res.send("Invalid Id")
//     }
//     if (id === 1) {
//         return res.send(`The Id is equal to: ${id}`)
//     } else {
//         return res.send(`The id it's not equal to: ${1}`)
//     }
// };

// const testQueryString = (req, res) => {
//     const { num1, num2 } = req.query;

//     if (num1 && num2) {
//         res.status(200);
//         return res.send("The params are correct");
//     }
//     return res.send("The params are not true");
// }

// module.exports = {
//     sum,
//     name,
//     verifyItems,
//     page1,
//     testReq,
//     testQueryString
// };