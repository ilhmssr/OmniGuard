"use client";

import { useState } from "react";

import HealthScoreCard from "./components/HealthScore";
import NextServiceCard from "./components/NextService";
import DurabilityCard from "./components/DurabilityCard";
import EfficiencyChart from "./components/EfficiencyChart";
import SensorTable from "./components/SensorTable";

import TopBar from "@/components/layout/TopBar";
import BottomNav from "@/components/layout/BottomNav";

export default function SensorsPage() {
  const [selectedAsset, setSelectedAsset] = useState("granulator");

  return (
    <main className="bg-gray-100 min-h-screen pb-24">
      <TopBar />

      <div className="pt-20 px-4 space-y-6 max-w-6xl mx-auto">

        <div className="space-y-1">
          <h1 className="text-xl font-semibold">
            Sensor & Predictive Maintenance
          </h1>
          <p className="text-sm text-gray-500">
            Real-time asset telemetry and health forecasting.
          </p>
        </div>

        {/* 🔥 MESIN FARMASI */}
        <select
          className="w-full border p-2 rounded-lg bg-white mb-10"
          value={selectedAsset}
          onChange={(e) => setSelectedAsset(e.target.value)}
        >
          <option value="granulator">High Shear Granulator</option>
          <option value="fluidbed">Fluid Bed Dryer</option>
          <option value="tabletpress">Tablet Press Machine</option>
          <option value="coating">Coating Machine</option>
          <option value="blister">Blister Packaging</option>
          <option value="autoclave">Autoclave Sterilizer</option>
        </select>

        <div className="space-y-4">
          <HealthScoreCard asset={selectedAsset} />
          <DurabilityCard asset={selectedAsset} />
          <NextServiceCard asset={selectedAsset} />
          <EfficiencyChart asset={selectedAsset} />
          <SensorTable asset={selectedAsset} />
        </div>

      </div>

      <BottomNav />
    </main>
  );
}