import { Schema, model } from "mongoose";

export const tipSchema = new Schema({
  commonName: { String, required: true },
  scientificName: { String, required: true },
  careLevel: { String, required: true },
  water: { String, required: true },
  light: { String, required: true },
  tip: { String, required: true },
  image: { String, required: true },
});

export const Tip = model("Tip", tipSchema, "tips");
