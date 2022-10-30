// class PlayersController {
//     static async getAll(req, res) {
//         return res.send("ClassController");
//     }

//     static sum(a, b) {
//         let sum = a + b;
//         return sum;
//     }
// }

// module.exports = PlayersController;

const sum = (a, b) => {
    let sum = a + b;
    return sum;
};

const name = (name) => {
    let fullName = name + " Pessoa"
    return fullName;
};

const verifyItems = (arr) => {
    let newArr = arr.map((item) => item);
    for (let index = 0; index <= newArr.length; index++) {
        if (!newArr[index]) {
            return false
        }
        return newArr[index];
    }
    return newArr;
};

const page1 = (req, res) => {
    res.send("Page1");
};

const testReq = (req, res) => {
    const { id } = req.params
    if (!id) {
        return res.send("Invalid Id")
    }
    if (id === 1) {
        return res.send(`The Id is equal to: ${id}`)
    } else {
        return res.send(`The id it's not equal to: ${1}`)
    }
};

const testQueryString = (req, res) => {
    const { num1, num2 } = req.query;

    if (num1 && num2) {
        res.status(200);
        return res.send("The params are correct");
    }
    return res.send("The params are not true");
}

module.exports = {
    sum,
    name,
    verifyItems,
    page1,
    testReq,
    testQueryString
};