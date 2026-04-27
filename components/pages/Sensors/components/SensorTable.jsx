"use client";

import { useState } from "react";

const sensorData = {
  granulator: [
    ["2026-04-25 14:05", "Impeller Speed", 250, "rpm"],
    ["2026-04-25 14:00", "Motor Temp", 45.8, "°C"],
    ["2026-04-25 13:55", "Granule Moisture", 12.5, "%"],
    ["2026-04-25 13:50", "Torque Load", 68, "%"],
    ["2026-04-25 13:45", "Chamber Temp", 38.2, "°C"],
    ["2026-04-25 13:40", "Binder Flow Rate", 2.1, "L/min"],
    ["2026-04-25 13:35", "Vibration", 1.9, "mm/s"],
    ["2026-04-25 13:30", "Pressure", 1.2, "bar"],
    ["2026-04-25 13:25", "Humidity", 45, "%"],
    ["2026-04-25 13:20", "Voltage", 220, "V"],
  ],

  fluidbed: [
    ["2026-04-25 14:05", "Airflow Rate", 320, "m3/h"],
    ["2026-04-25 14:00", "Dry Temp", 65, "°C"],
    ["2026-04-25 13:55", "Inlet Air Temp", 72, "°C"],
    ["2026-04-25 13:50", "Outlet Air Temp", 55, "°C"],
    ["2026-04-25 13:45", "Humidity", 18, "%"],
    ["2026-04-25 13:40", "Fan Speed", 1450, "rpm"],
    ["2026-04-25 13:35", "Pressure Drop", 2.4, "kPa"],
    ["2026-04-25 13:30", "Filter Status", 1, "OK"],
    ["2026-04-25 13:25", "Bed Temp", 60, "°C"],
    ["2026-04-25 13:20", "Voltage", 215, "V"],
  ],

  tabletpress: [
    ["2026-04-25 14:05", "Compression Force", 120, "kN"],
    ["2026-04-25 14:00", "RPM", 1450, "rpm"],
    ["2026-04-25 13:55", "Tablet Weight", 500, "mg"],
    ["2026-04-25 13:50", "Thickness", 4.2, "mm"],
    ["2026-04-25 13:45", "Hardness", 8.5, "kp"],
    ["2026-04-25 13:40", "Ejection Force", 12, "kN"],
    ["2026-04-25 13:35", "Motor Temp", 50, "°C"],
    ["2026-04-25 13:30", "Vibration", 2.8, "mm/s"],
    ["2026-04-25 13:25", "Oil Pressure", 5.5, "bar"],
    ["2026-04-25 13:20", "Current", 13.2, "A"],
  ],

  coating: [
    ["2026-04-25 14:05", "Drum Speed", 18, "rpm"],
    ["2026-04-25 14:00", "Spray Rate", 2.5, "ml/min"],
    ["2026-04-25 13:55", "Inlet Temp", 65, "°C"],
    ["2026-04-25 13:50", "Outlet Temp", 52, "°C"],
    ["2026-04-25 13:45", "Pan Load", 75, "%"],
    ["2026-04-25 13:40", "Humidity", 20, "%"],
    ["2026-04-25 13:35", "Airflow", 300, "m3/h"],
    ["2026-04-25 13:30", "Spray Pressure", 1.8, "bar"],
    ["2026-04-25 13:25", "Exhaust Temp", 48, "°C"],
    ["2026-04-25 13:20", "Voltage", 220, "V"],
  ],

  blister: [
    ["2026-04-25 14:05", "Seal Temp", 180, "°C"],
    ["2026-04-25 14:00", "Pressure", 5.5, "bar"],
    ["2026-04-25 13:55", "Forming Temp", 140, "°C"],
    ["2026-04-25 13:50", "Cycle Speed", 35, "cpm"],
    ["2026-04-25 13:45", "Vacuum Pressure", 0.8, "bar"],
    ["2026-04-25 13:40", "Film Thickness", 0.25, "mm"],
    ["2026-04-25 13:35", "Motor Temp", 48, "°C"],
    ["2026-04-25 13:30", "Vibration", 2.2, "mm/s"],
    ["2026-04-25 13:25", "Voltage", 210, "V"],
    ["2026-04-25 13:20", "Current", 11.5, "A"],
  ],

  autoclave: [
    ["2026-04-25 14:05", "Chamber Temp", 121, "°C"],
    ["2026-04-25 14:00", "Pressure", 2.1, "bar"],
    ["2026-04-25 13:55", "Sterilization Time", 30, "min"],
    ["2026-04-25 13:50", "Steam Flow", 15, "kg/h"],
    ["2026-04-25 13:45", "Water Level", 70, "%"],
    ["2026-04-25 13:40", "Door Status", 1, "Locked"],
    ["2026-04-25 13:35", "Cooling Temp", 45, "°C"],
    ["2026-04-25 13:30", "Humidity", 100, "%"],
    ["2026-04-25 13:25", "Voltage", 220, "V"],
    ["2026-04-25 13:20", "Current", 14.2, "A"],
  ],
};

export default function SensorTable({ asset }) {
  const [expanded, setExpanded] = useState(false);

  const data = sensorData[asset];

  const visibleRows = expanded ? 10 : 5;
  const displayedData = data.slice(0, visibleRows);

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-4 space-y-4">

      {/* HEADER */}
      <div className="flex justify-between items-center border-b pb-3">
        <h2 className="font-semibold">
          Historical Sensor Logs
        </h2>

        <button
          onClick={() => setExpanded(!expanded)}
          className="
            text-blue-600 text-sm
            hover:text-blue-800 transition
            active:scale-95
          "
        >
          {expanded ? "Show Less" : "Show More"}
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">

          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="text-left px-5 py-3">Timestamp</th>
              <th className="text-left px-5 py-3">Sensor</th>
              <th className="text-left px-5 py-3">Value</th>
              <th className="text-left px-5 py-3">Unit</th>
            </tr>
          </thead>

          <tbody>
            {displayedData.map((row, i) => (
              <tr
                key={i}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="px-5 py-3">{row[0]}</td>
                <td className="px-5 py-3">{row[1]}</td>
                <td className="px-5 py-3">{row[2]}</td>
                <td className="px-5 py-3 text-gray-500">
                  {row[3]}
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
}