const database = require("../../../dbConfig/db/models");

class PlayersController {
    static async getAllPlayers(req, res) {
        try {
            const allPlayers = await database.Players.findAll()
            return res.status(200).send(allPlayers);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }

    static async getOnePlayer(req, res) {
        const { player_id } = req.params;
        try {
            const player = await database.Players.findOne({
                where: {
                    id: Number(player_id)
                }
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
                where: {
                    player_id: Number(player_id)
                }
            });
            if (!charactersOfPlayer) {
                return res.status(400).send({ msgError: "This player has no Characters!" });
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
                where: {
                    narrator_id: Number(player_id)
                }
            });
            if (!sessionsOfPlayer) {
                return res.status(400).send({ msgError: "This player has no sessions!" });
            }
            return res.status(200).send(sessionsOfPlayer);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }

    static async createPlayer(req, res) {
        const { name, email, active, role } = req.body
        try {
            const verifyingUser = await database.Players.findOne({
                where: {
                    email: email
                }
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
                where: {
                    id: Number(player_id)
                }
            });

            const updatePlayer = await database.Players.findOne({
                where: {
                    id: Number(player_id)
                }
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
                where: {
                    id: Number(player_id)
                }
            })
            if (!verifyingDeletion) {
                return res.status(400).send({ msg: "Player couldn't be found!" });
            }
            await database.Players.destroy({
                where: {
                    id: Number(player_id)
                }
            });
            return res.status(200).send({ msg: "Player successfully deleted!" });
        } catch (error) {
            return res.status(500).send({ msg: "Player delete failed!", error: error.message })
        }
    }
}

module.exports = PlayersController;

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