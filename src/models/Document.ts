import mongoose, { Schema, Document as MongooseDocument } from "mongoose";

export interface IDocumentModel extends MongooseDocument {
  title: string;
  description: string;
  priorityNumber: number;
  countrySpecificNote: string;
  status: "active" | "inactive";
  createdAt: Date;
  updatedAt: Date;
}

const DocumentSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    priorityNumber: { type: Number, default: 0 },
    countrySpecificNote: { type: String, default: "" },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true }
);

export default mongoose.models.Document ||
  mongoose.model<IDocumentModel>("Document", DocumentSchema);
