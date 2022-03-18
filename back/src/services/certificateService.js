import { Certificate } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

class certificateService {
  static async addCertificate({ certificate_id, title, description, when_date}) {
    
    // 자격증 추가하기(CREATE)
      // 자격증 중복 확인
    const certificate = await Certificate.findById({certificate_id});
      if (certificate) {
        const errorMessage = "이미 존재하는 자격증정보입니다."
        return { errorMessage }
      }
    const newCertificate = ({ title, description, when_date })
    const createdNewCertificate = await Certificate.create({ newCertificate });
    createdNewCertificate.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    return createdNewCertificate;
  }

   // 자격증 불러오기
   static async getCertificate({certificate_id}) {
     const certificate = await Award.findById({certificate_id});
     return certificate;
   }

   // 자격증 수정하기
   static async setCertificate({certificate_id, toUpdate}) {
     let certificate = await Certificate.findById(certificate_id);

     if (toUpdate.title) {
       const fieldToUpdate = "title";
       const newValue = toUpdate.title;
       award = await Certificate.update({certificate_id, fieldToUpdate, newValue})
     }
     if (toUpdate.description) {
      const fieldToUpdate = "description";
      const newValue = toUpdate.description;
      award = await Certificate.update({certificate_id, fieldToUpdate, newValue})
    }
    if (toUpdate.authority) {
      const fieldToUpdate = "authority";
      const newValue = toUpdate.authority;
      award = await Award.update({_id, fieldToUpdate, newValue})
    }
    if (toUpdate.when_date) {
      const fieldToUpdate = "when_date";
      const newValue = toUpdate.when_date;
      award = await Award.update({_id, fieldToUpdate, newValue})
    }
    return award; 
   } 






}

export { certificateService };
