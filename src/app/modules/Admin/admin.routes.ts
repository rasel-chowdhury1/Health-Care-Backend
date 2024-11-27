import express, { NextFunction, Request, Response } from "express";
import { AdminControllers } from "./admin.controller";
import { adminValidationSchemas} from "./admin.validatons";
import validateRequest from "../../middleWares/validateRequest";

const router = express.Router();


router.get("/",  AdminControllers.getAllAdmin);
router.get("/:id", AdminControllers.getSpecificAdmin)
router.patch(
    "/:id", 
    validateRequest(adminValidationSchemas.update), 
    AdminControllers.updateSpecificAdmin
)
router.delete("/:id", AdminControllers.deletedSpecificAdmin)
router.delete("/soft/:id", AdminControllers.softDeletedSpecificAdmin)


export const AdminRoutes = router;