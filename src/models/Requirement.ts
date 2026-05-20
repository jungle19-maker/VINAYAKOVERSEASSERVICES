import mongoose, { Schema, Document } from "mongoose";

export interface IRequirement extends Document {
  title: string;
  icon: string; // e.g. "Stethoscope", "Truck"
  countries: string[];
  shortDescription: string;
  roles: string[];
  eligibilityRequirements: string[];
  status: "active" | "inactive";
  orderNumber: number;
  details: string; // HTML string or rich text for expand/collapse
  createdAt: Date;
  updatedAt: Date;
}

const RequirementSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    icon: { type: String, required: true },
    countries: { type: [String], required: true },
    shortDescription: { type: String, required: true },
    roles: { type: [String], default: [] },
    eligibilityRequirements: { type: [String], default: [] },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    orderNumber: { type: Number, default: 0 },
    details: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.models.Requirement ||
  mongoose.model<IRequirement>("Requirement", RequirementSchema);
