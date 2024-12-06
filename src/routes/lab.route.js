import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  fetchChemicals,
  fetchInstruments,
  addChemicalToInstrument,
  simulateReaction,
  saveWorkspace,
} from "../controllers/lab.controller.js";

const router = Router();

router.route("/chemicals").get(verifyJWT, fetchChemicals);
router.route("/instruments").get(verifyJWT, fetchInstruments);
router
  .route("/instruments/:id/add-chemical")
  .post(verifyJWT, addChemicalToInstrument);

router.route("/reaction").post(verifyJWT, simulateReaction);

export default router;
