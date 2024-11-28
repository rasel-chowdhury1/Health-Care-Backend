import jwt, { JwtPayload } from "jsonwebtoken";


const generatetoken = (payload: any, privateKey: string, expiresIn: string) => {
   const token = jwt.sign(
       payload, 
       privateKey, 
       {
            algorithm: "HS256",
            expiresIn
        });
    
    return token;
}

const verifyToken = (token: string, secret: string) => {
    return jwt.verify(token, secret) as JwtPayload
}

export const JWtHelpers = {
    generatetoken,
    verifyToken
}