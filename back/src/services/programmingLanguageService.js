import { ProgrammingLanguage } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

class programmingLanguageService {
  static async addProgrammingLanguage({ _id, title, proficiency}) {
    
    // 상장 추가하기(CREATE)
      // 상장 중복 확인
    const programmingLanguage = await Award.findById({_id});
      if (programmingLanguage) {
        const errorMessage = "이미 존재하는 수상정보입니다."
        return { errorMessage }
      }
    const newProgrammingLanguage = ({ title, proficiency })
    const creatednewProgrammingLanguage = await ProgrammingLanguage.create({ newProgrammingLanguage });
    creatednewProgrammingLanguage.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    return creatednewProgrammingLanguage;
  }

   // 상장 불러오기
   static async getProgrammingLanguage({_id}) {
     const programmingLanguage = await ProgrammingLanguage.findById({_id});
     return programmingLanguage;
   }

   // 사용자 상장list 불러오기
   static async getProgrammingLanguageList({ user_id }) {
    const programmingLanguageList = await ProgrammingLanguage.findById({ user_id });
      if (!programmingLanguageList) {
        const errorMessage = "수상내역이 존재하지 않습니다.";
        return { errorMessage };
      }
    return programmingLanguageList;
  }

   // 상장 수정하기
   static async setProgrammingLanguage({_id, toUpdate}) {
     let programmingLanguage = await ProgrammingLanguage.findById(_id);

     if (toUpdate.title) {
       const fieldToUpdate = "title";
       const newValue = toUpdate.title;
       programmingLanguage = await ProgrammingLanguage.update({_id, fieldToUpdate, newValue})
     }
     if (toUpdate.description) {
      const fieldToUpdate = "proficiency";
      const newValue = toUpdate.description;
      programmingLanguage = await programmingLanguage.update({_id, fieldToUpdate, newValue})
    }
    return programmingLanguage; 
   } 

   // 상장 삭제하기
   static async deleteProgrammingLanguage({ _id }) {
    const deleted = await ProgrammingLanguage.deleteById({ _id });
      if (!deleted) {
        const errorMessage = "수상내역이 존재하지 않습니다.";
        return { errorMessage };
      }
    return { status: "delete!"}
  }




}

export { programmingLanguageService };
