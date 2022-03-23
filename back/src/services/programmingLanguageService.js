import { ProgrammingLanguage } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

class programmingLanguageService {
  static async addProgrammingLanguage({ user_id, title, proficiency}) {
    const PL_id = uuidv4();
    // 상장 추가하기(CREATE)
      // 상장 중복 확인
    const programmingLanguage = await ProgrammingLanguage.findById({PL_id});
      if (programmingLanguage) {
        const errorMessage = "이미 존재하는 정보입니다."
        return { errorMessage }
      }
    const newProgrammingLanguage = ({ id: PL_id, user_id, title, proficiency })
    const creatednewProgrammingLanguage = await ProgrammingLanguage.create({ newProgrammingLanguage });
    creatednewProgrammingLanguage.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    return creatednewProgrammingLanguage;
  }

   // 상장 불러오기
   static async getProgrammingLanguage({PL_id}) {
     const programmingLanguage = await ProgrammingLanguage.findById({PL_id});
     return programmingLanguage;
   }

   // 사용자 상장list 불러오기
   static async getProgrammingLanguageList({ user_id }) {
    const programmingLanguageList = await ProgrammingLanguage.findById({ user_id });
      if (!programmingLanguageList) {
        const errorMessage = "내역이 존재하지 않습니다.";
        return { errorMessage };
      }
    return programmingLanguageList;
  }

   // 상장 수정하기
   static async setProgrammingLanguage({PL_id, toUpdate}) {
     let programmingLanguage = await ProgrammingLanguage.findById(PL_id);

     if (toUpdate.title) {
       const fieldToUpdate = "title";
       const newValue = toUpdate.title;
       programmingLanguage = await ProgrammingLanguage.update({PL_id, fieldToUpdate, newValue})
     }
     if (toUpdate.proficiency) {
      const fieldToUpdate = "proficiency";
      const newValue = toUpdate.proficiency;
      programmingLanguage = await programmingLanguage.update({PL_id, fieldToUpdate, newValue})
    }
    return programmingLanguage; 
   } 

   // 상장 삭제하기
   static async deleteProgrammingLanguage({ PL_id }) {
    const deleted = await ProgrammingLanguage.deleteById({ PL_id });
      if (!deleted) {
        const errorMessage = "내역이 존재하지 않습니다.";
        return { errorMessage };
      }
    return { status: "delete!"}
  }




}

export { programmingLanguageService };
