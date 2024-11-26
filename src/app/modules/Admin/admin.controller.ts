import { Request, Response } from "express";
import { AdminServices } from "./admin.service";
import sendResponse from "../../utils/SendResponse";
import pickFields from "../../../shared/pick";



const getAllAdmin = async (req: Request, res: Response) => {
    // console.log(req.query)
    const filters = pickFields(req.query, ['searchTerm','name', 'email', 'contactNumber'])

    const result = await AdminServices.getAllAdminsFromDB(filters);
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