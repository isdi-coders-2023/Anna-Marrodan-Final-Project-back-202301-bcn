import { CustomError } from "./CustomError";

describe("Given a CustomError class", () => {
  const newError = new CustomError("Page not found", 404, "Page not found");
  describe("When it is instantiated with the message 'Page not found', statusCode 404 and publicMessage 'Page not found'", () => {
    test("Then it should have the property message and show the show the message 'Page not found'", () => {
      const expectedMessage = "Page not found";

      expect(newError).toHaveProperty("message", expectedMessage);
    });

    test("Then it should have the property statusCode and show the status code 404", () => {
      const expectedStatusCode = 404;

      expect(newError).toHaveProperty("statusCode", expectedStatusCode);
    });

    test("Then it should have the property publicMessage and show the public message 'Page not found'", () => {
      const expectedPublicMessage = "Page not found";

      expect(newError).toHaveProperty("publicMessage", expectedPublicMessage);
    });
  });
});
