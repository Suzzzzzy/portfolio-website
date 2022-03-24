import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required"
import { projectService } from "../services/projectService"

const projectRouter = Router();
// 상장 추가하기(Create)
projectRouter.post("/project/create", async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }
    // req (request) 에서 데이터 가져오기
    const user_id = req.body.user_id;
    const title= req.body.title;
    const description = req.body.description;
    const when_date = req.body.when_date

    // 위 데이터를 Project db에 추가하기
    const newProject = await projectService.addProject({
      user_id,
      title,
      description,
      when_date,
    });

    if (newProject.errorMessage) {
      throw new Error(newProject.errorMessage);
      
    }

    res.status(201).json(newProject);
  } catch (error) {
    next(error);
  }
});

  // 사용자의 상장 한개 조회
projectRouter.get("/project/:id", login_required, async function (req, res, next) {
  try {
    const _id = req.params.id;
    const project = await projectService.getProject({ _id });

    if (project.errorMessage) {
      throw new Error(project.errorMessage);
    }

    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
}
);

 // 사용자가 등록한 프로젝트list 조회
 projectRouter.get("/projectlist/:user_id", async function (req, res, next) {
  try {
    const user_id = req.params.user_id;
    const projectlist = await projectService.getProjectList({ user_id });

    if (projectlist.errorMessage) {
      throw new Error(projectlist.errorMessage);
    }

    res.status(200).json(projectlist);
  } catch (error) {
    next(error);
  }
}
);


  //프로젝트 수정하기(Update)
projectRouter.put("/projects/:id", login_required, async function (req, res, next) {
    try {
      const user_id = req.body.user_id;
      // URI로부터 프로젝트 사용자 id를 추출함.
      const _id = req.params.id;
      // body data 로부터 업데이트할 상장 정보를 추출함.
      const title = req.body.title ?? null;
      const description = req.body.description ?? null;
      const when_date = req.body.when_date ?? null;

      const toUpdate = { user_id, _id, title, description, when_date };

      // 해당 사용자 아이디로 상장 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
      const updatedProject = await projectService.setProject({ _id, toUpdate });

      if (updatedProject.errorMessage) {
        throw new Error(updatedProject.errorMessage);
      }

      res.status(200).json(updatedProject);
    } catch (error) {
      next(error);
    }
  }
);

// 상장 삭제하기
projectRouter.delete("/projects/:id", login_required, async function (req, res, next) {
  try {
    const _id = req.params.id;
    const deleted = await projectService.deleteProject({ _id });

    if (deleted.errorMessage) {
      throw new Error(deleted.errorMessage);
    }

    res.status(200).json(deleted, "삭제가 완료되었습니다.");
  } catch (error) {
    next(error);
  }
}
);

export { projectRouter };
