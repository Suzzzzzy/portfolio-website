import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required"
import { programmingLanguageService } from "../services/programmingLanguageService"

const programmingLanguageRouter = Router();
// 언어 추가하기(Create)
programmingLanguageRouter.post("/programmingLanguage/create", async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }
    // req (request) 에서 데이터 가져오기
    const user_id = req.body.user_id;
    const title= req.body.title;
    const proficiency = req.body.proficiency;

    // 위 데이터를 Award db에 추가하기
    const newProgrammingLanguage = await programmingLanguageService.addProgrammingLanguage({
      user_id,
      title,
      proficiency,
    });

    if (newProgrammingLanguage.errorMessage) {
      throw new Error(newProgrammingLanguage.errorMessage);
      
    }

    res.status(201).json(newProgrammingLanguage);
  } catch (error) {
    next(error);
  }
});

  // 사용자의 언어 한개 조회
programmingLanguageRouter.get("/programmingLanguages/:id", login_required, async function (req, res, next) {
  try {
    const PL_id = req.params.id;
    const currentPL = await programmingLanguageService.getAward({ PL_id });

    if (currentPL.errorMessage) {
      throw new Error(currentPL.errorMessage);
    }

    res.status(200).json(currentPL);
  } catch (error) {
    next(error);
  }
}
);

 // 사용자가 등록한 언어list 조회
 programmingLanguageRouter
.get("/programmingLanguageList/:user_id", login_required, async function (req, res, next) {
  try {
    const user_id = req.params.id;
    const programmingLanguageList = await programmingLanguageService.getProgrammingLanguageList({ user_id });

    if (programmingLanguageList.errorMessage) {
      throw new Error(programmingLanguageList.errorMessage);
    }

    res.status(200).json(programmingLanguageList);
  } catch (error) {
    next(error);
  }
}
);


  //언어 수정하기(Update)
programmingLanguageRouter.put("/programmingLanguages/:id", login_required, async function (req, res, next) {
    try {
      // URI로부터 언어 사용자 id를 추출함.
      const PL_id = req.params.id;
      // body data 로부터 업데이트할 언어 정보를 추출함.
      const title = req.body.title ?? null;
      const proficiency = req.body.proficiency ?? null;

      const toUpdate = { title, proficiency};

      // 해당 사용자 아이디로 언어 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
      const updatedProgrammingLanguage = await programmingLanguageService.setProgrammingLanguage({ PL_id, toUpdate });

      if (updatedProgrammingLanguage.errorMessage) {
        throw new Error(updatedProgrammingLanguage.errorMessage);
      }

      res.status(200).json(updatedProgrammingLanguage);
    } catch (error) {
      next(error);
    }
  }
);

// 언어 삭제하기
programmingLanguageRouter.delete("/programmingLanguage/:id", login_required, async function (req, res, next) {
  try {
    const PL_id = req.params.id;
    const deleted = await programmingLanguageService.deleteProgrammingLanguage({ PL_id });

    if (deleted.errorMessage) {
      throw new Error(deleted.errorMessage);
    }

    res.status(200).json(deleted, "삭제가 완료되었습니다.");
  } catch (error) {
    next(error);
  }
}
);

export { programmingLanguageRouter };
