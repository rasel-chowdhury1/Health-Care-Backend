import jwt from "jsonwebtoken";


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

export const JWtHelpers = {
    generatetoken
}