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
  static async findById({ _id }) {
    const certificate = await CertificateModel.findOne({ _id: _id });
    return certificate;
  }

  //사용자 자격증 List 불러오기
  static async findByAll({ user_id }) {
      const certificatelist = await CertificateModel.find({ user_id });
      return certificatelist;
  }

// 사용자 자격증 수정하기
  static async update({ _id, fieldToUpdate, newValue }) {
    const filter = { _id: _id }; 
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


//삭제하기
static async deleteByid ({ _id }) {
    const deleted = await CertificateModel.deleteOne({ _id });
    return deleted;
}

}

export { Certificate };