// gratuity.route.ts

import { Router } from "express";
import GratuityController from "../../controller/gratuity/gratutity.controller"; // Update the path accordingly

const router = Router();
const gratuityController = new GratuityController();

router.get("/gratuity", (req, res, next) =>
  gratuityController.get(req, res, next, "0304")
);

export default router;
