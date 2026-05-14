import mongoose, { Schema, Document } from "mongoose";

export interface ICtaSetting extends Document {
  heading: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  backgroundColor: string;
  status: "active" | "inactive";
  createdAt: Date;
  updatedAt: Date;
}

const CtaSettingSchema: Schema = new Schema(
  {
    heading: { type: String, required: true },
    description: { type: String, required: true },
    buttonText: { type: String, required: true },
    buttonLink: { type: String, required: true },
    backgroundColor: { type: String, default: "bg-[#24342b]" },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true }
);

export default mongoose.models.CtaSetting ||
  mongoose.model<ICtaSetting>("CtaSetting", CtaSettingSchema);
