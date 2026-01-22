import {  Types } from "mongoose";

export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export interface ITask {
  title: string;
  description: string;
  status: TaskStatus;
  projectId: Types.ObjectId;
  organizationId: Types.ObjectId;
  assignedTo: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}