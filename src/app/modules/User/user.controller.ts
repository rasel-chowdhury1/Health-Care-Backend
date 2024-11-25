import { Request, Response } from "express";
import { UserServices } from "./user.service";
import sendResponse from "../../utils/SendResponse";



const allUsers = async (req: Request, res: Response) => {
    const result = await UserServices.allUser();
    res.send(result)
}

const createAdmin = async (req: Request, res: Response) => {
    try {
        // console.log(req.body)
        const result  = await UserServices.createAdmin(req.body);

        sendResponse(res, {
            success: true,
            statusCode: 200,
            message: "Admin created successfully",
            data: result
        })
    } catch (err) {
        sendResponse(res, {
            success: false,
            statusCode: 500,
            message: err?.name || "Something went wrong",
            data: err
        })
    }
}

export const UserControllers = {
    createAdmin,
    allUsers
}