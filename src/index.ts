import "./loadEnvironment.js";
import { connectDatabase } from "./database/connectDatabase.js";
import mongoose from "mongoose";

const mongooseUrl = process.env.MONGOOSE_URL!;

mongoose.set("toJSON", {
  virtuals: true,
  transform(doc, ret) {
    delete ret._id;
    delete ret._v;
  },
});

await connectDatabase(mongooseUrl);
