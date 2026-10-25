"use client"

import React from "react";
import AppCard from "../components/AppCard/AppCard";
import { useAppContext } from "@/providers/AppProvider";

export default function Home() {

  const { targets, searchQuery } = useAppContext();

  const displayCards = targets.map((target) => ({
        id: target.id,
        name: target.name,
        url: target.url,
        active: target.active,
        statusCode: target.active ? 200 : null,
        latency: target.active ? 50 : null,
      }))
    ;

  const filteredCards = displayCards.filter((card) =>
    card.name.toLowerCase().includes((searchQuery || "").toLowerCase()) ||
    card.url.toLowerCase().includes((searchQuery || "").toLowerCase())
  );

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 max-w-7xl">
        {filteredCards.map((card) => (
          <AppCard
            key={card.id}
            id={card.id}
            name={card.name}
            URL={card.url}
            isActive={card.active}
            statusCode={card.statusCode}
            latency={card.latency}
          />
        ))}
      </div>
    </div>
  );
}
