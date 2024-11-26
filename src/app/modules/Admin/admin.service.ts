import { Admin, Prisma, UserStatus } from "@prisma/client"
import { AdminSearchableFields } from "./admin.constant";
import { calculatePagination } from "../../../helpers/pagenationsHelper";
import { prisma } from "../../../helpers/prisma";



const getAllAdminsFromDB = async (params: any, options: any) => {
    const { searchTerm, ...filterData } = params;
    const {page, skip, limit, sortBy, sortOrder } = calculatePagination(options);

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
    

    andCondions.push({
        isDeleted: false
    })

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

    const total = await prisma.admin.count({
        where: whereConditons
    })

    return {
        meta: {
            page,
            limit,
            total
        },
        data: result
    };
}

const getDataByIdFromDB = async (id: string) => {
     const result = await prisma.admin.findUniqueOrThrow({
        where: {
            id: id,
            isDeleted: false
        },
     })

  

     return result;
}

const updateSpecificAdminIntoDB = async (id: string, update: Partial<Admin>) => {

    await prisma.admin.findUniqueOrThrow({
        where: {
            id, 
            isDeleted: false
        }
    })

    const result = await prisma.admin.update({
        where: {
            id: id
        },
        data: update
    })

    return result;
}

const deleteAdminIntoDB = async(id: string) => {
    console.log("service -> ",{id})
    const result = await prisma.$transaction(async (transactionClient) => {
        const deletedAdmin = await transactionClient.admin.delete({
            where: {
                id
            }
        })

        console.log({deletedAdmin})

        const deletedUser = await transactionClient.user.delete({
            where: {
                email: deletedAdmin.email
            }
        })

        console.log({deletedUser})

        return deletedAdmin;
    })

    console.log({result})

    return result;
}

const softDeleteAdminIntoDB = async(id: string) => {
    console.log("service -> ",{id})

    await prisma.admin.findUniqueOrThrow({
        where: {id}
    })
    const result = await prisma.$transaction(async (transactionClient) => {
        const deletedAdmin = await transactionClient.admin.update({
            where: {
                id
            },
            data: {
                isDeleted: true
            }
        })

        console.log({deletedAdmin})

        const deletedUser = await transactionClient.user.update({
            where: {
                email: deletedAdmin.email
            },
            data: {
                status: UserStatus.DELETED
            }
        })

        console.log({deletedUser})

        return deletedAdmin;
    })

    console.log({result})

    return result;
}

export const AdminServices = {
    getAllAdminsFromDB,
    getDataByIdFromDB,
    updateSpecificAdminIntoDB,
    deleteAdminIntoDB,
    softDeleteAdminIntoDB
}