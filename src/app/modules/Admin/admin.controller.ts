import { NextFunction, Request, Response } from "express";
import { AdminServices } from "./admin.service";
import sendResponse from "../../utils/SendResponse";
import pickFields from "../../../shared/pick";
import { AdminFilterableFields } from "./admin.constant";
import { CatchAsync } from "../../utils/CatchAsync";



const getAllAdmin = CatchAsync(async (req: Request, res: Response) => {
    // console.log(req.query)
    const filters = pickFields(req.query, AdminFilterableFields);
    const options = pickFields(req.query, ['page','limit','sortBy','sortOrder'])

    const result = await AdminServices.getAllAdminsFromDB(filters,options);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Fetech admin data ",
        meta: result.meta,
        data: result.data
    })
})

const getSpecificAdmin = CatchAsync(async( req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params;
    const result = await AdminServices.getDataByIdFromDB(id);
        
        if(result){
            sendResponse(res, {
                statusCode: 200,
                success: true,
                message: "Admin fatched by id",
                data: result
            })
        }
        else{
            sendResponse(res, {
                statusCode: 200,
                success: true,
                message: "Data not foundd",
                data: result
            })
        }
})

const updateSpecificAdmin = CatchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params;
    const data = req.body;
    console.log({id,data})
    const result = await AdminServices.updateSpecificAdminIntoDB(id, data);
    
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Admin data updated by id",
        data: result
    })
})

const deletedSpecificAdmin = CatchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params;
    console.log({id})
    const result = await AdminServices.deleteAdminIntoDB(id);
    
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Admin data deleted.",
        data: result
    })
})

const softDeletedSpecificAdmin = CatchAsync( async(req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params;
    console.log({id})
    const result = await AdminServices.softDeleteAdminIntoDB(id);
    
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Admin data deleted.",
        data: result
    })
})


export const AdminControllers = {
    getAllAdmin,
    getSpecificAdmin,
    updateSpecificAdmin,
    deletedSpecificAdmin,
    softDeletedSpecificAdmin
}