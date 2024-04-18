import express from "express";
import dotenv from "dotenv";
import HrmsRoute from "./component/juidcoHrms/router";
import cors from "cors";



dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

/// JUIDCO_FINANCE ///
new HrmsRoute( app);

// app.use(loggerMiddleware);

export default app;
