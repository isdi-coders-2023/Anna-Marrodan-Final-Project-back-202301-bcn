import "./loadEnvironment.js";
import { connectDatabase } from "./database/connectDatabase.js";
import mongoose from "mongoose";
import { startServer } from "./server/startServer.js";

const port = process.env.PORT ?? 4001;
const mongooseUrl = process.env.MONGOOSE_URL!;

mongoose.set("toJSON", {
  virtuals: true,
  transform(doc, ret) {
    delete ret._id;
    delete ret._v;
  },
});

await connectDatabase(mongooseUrl);
await startServer(+port);
