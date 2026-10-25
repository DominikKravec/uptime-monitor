import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
){
    try{

        const { searchParams } = new URL(request.url);

        const limit = parseInt(searchParams.get('limit') || '20', 10)
        const id = params.id

        const logs = prisma.pingLog.findMany({
            where: {
                targetId: id
            },
            orderBy: {
                timestamp: 'desc'
            },
            take: limit

        })

        return NextResponse.json({success: true, data: logs}, {status: 201})

    }catch(error){
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json({success: false, error: "Error fetching logs: " + "\n" + errorMessage}, {status: 500})
    }
}