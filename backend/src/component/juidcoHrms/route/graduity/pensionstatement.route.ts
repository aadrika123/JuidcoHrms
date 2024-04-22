// gratuity.route.ts

import { Router } from "express";
import PensionStatementController from "../../controller/gratuity/pensionstatement.controller";

const router = Router();
const pensionstatementController = new PensionStatementController();

router.get("/pension/statement", (req, res, next) =>
    pensionstatementController.get(req, res, next, "0304")
);

export default router;
