// model은 mongodb와 상호작용하기 위한 기본 도구인 class
// 참고: https://runebook.dev/ko/docs/mongoose/api/model
import { AwardModel } from "../schemas/award";
import mongoose from "mongoose"

// 상장 추가
class Award {
  static async create({ newAward }) {
    const createdNewAward = await AwardModel.create(newAward);
    return createdNewAward;
  }

  // 선택한 상장 불러오기
  static async findByName({ title }) {
    const award = await AwardModel.findOne({ title });
    return award;
  }

  // 사용자 상장 수정하기
  static async update({ awardId, fieldToUpdate, newValue }) {
    const filter = { id: awardId }; 
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };
      
      // 수정된게 있으면 update
    const updatedAward = await AwardModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedAward;
  }
}

export { Award };
