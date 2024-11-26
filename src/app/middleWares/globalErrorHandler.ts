import { NextFunction, Request, Response } from "express";

const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({
        success: true,
        message: err.name || "Something went wrong!",
        error: err
    })
}

export default globalErrorHandler;