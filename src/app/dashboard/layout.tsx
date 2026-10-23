"use client"

import { AppProvider } from "@/providers/AppProvider";
import Sidebar from "../components/Sidebar/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <div className="flex min-h-screen w-full bg-[#161616]">
        <Sidebar />

        <main className="flex-1 overflow-y-auto bg-[#161616] p-6 lg:p-10">
          {children}
        </main>
      </div>
    </AppProvider>
  );
}
