import {getCountdown} from "../../../src/client/js/app"

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ data: [ {'weather' : "nice weather"}] }),
  })
);

beforeEach(() => {
  fetch.mockClear();
});

describe("Testing the  countdown functionality", () => {
    
    test("Testing the getCountdown() function", () => {
        expect(getCountdown(new Date())).toBe(0);

})});
