import createDebug from "debug";
import { type CustomError } from "../CustomError/CustomError.js";
import { app } from "./app.js";

const debug = createDebug("plantips_api:startServer");

export const startServer = async (port: number) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(`Server listening on  http://localhost:${port} `);

      resolve(server);
    });

    server.on("error", (error: CustomError) => {
      const errorMessage = "Error while starting the server";

      if (error.code === "EADDRINUSE") {
        debug(errorMessage, `The port ${port} is already in use`);
      }

      reject(error);
    });
  });
