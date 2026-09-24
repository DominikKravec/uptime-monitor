"use client"

import { Target } from "@prisma/client";
import { useEffect, useState } from "react";
import AppCard from "./components/AppCard/AppCard";
import Image from "next/image";
import { json } from "stream/consumers";

const fetchTargets = async (): Promise<Target[]> => {

  const res = await fetch('/api/targets')

  const result = await res.json()

  if( !result.success ){
    throw "Error fetching targets: " + result.error
  }

  return result.data

}

export default function Home() {

  const [targets, setTargets] = useState<Target[]>([])

  useEffect(() => {
    
    const fetchAndSetTargets = async () => {

      try{
        const fetchedTargets = await fetchTargets()
        setTargets(fetchedTargets)
      }catch(error){
        alert(error)
      }

    }  

    fetchAndSetTargets()

  }, [])

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Uptime Monitor</h1>

      <section>
        {targets.map(target => (
          <AppCard
            name={target.name}
            URL={target.url}
            isActive={target.active}
          />
        ))
        }
        
      </section>


    </main>
  );
}
