"use client";

const durabilityData = {
  granulator: 92,
  fluidbed: 85,
  tabletpress: 78,
  coating: 70,
  blister: 88,
  autoclave: 61,
};

export default function DurabilityCard({ asset }) {
  const value = durabilityData[asset];

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-4 space-y-4">

      <div className="flex justify-between text-sm">
        <span className="text-gray-600">
          Machine Durability
        </span>
        <span className="font-semibold">{value}%</span>
      </div>

      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-2 bg-blue-600 rounded-full transition-all duration-700"
          style={{ width: `${value}%` }}
        />
      </div>

    </div>
  );
}