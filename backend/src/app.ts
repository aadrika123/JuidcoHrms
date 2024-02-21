import express from "express";
import dotenv from "dotenv";
import HrmsRoute from "./component/juidcoPfms/router";
import cors from "cors";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

/// JUIDCO_FINANCE ///
new HrmsRoute(app);

export default app;
