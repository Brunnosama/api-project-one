const { expect } = require("chai");
const { it } = require("mocha");
const playersController = require("../controllers/PlayersController");

describe("testing the controller class with it's respective methods", () => {
    
    it("testing the sum method", () => {
        let a = 14;
        let b = 36;
        let result = 50;
        expect(playersController.sum(a, b)).to.equal(result);
    });

});