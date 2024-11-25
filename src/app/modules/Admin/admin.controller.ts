import { Request, Response } from "express";
import { AdminServices } from "./admin.service";
import sendResponse from "../../utils/SendResponse";



const getAllAdmin = async (req: Request, res: Response) => {
    console.log(req.query)
    const result = await AdminServices.getAllAdminsFromDB(req.query);
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