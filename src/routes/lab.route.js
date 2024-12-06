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

router.route("/chemicals").get(fetchChemicals);
router.route("/instruments").get(fetchInstruments);
router
  .route("/instruments/:id/add-chemical")
  .post(addChemicalToInstrument);

router.route("/reaction").post(simulateReaction);

export default router;
