import "./loadEnvironment.js";
import { connectDatabase } from "./database/connectDatabase.js";
import { startServer } from "./server/startServer.js";
import createDebug from "debug";

const debug = createDebug("plantips");

const port = process.env.PORT ?? 4001;
const mongooseUrl = process.env.MONGOOSE_URL!;

try {
  await connectDatabase(mongooseUrl);
  await startServer(+port);
} catch (error) {
  debug(error);
}
