import { type NextFunction, type Request, type Response } from "express";
import { CustomError } from "../../../CustomError/CustomError";
import { generalError, notFoundError } from "./errorMiddlewares";

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const req: Partial<Request> = {};

const next = jest.fn() as NextFunction;

describe("Given a notFoundError middleware", () => {
  describe("When it receives a response", () => {
    test("Then it should call its next method ", () => {
      notFoundError(req as Request, res as Response, next);

      expect(next).toHaveBeenCalled();
    });
  });
});

describe("Given a generalError middleware", () => {
  describe("When it receives a response and an error with status 500", () => {
    test("Then it should call its status method with 500", () => {
      const statusCode = 500;

      const error = new CustomError("", statusCode, "");

      generalError(error, req as Request, res as Response, next);
      expect(res.status).toHaveBeenCalledWith(statusCode);
    });
  });

  describe("When it receives a response and an error with the message 'Something went wrong'", () => {
    test("Then it should call its status message with the message 'Something went wrong'", () => {
      const message = "Something went wrong";

      const error = new CustomError(message, 0, "");

      generalError(error, req as Request, res as Response, next);
      expect(res.json).toHaveBeenCalledWith({
        error: message,
      });
    });
  });
});
