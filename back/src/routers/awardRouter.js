import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required"
import { AwardService } from "../services/awardService"

const awardRouter = Router();

// 상장 추가하기(Create)
awardRouter.post("/award/create", async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    // req (request) 에서 데이터 가져오기
    const title= req.body.title;
    const description = req.body.description;
    const authority = req.body.authority;
    const when_date = req.body.when_date

    // 위 데이터를 Award db에 추가하기
    const newAward = await AwardService.addAward({
      title,
      description,
      authority,
      when_date,
    });

    if (newAward.errorMessage) {
      throw new Error(newAward.errorMessage);
    }

    res.status(201).json(newAward);
  } catch (error) {
    next(error);
  }
});

  // 상장 하나 조회하기(READ)
  awardRouter.get("/awards/:id", login_required, async function (req, res, next) {
    try {
      const _id = req.params.id;
      const currentAwardInfo = await AwardService.getAwardInfo({ _id });

      if (currentAwardInfo.errorMessage) {
        throw new Error(currentAwardInfo.errorMessage);
      }

      res.status(200).send(currentAwardInfo);
    } catch (error) {
      next(error);
    }
  }
);

//유저의 전체 상장 조회하기
awardRouter.get("/userlist", login_required, async function (req, res, next) {
    try {
      const user_id = await userAuthService.user_id;
      const awardlist = await AwardService.getAwrds({user_id})

      if (awardlist.errorMessage) {
        throw new Error(awardlist.errorMessage);
      }

      res.status(200).send(awardlist);
    } catch (error) {
      next(error);
    }
  }
);

  //상장 수정하기(Update)
awardRouter.put("/awards/:id", login_required, async function (req, res, next) {
    try {
      // URI로부터 상장 사용자 id를 추출함.
      const _id = req.params.id;
      // body data 로부터 업데이트할 상장 정보를 추출함.
      const title = req.body.title ?? null;
      const description = req.body.description ?? null;
      const authority = req.body.authority ?? null;
      const when_date = req.body.when_date ?? null;

      const toUpdate = { title, description, authority, when_date };

      // 해당 사용자 아이디로 상장 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
      const updatedAward = await AwardService.setAward({ _id, toUpdate });

      if (updatedAward.errorMessage) {
        throw new Error(updatedAward.errorMessage);
      }

      res.status(200).json(updatedAward);
    } catch (error) {
      next(error);
    }
  }
);

  // 상장 list중 한개 삭제하기(Delete)

export { awardRouter };
