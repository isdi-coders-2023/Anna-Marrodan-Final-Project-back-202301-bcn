import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import mongoose from "mongoose";
import bcryptsjs from "bcryptjs";
import jsw, { TokenExpiredError } from "jsonwebtoken";
import { connectDatabase } from "../database/connectDatabase";
import { User } from "../database/models/User";
import { type UserCredentials } from "../types";
import { app } from "../server/app";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectDatabase(server.getUri());
});

afterAll(async () => {
  await server.stop();
  await mongoose.connection.close();
});

afterEach(async () => {
  await User.deleteMany();
});

const loginEndpoint = "/users/login";

const mockedCredentials: UserCredentials = {
  username: "Daisy",
  password: "12345678",
};

describe("Given a POST '/users/login' endpoint", () => {
  describe("When it receives a request to log an existing user with username 'Plantlover' and password '12345678'", () => {
    test("Then it should respond with a token", async () => {
      const expectedStatus = 200;
      const mocken = "ThisIsAMockedTocken";
      const hashedPassword = await bcryptsjs.hash(
        mockedCredentials.password,
        8
      );

      await User.create({
        username: "Daisy",
        password: hashedPassword,
        email: "hi@daisy.com",
      });
      jsw.sign = jest.fn().mockReturnValue(mocken);
      const response = await request(app)
        .post(loginEndpoint)
        .send(mockedCredentials)
        .expect(expectedStatus);

      expect(response.body).toHaveProperty("token", mocken);
    });
  });
});
