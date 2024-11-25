
import express from "express";
import { UserControllers } from "./user.controller";

const router = express.Router();

router.get("/", UserControllers.allUsers)
router.post("/", UserControllers.createAdmin)

export const userRoutes = router;