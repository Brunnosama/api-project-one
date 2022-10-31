const expect = require("chai").expect;
const { it } = require("mocha");
const sinon = require("sinon");
const playersController = require("../controllers/PlayersController");

// describe("testing the controller class with it's respective methods", () => {

//     it("testing the sum method", () => {
//         let a = 14;
//         let b = 36;
//         let result = 50;
//         expect(playersController.sum(a, b)).to.equal(result);
//     });

// });

describe("testing the simple function", () => {

    it("testing the sum method", () => {
        let a = 14;
        let b = 36;
        let result = 50;
        expect(playersController.sum(a, b)).to.equal(result);
    });

    it("testing name function", () => {
        expect(playersController.name("Brunno")).to.equal("Brunno Pessoa");
    });

    it("testing array function", () => {
        let arr = [10, 30, 40];
        expect(playersController.verifyItems(arr)).to.equal(10);
    });

    it("testing the page1 method", () => {
        let res = {
            send: () => { }
        }
        let mock = sinon.mock(res)
        mock.expects("send").once().withArgs("Page1")
        playersController.page1({}, res)
    });
});

describe("Testing the reqs and res from testReq method", () => {
    it("verifying if the req is a valid id", () => {
        let req = {
            params: {
                id: ""
            }
        }
        let res = {
            send: () => { }
        }
        let mock = sinon.mock(res)
        mock.expects("send").once().withArgs("Invalid Id")
        playersController.testReq(req, res)
    });

    it("verifying if the req id is equal one", () => {
        let req = {
            params: {
                id: 1
            }
        }
        let res = {
            send: () => { }
        }
        let mock = sinon.mock(res)
        mock.expects("send").once().withArgs("The Id is equal to: 1");
        playersController.testReq(req, res);
    });

    it("verifying if the req id is different than one", () => {
        let req = {
            params: {
                id: 2
            }
        }
        let res = {
            send: () => { }
        }
        let mock = sinon.mock(res)
        mock.expects("send").once().withArgs("The id it's not equal to: 1");
        playersController.testReq(req, res);
    });
});

describe("Testing the testQuery method", () => {
    it("verifying it the queries reqs are valid", () => {

        let req = {
            query: {}
        };

        let res = {
            send: () => { }
        };

        let mock = sinon.mock(res);
        mock.expects("send").once().withArgs("The params are not true");
        playersController.testQueryString(req, res);
    });

    it("verifying if the queries are true", () => {

        let req = {
            query: {
                num1: "Brunno",
                num2: "Pessoa"
            }
        };

        let res = {
            send: () => {},
            status: () => {}
        };

        let mock = sinon.mock(res);
        mock.expects("status").once().withArgs(200);
        mock.expects("send").once().withArgs("The params are correct");
        playersController.testQueryString(req, res);
    });
});