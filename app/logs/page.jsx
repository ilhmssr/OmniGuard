"use client";

import useToast from "@/components/ui/useToast";
import ToastContainer from "@/components/ui/ToastContainer";
import TopBar from "@/components/layout/TopBar";
import BottomNav from "@/components/layout/BottomNav";

import LogsPage from "@/components/pages/logs/LogsPage";

export default function Page() {
  const { toasts } = useToast();

  return (
    <main className="bg-gray-100 min-h-screen pb-24">
      <TopBar />

      <ToastContainer toasts={toasts} />

      <div className="pt-20">
        <LogsPage />
      </div>

      <BottomNav />
    </main>
  );
}
