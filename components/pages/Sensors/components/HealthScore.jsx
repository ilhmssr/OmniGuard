"use client";
import { motion } from "framer-motion";

const healthData = {
  granulator: { value: 88, status: "Optimal", color: "#10b981" },
  fluidbed: { value: 75, status: "Stable", color: "#22c55e" },
  tabletpress: { value: 72, status: "Warning", color: "#f59e0b" },
  coating: { value: 65, status: "Monitoring", color: "#f97316" },
  blister: { value: 80, status: "Good", color: "#3b82f6" },
  autoclave: { value: 54, status: "Critical", color: "#ef4444" },
};

function Donut({ value, color }) {
  const size = 160;
  const radius = 40;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle cx={center} cy={center} r={radius} stroke="#e5e7eb" strokeWidth="10" fill="none" />

      <motion.circle
        cx={center}
        cy={center}
        r={radius}
        stroke={color}
        strokeWidth="10"
        fill="none"
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{
          strokeDashoffset: circumference - (circumference * value) / 100,
        }}
        transition={{ duration: 1 }}
      />
    </svg>
  );
}

export default function HealthScoreCard({ asset }) {
  const data = healthData[asset];

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-4 space-y-4 text-center">

      <h2 className="font-semibold">Predictive Health Score</h2>

      <div className="flex justify-center">
        <div className="relative w-[160px] h-[160px] flex items-center justify-center">

          <Donut value={data.value} color={data.color} />

          <div className="absolute text-center">
            <p className="text-3xl font-bold">{data.value}%</p>
            <p className="text-xs text-gray-500">{data.status}</p>
          </div>

        </div>
      </div>

      <p className="text-sm text-gray-500">
        Asset operating within validated parameters.
      </p>

    </div>
  );
}