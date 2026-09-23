import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Instantiate the Prisma client outside the function so it can be reused
const prisma = new PrismaClient();

const TIME_OUT = 10000;

//returns [statusCode, latency]
const ping = async (targetURL: string): Promise<[number, number] | null> => {
    const startTime = performance.now()

        try{

            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), TIME_OUT);

            const response = await fetch(targetURL, {
                cache: 'no-store',
                signal: controller.signal
            })

            clearTimeout(timeoutId)

            const endTime = performance.now()
            const latency = Math.round(endTime - startTime)

            return [response.status, latency]
            
        }catch(error){
            console.log("Website is unreachable or timed out!!!")
        }

    return null
}

const createLog = async (targetId: string, statusCode: number, responseTime: number, isUp: boolean) => {

    try{
        const newLog = await prisma.pingLog.create({
            data: {
                targetId: targetId,
                statusCode: statusCode,
                responseTime: responseTime,
                isUp: isUp
            }
        })

    }catch{
        console.log("Error creating log for " + targetId)
    }
}

export async function  GET() {

    try{        

        const activeTargets = await prisma.target.findMany({
            where: {
                active: true
            }
        })

        for(let target of activeTargets){

            const targetUrl: string = target.url
               
            const res = await ping(targetUrl)
            console.log(targetUrl + " " + res)
        }

        return NextResponse.json({"success": true})

    }catch(error){
        console.error("Database query failed:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch targets" }, { status: 500 });
    }

}