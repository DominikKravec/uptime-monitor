import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

interface target {
 id: string;
 name: string;
 url: string;
 interval: number;
 active: boolean;
 createdAt: Date;
}

// Instantiate the Prisma client outside the function so it can be reused
const prisma = new PrismaClient();

const TIME_OUT = 10000;

const ping = async (targetURL: string): Promise<{ statusCode: number; latency: number } | null> => {
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

            return {
                statusCode: response.status,
                latency: latency
            }
            
        }catch(error){
            console.log("Website is unreachable or timed out!!!")
        }

    return null
}

const createLog = async (targetId: string, statusCode: number | null, responseTime: number | null, isUp: boolean) => {

    try{
        const newLog = await prisma.pingLog.create({
            data: {
                targetId: targetId,
                statusCode: statusCode,
                responseTime: responseTime,
                isUp: isUp
            }
        })

        return newLog

    }catch{
        console.log("Error creating log for " + targetId)
    }
}

const checkPingInterval = async (target: target): Promise<Boolean> => {
    
    //get the last log

    const lastLog = await prisma.pingLog.findFirst({
        where: {
            targetId: target.id
        },
        orderBy: {
            timestamp: 'desc'
        }
    })

    if( !lastLog ){
        return true
    }

    const now = new Date()

    const check_date = new Date(now.getTime() - target.interval * 1000);

    return lastLog.timestamp < check_date

}

export async function  GET() {

    try{        

        const activeTargets = await prisma.target.findMany({
            where: {
                active: true
            }
        })

        let upTargetCount = 0
        let skipped = 0

        for(let target of activeTargets){

            if( ! await checkPingInterval(target) ) {
                console.log("Skipping " + target.url)
                skipped++
                continue
            }

            const targetUrl: string = target.url
               
            const res = await ping(targetUrl)
            console.log(targetUrl + " " + res)

            if(res == null){
                const newLog = await createLog(target.id, null, null, false)
            }else{
                const isUp: boolean = res.statusCode >= 200 && res.statusCode <= 399
                if(isUp) upTargetCount++
                const newLog = await createLog(target.id, res.statusCode, res.latency, isUp)
            }

        }

        return NextResponse.json({"success": true, "pingedTargets": activeTargets.length, "upTargets": upTargetCount, "skippedDueToInterval": skipped})

    }catch(error){
        console.error("Database query failed:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch targets" }, { status: 500 });
    }

}