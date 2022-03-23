import { ProjectModel } from "../schemas/project";
import mongoose from "mongoose";

// 프로젝트 추가
class Project {
  static async create({ newProject }) {
    const createdNewProject = await ProjectModel.create(newProject);
    return createdNewProject;
  }

  // 선택한 프로젝트 불러오기
  static async findById({ _id }) {
    const project = await ProjectModel.findOne({ _id: _id });
    return project;
  }
  

// 사용자 상장list 불러오기
  static async findByAll({ user_id }) {
    const projectlist = await ProjectModel.find({ user_id });
    return projectlist;
  }

  // 사용자 프로젝트 수정하기
  static async update({ _id, fieldToUpdate, newValue }) {
    const filter = { _id: _id }; //(id: _id)?
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    // 수정된게 있으면 update
    const updateProject = await ProjectModel.findOneAndUpdate(
        filter,
        update,
        option
    );
    return updateProject;
  }
}

export { Project };