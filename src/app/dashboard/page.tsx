"use client"


import AppCard from "../components/AppCard/AppCard";

import { useAppContext } from "@/providers/AppProvider";

export default function Home() {

  const {targets} = useAppContext()

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
