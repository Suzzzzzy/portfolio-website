import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import {Project} from "../db/models/Project";

class projectService {
  static async addProject({ _id, title, description, from_date, to_date}) {
    // 프로젝트 추가하기(CREATE)
    // 프로젝트 중복 확인
     const project = await Project.findById({_id});
     if (project) {
       const errorMessage = "이미 존재하는 프로젝트입니다."
       return { errorMessage };
     }

    const newProject = ({ title, description,from_date, to_date });
    const createdNewProject = await Project.create({ newProject });
    createdNewProject.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    return createdNewProject;
  }

   // 프로젝트 불러오기
   static async getProject({_id}) {
    const project = await Project.findById({_id});
    return project;
  }

  // 사용자 프로젝트list 불러오기
  static async getProjectList({ user_id }) {
   const projectlist = await Project.findById({ user_id });
     if (!projectlist) {
       const errorMessage = "프로젝트내역이 존재하지 않습니다.";
       return { errorMessage };
     }
   return projectlist;
  }

  static async setProject({ _id, toUpdate }) {
    let project = await Project.findById(_id);

    // 업데이트 대상에 name이 있다면, 즉 name 값이 null 이 아니라면 업데이트 진행
    if (toUpdate.title) {
      const fieldToUpdate = "title";
      const newValue = toUpdate.title;
      project = await Project.update({ _id, fieldToUpdate, newValue });
    }

    if (toUpdate.description) {
      const fieldToUpdate = "description";
      const newValue = toUpdate.description;
      project = await Project.update({ _id, fieldToUpdate, newValue });
    }
    if (toUpdate.from_date) {
      const fieldToUpdate = "from_date";
      const newValue = toUpdate.description;
      project = await Project.update({ _id, fieldToUpdate, newValue });
    }
    if (toUpdate.to_date) {
      const fieldToUpdate = "to_date";
      const newValue = toUpdate.description;
      project = await Project.update({ _id, fieldToUpdate, newValue });
    }

    return project;
  }




}

export { projectService };