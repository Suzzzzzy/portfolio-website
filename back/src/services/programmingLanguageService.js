import { ProgrammingLanguage } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

class programmingLanguageService {
  static async addProgrammingLanguage({ user_id, position, proficiency}) {
    const _id = uuidv4();
    // 상장 추가하기(CREATE)
    const programmingLanguage = await ProgrammingLanguage.findById({_id});

    const newProgrammingLanguage = ({ id: _id, user_id, position, proficiency })
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
    const programmingLanguageList = await ProgrammingLanguage.findByAll({ user_id });

    return programmingLanguageList;
  }

   // 상장 수정하기
   static async setProgrammingLanguage({_id, toUpdate, user_id}) {
     let programmingLanguage = await ProgrammingLanguage.findById(_id);

     if (toUpdate.position) {
       const fieldToUpdate = "position";
       const newValue = toUpdate.position;
       programmingLanguage = await ProgrammingLanguage.update({_id, fieldToUpdate, newValue})
     }
     if (toUpdate.proficiency) {
      const fieldToUpdate = "proficiency";
      const newValue = toUpdate.proficiency;
      programmingLanguage = await programmingLanguage.update({_id, fieldToUpdate, newValue})
    }
    return programmingLanguage; 
   } 

   // 상장 삭제하기
   static async deleteProgrammingLanguage({ _id }) {
    const deleted = await ProgrammingLanguage.deleteById({ _id });

    return deleted;
  }




}

export { programmingLanguageService };
