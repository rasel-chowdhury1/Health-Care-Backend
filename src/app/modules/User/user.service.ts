import { PrismaClient, UserRole } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient()

const allUser = async () => {
    const result = await prisma.user.findMany({
        select: {
            email: true,
            role: true,
            needPasswordChange: true, 
            status: true
        }
    })
    return result;
}

const createAdmin = async (data: any) => {
    
    const hashedPassword = await bcrypt.hash(data.password, 12);
    console.log({hashedPassword})

    const userData = {
        email: data.admin.email,
        password: hashedPassword,
        role: UserRole.ADMIN,
        needPasswordChange: true
    }

    const result = await prisma.$transaction(async (transactionClient) => {
        const createdUserData = await transactionClient.user.create({
            data: userData
        })

        const createdAdminData = await transactionClient.admin.create({
            data: data.admin
        })

        return createdAdminData
    })

    console.log({result})

    return result
}


export const UserServices = {
    createAdmin,
    allUser
}