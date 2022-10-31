const database = require("../../../dbConfig/db/models");

class PlayersController {
    static async getAll(req, res) {
        try {
            const allPlayers = await database.Players.findAll()
            return res.status(200).send(allPlayers);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }

    static async getOne(req, res) {
        const { playerId } = req.params;
        try {
            const player = await database.Players.findOne({
                where: {
                    id: Number(playerId)
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
        const { playerId } = req.params;
        const newPlayer = req.body;
        try {
            await database.Players.update(newPlayer, {
                where: {
                    id: Number(playerId)
                }
            });

            const updatePlayer = await database.Players.findOne({
                where: {
                    id: Number(playerId)
                }
            });
            return res.status(200).send({ msg: "Player successfully updated!", ...updatePlayer });

        } catch (error) {
            return res.status(500).send(error.message);
        }
    }
    static async deletePlayer(req, res) {
        const { playerId } = req.params;
        try {
            await database.Players.destroy({
                where: {
                    id: Number(playerId)
                }
            });
            return res.status(200).send("Player successfully deleted!");
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }
    static async getCharacter(req, res) {
        const { player_id, character_id } = req.params;
        try {
            const oneCharacter = await database.Characters.findOne({
                where: {
                    id: Number(character_id),
                    player_id: Number(player_id)
                }
            });
            if (!oneCharacter) {
                return res.status(404).send({ msgError: "Characters not find!" });
            }
            return res.status(200).send(oneCharacter);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }
    static async createCharacter(req, res) {
        const { player_id, session_id } = req.params;
        const newCharacter = { ...req.body, player_id: Number(player_id) };
        try {
            const verifyingSession = await database.Characters.findOne({
                where: {
                    session_id: Number(session_id),
                    player_id: Number(player_id)
                }
            })
            if (verifyingSession) {
                return res.status(400).send({ msgError: "Character already registered!" });
            }
            const createdCharacter = await database.Characters.create(newCharacter)
            return res.status(200).send({ msgSuccess: "Character successfully registered!", ...createdCharacter })
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }
    static async editCharacter(req, res) {
        const { player_id, character_id } = req.params;
        const newCharacterInfo = req.body 
        try {
            await database.Characters.update(newCharacterInfo, {
                where: {
                    id: Number(character_id),
                    player_id: Number(player_id)
                }
            })
            const updatedCharacter = await database.Characters.findOne({
                where: {
                    id: Number(character_id)
                }
            });
            return res.status(200).send(updatedCharacter);
        } catch (error) {
            return res.status(500).send({msg: "Character update failed!", error: error.message});
        }
    }
    static async deleteCharacter(req, res) {
        try{
            await database.Characters.destroy({
                where: {
                    id: Number(character_id)
                }
            });
            return res.status(200).send({msg: "Character successfully deleted!"});
        } catch (error) {
            return res.status(500).send({msg: "Character delete failed!", error: error.message})

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