"use client"

import { notFound, useRouter, useParams } from "next/navigation";
import { useAppContext } from "../../../providers/AppProvider";

export default function AppDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const { targets, isLoading, refreshTargets } = useAppContext();

  const target = targets.find((t) => t.id == id);

  if (isLoading) {
    return <main className="p-8">Loading...</main>;
  }

  if (!target) {
    notFound();
  }

  const removeTarget = async () => {
    if (!window.confirm("Are you sure you want to delete this app?")) return;

    try {
      const response = await fetch(`/api/targets/${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (result.success) {
        await refreshTargets();
        router.push('/dashboard');
      } else {
        alert("Error deleting target\n" + result.error);
      }
    } catch (error) {
      alert("Failed to delete target!!!\n" + error);
    }
  };

  return (
    <main className="p-8">
      <div>{target.name}</div>

      <button
        type="button"
        className="cursor-pointer text-red-500 hover:text-red-700"
        onClick={() => removeTarget()}
      >
        REMOVE APP
      </button>
    </main>
  );
}