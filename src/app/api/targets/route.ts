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

export async function POST(request: Request){
    try{

        const body = await request.json()

        const {name, url, interval} = body

        if(!name || !url){
            return NextResponse.json({success: false, error: "Name and url required"}, {status: 400})
        }

        const newTarget = await prisma.target.create({
            data:{
                name: name,
                url: url,
                interval: interval ? interval : 60,
                active: true
            }
        })

        return NextResponse.json({success: true, data: newTarget}, {status: 201})

    }catch(error){
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json({success: false, error: errorMessage}, {status: 500})
    }
}