import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }){
    const { id } = await params;
    try{

        await prisma.target.delete({
            where: {
                id: id
            }
        })

        return NextResponse.json({success: true}, {status: 200})

    }catch(error){
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json({success: false, error: "Error in deleting target with id: " + id + "\n" + errorMessage}, {status: 500})
    }
}