import { Project } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

class projectService {
  static async addProject({ user_id, title, description, when_date}) {
    const _id = uuidv4();
    // 상장 추가하기(CREATE)
      // 상장 중복 확인
    const project = await Project.findById({_id});
      if (project) {
        const errorMessage = "이미 존재하는 수상정보입니다."
        return { errorMessage }
      }
    const newProject = ({ id:_id, user_id, title, description, when_date })
    const createdNewProject = await Project.create({ newProject });
    createdNewProject.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    return createdNewProject;
  }

   // 상장 불러오기
   static async getProject({_id}) {
     const project = await Project.findById({_id});
     if (project.length == 0) {
      const errorMessage =
          "해당 수상내용이 존재하지 않습니다.";
      return { errorMessage };
  }
     return project;
   }

   // 사용자 상장list 불러오기
   static async getProjectList({ user_id }) {
    const projectlist = await Project.findByAll({ user_id });
    if (projectlist.length == 0) {
      const errorMessage =
          "해당 유저의 수상내용이 존재하지 않습니다.";
      return { errorMessage };
  }
    return projectlist;
  }

   // 상장 수정하기
   static async setProject({_id, toUpdate}) {
     let project = await Project.findById(_id);

     if (toUpdate.title) {
       const fieldToUpdate = "title";
       const newValue = toUpdate.title;
       project = await Project.update({_id, fieldToUpdate, newValue})
     }
     if (toUpdate.description) {
      const fieldToUpdate = "description";
      const newValue = toUpdate.description;
      project = await Project.update({_id, fieldToUpdate, newValue})
    }
    if (toUpdate.when_date) {
      const fieldToUpdate = "when_date";
      const newValue = toUpdate.when_date;
      project = await Project.update({_id, fieldToUpdate, newValue})
    }
    return project; 
   } 

   // 상장 삭제하기
   static async deleteProject({ _id }) {
    const deleted = await Project.deleteById({ _id });
      if (!deleted) {
        const errorMessage = "수상내역이 존재하지 않습니다.";
        return { errorMessage };
      }
    return { status: "delete!"}
  }




}

export { projectService };
