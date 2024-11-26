import { Prisma, PrismaClient } from "@prisma/client"
import { AdminSearchableFields } from "./admin.constant";
import { calculatePagination } from "../../../helpers/pagenationsHelper";

const prisma = new PrismaClient()

const getAllAdminsFromDB = async (params: any, options: any) => {
    const { searchTerm, ...filterData } = params;
    const {skip, limit, sortBy, sortOrder } = calculatePagination(options);

    const andCondions: Prisma.AdminWhereInput[] = [];
    
    if(searchTerm){
        andCondions.push({
            OR: AdminSearchableFields.map(field => ({
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
        where: whereConditons,
        skip: skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder
        }
    });

    return result;
}

export const AdminServices = {
    getAllAdminsFromDB
}