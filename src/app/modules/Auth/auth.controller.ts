import { NextFunction, Request, Response } from "express";
import { CatchAsync } from "../../utils/CatchAsync";
import { AuthServices } from "./auth.service";
import sendResponse from "../../utils/SendResponse";


const loginUser = CatchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await AuthServices.login(req.body);
    const {refreshToken, ...others} = result;

    res.cookie( 
        "RefreshToken",
        refreshToken, 
        {
            secure: false, 
            httpOnly: true
        }
    );

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Successfully login...",
        data: others
    })
})

const refreshToken = CatchAsync(async (req: Request, res: Response, next: NextFunction) => {


    const {RefreshToken} = req.cookies;

    console.log("refresh token -> ",{RefreshToken});

    const result = await AuthServices.refreshToken(RefreshToken);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Successfully generated access token",
        data: result
    })
})

export const AuthControllers = {
    loginUser,
    refreshToken
}