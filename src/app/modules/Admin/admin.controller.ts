import { Request, Response } from "express";
import { AdminServices } from "./admin.service";
import sendResponse from "../../utils/SendResponse";
import pickFields from "../../../shared/pick";
import { AdminFilterableFields } from "./admin.constant";



const getAllAdmin = async (req: Request, res: Response) => {
    // console.log(req.query)
    const filters = pickFields(req.query, AdminFilterableFields);
    const options = pickFields(req.query, ['page','limit','sortBy','sortOrder'])

    const result = await AdminServices.getAllAdminsFromDB(filters,options);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Fetech admin data ",
        data: result
    })
}

export const AdminControllers = {
    getAllAdmin
}