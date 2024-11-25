import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const getAllAdminsFromDB = async (params: any) => {
    const searchValue = params.searchTerm;
    let result;
    if(searchValue){
        const searchFields = ['name', 'email'];
        result = await prisma.admin.findMany({
            where: {
                OR: searchFields.map(field => ({
                    [field]: {
                        contains: params.searchTerm,
                        mode: "insensitive"
                    }
                }))
            }
        });
    }
    else{
        result = await prisma.admin.findMany()
    }
    return result;
}

export const AdminServices = {
    getAllAdminsFromDB
}