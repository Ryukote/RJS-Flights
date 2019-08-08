var api = require("../src/Utilities/AmadeusAPI");
var expect = require('expect');

describe("Authentication", function() {
    it("with api key and api secret from .env file", async function() {
        let accessToken = await api.authenticate();
        expect(accessToken).not.toBe(undefined);
        expect(accessToken).not.toBe(null);
        expect(accessToken.length).toBeGreaterThan(0);
    })
})

describe("IATA codes for", function() {
    it("Zagreb should return 2 results", async function() {
        let result = await api.getIATACode("Zagreb");

        expect(result.length).toEqual(2);
    })

    it("Tokyo should return 2 results", async function() {
        let result = await api.getIATACode("Tokyo");

        expect(result.length).toEqual(2);
    })

    it("Narita should return 1 result", async function() {
        let result = await api.getIATACode("Narita");

        expect(result.length).toEqual(1);
    })

    it("letter 'a' should return 9 result", async function() {
        let result = await api.getIATACode("a");
        console.log(result);
        expect(result.length).toEqual(9);
    })
})

describe("Search with parameters:", function() {
    it("given currency, origin, destination and departure date. ", async function() {
        let result = await api.getIATACode("Zagreb");

        expect(result.length).toEqual(2);
    })

    it("Tokyo should return 2 results", async function() {
        let result = await api.getIATACode("Tokyo");

        expect(result.length).toEqual(2);
    })

    it("Narita should return 1 result", async function() {
        let result = await api.getIATACode("Narita");

        expect(result.length).toEqual(1);
    })

    it("letter 'a' should return 9 result", async function() {
        let result = await api.getIATACode("a");
        console.log(result);
        expect(result.length).toEqual(9);
    })
})