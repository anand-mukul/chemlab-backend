import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    workspaceName,
    fetchWorkspaceName,
    saveWorkspace,
} from "../controllers/workspace.controller.js";

const router = Router();

router.route("/workspace-name").post(verifyJWT, workspaceName);
router.route("/workspace/:id").get(verifyJWT, fetchWorkspaceName);
router.route("/save-workspace").post(verifyJWT, saveWorkspace);

export default router;
