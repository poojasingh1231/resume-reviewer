import { DashboardClient } from "@/components/dashboard/DashboardClient";

export default function Home() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden selection:bg-primary/20">
      {/* Premium Background Elements */}
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-primary/10 via-primary/5 to-transparent pointer-events-none -z-10" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute top-40 -left-40 w-72 h-72 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />
      
      <div className="container max-w-6xl mx-auto px-4 py-16 md:py-24 relative z-0">
        <DashboardClient />
      </div>
    </main>
  );
}
