import express,{ Request, Response } from "express";
import dotenv from "dotenv";
import HrmsRoute from "./component/juidcoHrms/router";
import cors from "cors";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// Root route
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to HRMS");
});


/// JUIDCO_FINANCE ///
new HrmsRoute( app);
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to HRMS");
});


// app.use(loggerMiddleware);

export default app;
