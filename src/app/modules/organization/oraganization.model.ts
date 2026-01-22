import { Schema, model } from "mongoose";
import { IOrganization } from "./organization.interface";

const organizationSchema = new Schema<IOrganization>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    address: { type: String },
  },
  { timestamps: true }
);

export const Organization = model<IOrganization>("Organization", organizationSchema);