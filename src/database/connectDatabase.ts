import mongoose from "mongoose";
import createDebug from "debug";

const debug = createDebug("plantips_api:database");

export const connectDatabase = async (mongooseUrl: string) => {
  mongoose.set("strictQuery", false);
  mongoose.set("debug", true);
  mongoose.set("toJSON", {
    virtuals: true,
    transform(doc, ret) {
      delete ret._id;
      delete ret._v;
    },
  });
  try {
    await mongoose.connect(mongooseUrl);
    debug("Connected");
  } catch (error: unknown) {
    debug("Error on connecting to database", (error as Error).message);
  }
};
