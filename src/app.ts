import express, { Application, Request, Response } from "express";
import cors from "cors";
import { userRoutes } from "./app/modules/User/user.routes";
import { AdminRoutes } from "./app/modules/Admin/admin.routes";
import router from "./app/routes";
import globalErrorHandler from "./app/middleWares/globalErrorHandler";



const app: Application = express();
app.use(cors());
//parser
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