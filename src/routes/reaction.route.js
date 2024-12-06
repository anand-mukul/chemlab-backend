import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { reactionController } from "../controllers/reaction.controller.js";

const router = Router();

router.route("/reaction").post(verifyJWT, reactionController);

export default router;
