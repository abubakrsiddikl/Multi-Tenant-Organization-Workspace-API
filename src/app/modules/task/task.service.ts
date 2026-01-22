import httpStatus from "http-status-codes";
import AppError from "../../errorHelper/AppError";
import { ITask } from "./task.interface";
import { Task } from "./task.model";
import { Project } from "../project/project.model";
import { User } from "../user/user.model";

const createTask = async (payload: Partial<ITask>, orgId: string) => {
  // checking whether the project exists in the organization
  const project = await Project.findOne({ _id: payload.projectId, organizationId: orgId });
  if (!project) throw new AppError(httpStatus.NOT_FOUND, "Project not found in your organization");

  // checking whether the assigned user exists in the organization
  const assignedUser = await User.findOne({ _id: payload.assignedTo, organizationId: orgId });
  if (!assignedUser) throw new AppError(httpStatus.NOT_FOUND, "Assigned user is not in your organization");

  payload.organizationId = orgId as any;
  const result = await Task.create(payload);
  return result;
};

const getTasks = async (user: any) => {
  const query: any = { organizationId: user.organizationId };

  // Members can only see their assigned tasks
  if (user.role === 'MEMBER') {
    query.assignedTo = user.userId;
  }

  const result = await Task.find(query).populate("projectId assignedTo");
  return result;
};

export const TaskServices = {
  createTask,
  getTasks,
};