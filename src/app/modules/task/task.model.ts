import { Schema, model } from "mongoose";
import { ITask, TaskStatus } from "./task.interface";

const taskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: Object.values(TaskStatus),
      default: TaskStatus.TODO,
    },
    projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    organizationId: {
      type: Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
    assignedTo: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true },
);

export const Task = model<ITask>("Task", taskSchema);
