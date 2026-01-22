
import { IProject } from "./project.interface";
import { Project } from "./project.model";


const createProject = async (payload: Partial<IProject>, orgId: string) => {
  // set org id to jwt org id
  payload.organizationId = orgId as any;
  
  const result = await Project.create(payload);
  return result;
};

const getMyOrgProjects = async (orgId: string) => {
  // fetch projects by organization id
  const result = await Project.find({ organizationId: orgId });
  return result;
};

export const ProjectServices = {
  createProject,
  getMyOrgProjects,
};