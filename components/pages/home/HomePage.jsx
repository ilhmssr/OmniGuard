"use client";

import useToast from "@/components/ui/useToast";
import ToastContainer from "@/components/ui/ToastContainer";
import TopBar from "@/components/layout/TopBar";
import BottomNav from "@/components/layout/BottomNav";

import StatusSection from "./sections/StatusSection";
import QuickActions from "./sections/QuickActions";
import PPESection from "./sections/PESection";
import GaugeSection from "./sections/GaugeSection";
import MapSection from "./sections/MapSection";
import AlertSection from "./sections/AlertSection";

export default function HomePage() {
  const { toasts, showToast } = useToast();

  return (
    <main className="bg-gray-100 min-h-screen pb-24">
      <TopBar />

      <ToastContainer toasts={toasts} />

      <div className="pt-20 px-4 space-y-4">
        <StatusSection />
        <QuickActions showToast={showToast} />
        <PPESection />
        <GaugeSection 
        o2={21}
        temp={24}
        rh={45}
        />
        <AlertSection />
        <MapSection />
      </div>

      <BottomNav />
    </main>
  );
}