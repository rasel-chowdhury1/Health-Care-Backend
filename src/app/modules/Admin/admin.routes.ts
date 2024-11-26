import express from "express";
import { AdminControllers } from "./admin.controller";

const router = express.Router();

router.get("/", AdminControllers.getAllAdmin);
router.get("/:id", AdminControllers.getSpecificAdmin)
router.patch("/:id", AdminControllers.updateSpecificAdmin)
router.delete("/:id", AdminControllers.deletedSpecificAdmin)
router.delete("/soft/:id", AdminControllers.softDeletedSpecificAdmin)
export const AdminRoutes = router