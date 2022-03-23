import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required"
import { certificateService } from "../services/certificate"

const certificateRouter = Router();
// 자격증 추가하기(Create)
certificateRouter.post("/certificate/create", async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }
    // req (request) 에서 데이터 가져오기
    const title= req.body.title;
    const description = req.body.description;
    const when_date = req.body.when_date;

    // 위 데이터를 Certificate db에 추가하기
    const newCertificate = await certificateService.addCertificate({
      title,
      description,
      when_date,
    });

    if (newCertificate.errorMessage) {
      throw new Error(newCertificate.errorMessage);
      
    }

    res.status(201).json(newCertificate);
  } catch (error) {
    next(error);
  }
});

//자격증 조회

certificateRouter.get("/certificates/:id", login_required, async function (req, res, next) {
  try {
    const _id = req.params.id;
    const certificate = await certificateService.getCertificate({ _id });

    if (certificate.errorMessage) {
      throw new Error(certificate.errorMessage);
    }

    res.status(200).json(certificate);
  } catch (error) {
    next(error);
  }
}
);

  //사용자가 등록한 자격증List 조회
  certificateRouter.get("/certificatelist/:certificate_id", login_required, async function (req, res, next) {
    try {
      const certificate_id = req.params.id;
      const certificatelist = await certificateService.getCertificate({ certificate_id });

      if (certificatelist.errorMessage) {
        throw new Error(certificatelist.errorMessage);
      }

      res.status(200).json(certificatelist);
    } catch (error) {
      next(error);
    }
  }
  );
  

  //자격증 수정하기(Update)
certificateRouter.put("/certificates/:id", login_required, async function (req, res, next) {
    try {
      // URI로부터 자격증 사용자 id를 추출함.
      const certificate_id = req.params.id;
      // body data 로부터 업데이트할 자격증 정보를 추출함.
      const title = req.body.title ?? null;
      const description = req.body.description ?? null;
      const when_date = req.body.when_date ?? null;

      const toUpdate = { title, description, when_date };

      // 해당 사용자 아이디로 자격증 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
      const updatedCertificate = await certificateService.setCertificate({ certificate_id, toUpdate });

      if (updatedCertificate.errorMessage) {
        throw new Error(updatedCertificate.errorMessage);
      }

      res.status(200).json(updatedCertificate);
    } catch (error) {
      next(error);
    }
  }
);

//자격증 삭제하기
certificateRouter.delete("/certificate/:id", login_required, async function (req, res, next) {
  try {
    const certificate_id = req.params.id;
    const deleted = await certificateService.deleteCertificate({ certificate_id });

    if (deleted.errorMessage) {
      throw new Error(deleted.errorMessage);
    }

    res.status(200).json(deleted, "삭제가 완료되었습니다.");
  } catch (error) {
    next(error);
  }
}
);


export { certificateRouter };