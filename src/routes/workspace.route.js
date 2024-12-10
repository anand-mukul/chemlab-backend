import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    workspaceName,
    fetchWorkspaceName,
    saveWorkspace,
} from "../controllers/workspace.controller.js";

const router = Router();

router.route("/workspace-name").post(workspaceName);
router.route("/workspace/:id").get(fetchWorkspaceName);
router.route("/save-workspace").post(saveWorkspace);

export default router;
