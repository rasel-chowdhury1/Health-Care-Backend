import { prisma } from "../../../helpers/prisma";
import * as bcrypt from "bcrypt";
import { JWtHelpers } from "../../../helpers/jwtHelpers";

const login = async (payload: {email: string, password: string}) => {

    console.log("login service -> ", payload)
    const userData = await prisma.user.findUniqueOrThrow({
        where: {
            email: payload.email
        }
    })

    const IsPasswordMatch = await bcrypt.compare(payload.password, userData.password);

    if(!IsPasswordMatch){
        throw new Error("Password does not matched...")
    }
    const accessToken = JWtHelpers.generatetoken(
        {email: userData.email, role: userData.role},
        "AccessToken",
        '5m'
    )

    const refreshToken = JWtHelpers.generatetoken(
        {email: userData.email, role: userData.role},
        "RefreshToken",
        '30d'
    )

    return {
        accessToken,
        refreshToken,
        needPasswordChange: userData.needPasswordChange
    }
};

export const AuthServices = {
    login
}