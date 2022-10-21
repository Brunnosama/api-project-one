class PlayersController {
    static async getAll(req, res) {
        return res.send("ClassController");
    }

    static sum(a, b) {
        let sum = a + b;
        return sum;
    }
}

module.exports = PlayersController;