// models/Job.ts
import mongoose, { Document, Schema, Model } from "mongoose";

// 1. Define the TypeScript interface for the job document
export interface IJob extends Document {
  title: string;
  company: string;
  location?: string;     // Optional field
  description?: string;  // Optional field
  createdAt: Date;
}

// 2. Define the Mongoose schema using the interface type
const JobSchema: Schema<IJob> = new mongoose.Schema(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String },
    description: { type: String },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "jobs" }
);

// 3. Export the model safely to prevent re-compilation in development
const Job: Model<IJob> = 
  mongoose.models.Job || mongoose.model<IJob>("Job", JobSchema);

export default Job;
