import { CustomError } from "./CustomError";

describe("Given a CustomError class", () => {
  describe("When it is instantiated with the message 'Page not found', statusCode 404 and publicMessage 'Page not found'", () => {
    test("Then it should have the property message and show the show the message 'Page not found'", () => {
      const message = "Page not found";

      const newError = new CustomError(message, 0, "");

      expect(newError).toHaveProperty("message", message);
    });

    test("Then it should have the property statusCode and show the status code 404", () => {
      const statusCode = 404;

      const newError = new CustomError("", statusCode, "");

      expect(newError).toHaveProperty("statusCode", statusCode);
    });

    test("Then it should have the property publicMessage and show the public message 'Page not found'", () => {
      const publicMessage = "Page not found";

      const newError = new CustomError("", 0, publicMessage);

      expect(newError).toHaveProperty("publicMessage", publicMessage);
    });
  });
});
