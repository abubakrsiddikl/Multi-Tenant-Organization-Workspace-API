import { Types } from "mongoose";

export interface IProject {
  name: string;
  description: string;
  organizationId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
