"use client"
import Sidebar from "../components/Sidebar/Sidebar";


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-w-full min-h-screen grid grid-cols-[auto_1fr]">
      
      <Sidebar/>

      <section className="bg-red-500">
        {children}
      </section>
      
    </div>
  );
}