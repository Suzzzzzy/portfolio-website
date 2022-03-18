// model은 mongodb와 상호작용하기 위한 기본 도구인 class
// 참고: https://runebook.dev/ko/docs/mongoose/api/model
import { CertificateModel } from "../schemas/certificate";
import mongoose from "mongoose"

// 자격증 추가
class Certificate {
  static async create({ newCertificate }) {
    const createdNewCertificate = await CertificateModel.create(newCertificate);
    return createdNewCertificate;
  }

  // 선택한 자격증 불러오기
  static async findById({ certificate_id }) {
    const certificate = await CertificateModel.findOne({ certificate_id: certificate_id });
    return certificate;
  }

  // 사용자 자격증 수정하기
  static async update({ certificate_id, fieldToUpdate, newValue }) {
    const filter = { certificate_id: certificate_id }; 
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };
      
      // 수정된게 있으면 update
    const updatedCertificate = await CertificateModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedCertificate;
  }
}

export { Certificate };
