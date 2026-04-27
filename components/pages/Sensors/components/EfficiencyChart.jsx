"use client";

import {
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";

// 🔥 DATA PER MACHINE
const efficiencyData = {
  granulator: [{ v: 60 }, { v: 75 }, { v: 65 }, { v: 90 }],
  fluidbed: [{ v: 70 }, { v: 80 }, { v: 78 }, { v: 85 }],
  tabletpress: [{ v: 50 }, { v: 60 }, { v: 55 }, { v: 70 }],
  coating: [{ v: 45 }, { v: 55 }, { v: 60 }, { v: 65 }],
  blister: [{ v: 65 }, { v: 75 }, { v: 80 }, { v: 85 }],
  autoclave: [{ v: 40 }, { v: 45 }, { v: 50 }, { v: 55 }],
};

export default function EfficiencyChart({ asset }) {
  const data = efficiencyData[asset];

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-5 space-y-4">

      {/* TITLE */}
      <div className="text-center">
        <h3 className="font-semibold">
          Efficiency Trends
        </h3>
      </div>

      {/* CHART */}
      <div className="h-24">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <Line
              type="monotone"
              dataKey="v"
              stroke="#2563eb"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}