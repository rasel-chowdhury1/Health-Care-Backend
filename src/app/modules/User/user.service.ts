import { Request, Response } from "express";


const createAdmin = async () => {

    return ({
        message: "admin created successfull"
    })
}


export const UserServices = {
    createAdmin
}