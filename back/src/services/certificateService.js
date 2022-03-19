import { Certificate } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

class certificateService {
  static async addCertificate({ _id, title, description, when_date}) {
    
    // 자격증 추가하기(CREATE)
      // 자격증 중복 확인
    const certificate = await Certificate.findById({_id});
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
   static async getCertificate({_id}) {
     const certificate = await Certificate.findById({_id});
     return certificate;
   }

   // 사용자 자격증 List 불러오기
   static async getCertificatelist({ user_id }) {
       const certificatelist = await Certificate.findById({ user_id });
            if (!certificatelist) {
                const errorMessage = "자격증내역이 존재하지 않습니다.";
                return { errorMessage }; 
            }
        return certificatelist;
   }

   // 자격증 수정하기
   static async setCertificate({_id, toUpdate}) {
     let certificate = await Certificate.findById(_id);

     if (toUpdate.title) {
       const fieldToUpdate = "title";
       const newValue = toUpdate.title;
       award = await Certificate.update({_id, fieldToUpdate, newValue})
     }
     if (toUpdate.description) {
      const fieldToUpdate = "description";
      const newValue = toUpdate.description;
      award = await Certificate.update({_id, fieldToUpdate, newValue})
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
    return certificate; 
   } 

   // 자격증 삭제하기
   static async deleteCertificate({ _id }) {
    const deleted = await Certificate.deleteById({ _id });
      if (!deleted) {
        const errorMessage = "수상내역이 존재하지 않습니다.";
        return { errorMessage };
      }
    return { status: "delete!"}
  }

}
 
export { certificateService };
