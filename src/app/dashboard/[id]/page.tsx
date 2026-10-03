"use client"

import { redirect, useParams } from "next/navigation";
import { useAppContext } from "../../../providers/AppProvider";

export default function AppDetailsPage() {

  const params = useParams();
  const id = params.id as string;

  const {targets} = useAppContext()

  const target = targets.find((t) => t.id == id)

  if(!target) redirect("/404")

  return (
    <main className="p-8">
        <div>{target.name}</div>
    </main>
  );
}