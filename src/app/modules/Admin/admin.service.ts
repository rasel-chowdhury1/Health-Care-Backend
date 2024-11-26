import { Prisma, PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const getAllAdminsFromDB = async (params: any) => {
    const { searchTerm, ...filterData } = params;
    const andCondions: Prisma.AdminWhereInput[] = [];
    
    if(searchTerm){
        andCondions.push({
            OR: ['name','email'].map(field => ({
                [field]: {
                    contains: params.searchTerm,
                    mode: 'insensitive'
                }
            }))
        })
    };

    // console.log({andCondions})

    if (Object.keys(filterData).length > 0) {
        andCondions.push({
            AND: Object.keys(filterData).map(key => ({
                [key]: {
                    equals: (filterData as any)[key]
                }
            }))
        })
    };

    // console.dir(andCondions, { depth: 'inifinity' })
    const whereConditons: Prisma.AdminWhereInput = { AND: andCondions }

    // console.dir(whereConditons, {depth: "infinity"})

    const result = await prisma.admin.findMany({
        where: whereConditons
    });

    return result;
}

export const AdminServices = {
    getAllAdminsFromDB
}