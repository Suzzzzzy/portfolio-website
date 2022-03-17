import { Award } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

class awardService {
  static async addAward({ title, description, authority, when_date}) {
    
    // 상장 추가하기(CREATE)
      // 상장 중복 확인
    const award = await Award.findByName({title});
      if (award) {
        const errorMessage = "이미 존재하는 수상정보입니다."
        return { errorMessage }
      }
    const newAward = ({ title, description, authority, when_date })
    const createdNewAward = await Award.create({ newAward });
    createdNewAward.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    return createdNewAward;
  }

   // 상장 불러오기
   static async getAwards({awardId}) {
     const awards = await Award.findById({awardId});
     return awards;
   }

   // 상장 수정하기
   static async setAward({awardId, toUpdate}) {
     let award = await Award.findById(awardId);

     if (toUpdate.title) {
       const fieldToUpdate = "title";
       const newValue = toUpdate.title;
       award = await Award.update({awardId, fieldToUpdate, newValue})
     }
     if (toUpdate.description) {
      const fieldToUpdate = "description";
      const newValue = toUpdate.description;
      award = await Award.update({awardId, fieldToUpdate, newValue})
    }
    if (toUpdate.authority) {
      const fieldToUpdate = "authority";
      const newValue = toUpdate.authority;
      award = await Award.update({awardId, fieldToUpdate, newValue})
    }
    if (toUpdate.when_date) {
      const fieldToUpdate = "when_date";
      const newValue = toUpdate.when_date;
      award = await Award.update({awardId, fieldToUpdate, newValue})
    }
    return award; 
   } 






}

export { awardService };
