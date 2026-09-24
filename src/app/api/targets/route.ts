import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function GET(){

    try{

        const targets = await prisma.target.findMany()

        return NextResponse.json({success: true, data: targets})
        
    }catch(error){
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json({success: false, error: errorMessage}, {status: 500})
    }

}