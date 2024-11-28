import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
import globalErrorHandler from "./app/middleWares/globalErrorHandler";
import cookieParser from "cookie-parser";



const app: Application = express();
app.use(cors());

//parser
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (req:Request, res: Response) => {
     res.json("health care server is running...")
})

app.use("/api/v1", router); 

app.use(globalErrorHandler);

app.use((req: Request, res: Response) => {
     res.status(404).json({
          success: false,
          message: "API NOT FOUND!",
          error: {
              path: req.originalUrl,
              message: "Your requested path is not found!"
          } 
     })
})

export default app;