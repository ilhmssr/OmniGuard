"use client";

import { useState } from "react";
import Image from "next/image";
import BottomNav from "@/components/layout/BottomNav";
import TopBar from "@/components/layout/TopBar";

/* -----------------------------
   FULL DATA SYSTEM (FIXED)
------------------------------*/
const rooms = {
  A: {
    name: "Room A - Gowning",
    cameras: [
      {
        img: "/ai-1.png",
        label: "CAM-A1 Entrance",
        score: 72,
        confidence: 92,
        stats: { people: 3, violations: 2, compliance: 78 },
        recommendation: "Wajibkan masker & perketat PPE di entrance.",
        alerts: [
          { type: "error", text: "No Mask Detected" },
          { type: "warning", text: "Helmet Adjustment Needed" },
        ],
      },
      {
        img: "/ai-2.png",
        label: "CAM-A2 PPE Zone",
        score: 85,
        confidence: 95,
        stats: { people: 5, violations: 1, compliance: 90 },
        recommendation: "Area aman, monitoring rutin cukup.",
        alerts: [{ type: "info", text: "Routine Check Passed" }],
      },
      {
        img: "/ai-3.png",
        label: "CAM-A3 Corridor",
        score: 90,
        confidence: 97,
        stats: { people: 2, violations: 0, compliance: 96 },
        recommendation: "Kondisi optimal, tidak ada pelanggaran.",
        alerts: [],
      },
    ],
  },

  B: {
    name: "Room B - Packing",
    cameras: [
      {
        img: "/ai-4.png",
        label: "CAM-B1 Line 1",
        score: 78,
        confidence: 88,
        stats: { people: 6, violations: 2, compliance: 80 },
        recommendation: "Perbaiki posture kerja operator.",
        alerts: [{ type: "warning", text: "Posture Risk Detected" }],
      },
      {
        img: "/ai-5.png",
        label: "CAM-B2 Line 2",
        score: 82,
        confidence: 90,
        stats: { people: 4, violations: 1, compliance: 85 },
        recommendation: "Optimalkan flow produksi untuk efisiensi.",
        alerts: [{ type: "info", text: "Cycle Delay Minor" }],
      },
      {
        img: "/ai-6.png",
        label: "CAM-B3 Output",
        score: 88,
        confidence: 93,
        stats: { people: 3, violations: 0, compliance: 92 },
        recommendation: "Output stabil, tidak ada masalah.",
        alerts: [],
      },
    ],
  },

  C: {
    name: "Storage Room",
    cameras: [
      {
        img: "/ai-7.png",
        label: "CAM-C1 Entry",
        score: 60,
        confidence: 85,
        stats: { people: 2, violations: 3, compliance: 65 },
        recommendation: "Tingkatkan keamanan akses area storage.",
        alerts: [{ type: "error", text: "Unauthorized Access" }],
      },
      {
        img: "/ai-8.png",
        label: "CAM-C2 Shelf",
        score: 70,
        confidence: 89,
        stats: { people: 5, violations: 1, compliance: 80 },
        recommendation: "Perbaiki layout shelf untuk efisiensi.",
        alerts: [],
      },
      {
        img: "/ai-9.png",
        label: "CAM-C3 Exit",
        score: 75,
        confidence: 91,
        stats: { people: 3, violations: 0, compliance: 88 },
        recommendation: "Exit flow sudah sesuai SOP.",
        alerts: [{ type: "info", text: "Inventory Scan Done" }],
      },
    ],
  },
};

export default function AiSafetyPage() {
  const [roomKey, setRoomKey] = useState("A");
  const [camIndex, setCamIndex] = useState(0);

  const room = rooms[roomKey];
  const cam = room.cameras[camIndex];

  return (
    <main className="min-h-screen bg-gray-100 pb-24 pt-16 px-4">
            <TopBar />

      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-4">
        <h1 className="text-xl font-bold">
          AI Industrial Safety System
        </h1>
        <p className="text-sm text-gray-500">
          Multi-room AI surveillance & compliance monitoring
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4">

        {/* LEFT */}
        <div className="lg:col-span-8 space-y-4">

          {/* ROOM SELECT */}
          <div className="flex gap-2">
            {Object.keys(rooms).map((key) => (
              <button
                key={key}
                onClick={() => {
                  setRoomKey(key);
                  setCamIndex(0);
                }}
                className={`px-3 py-1 rounded text-sm border ${
                  roomKey === key ? "bg-blue-600 text-white" : "bg-white"
                }`}
              >
                {rooms[key].name}
              </button>
            ))}
          </div>

          {/* CAMERA VIEW */}
          <div className="relative rounded-xl overflow-hidden bg-black">

            <Image
              src={cam.img}
              alt="camera"
              width={1200}
              height={700}
              className="w-full h-auto object-cover opacity-90"
              priority
            />

            <div className="absolute top-0 left-0 w-full flex justify-between p-3 text-white bg-gradient-to-b from-black/60">
              <span className="text-xs font-mono">
                {cam.label}
              </span>
              <span className="text-xs bg-blue-600 px-2 py-1 rounded">
                AI ACTIVE
              </span>
            </div>

          </div>

          {/* CAMERA SWITCH */}
          <div className="flex gap-2">
            {room.cameras.map((c, i) => (
              <button
                key={i}
                onClick={() => setCamIndex(i)}
                className={`px-3 py-1 text-sm border rounded ${
                  camIndex === i ? "bg-black text-white" : "bg-white"
                }`}
              >
                Cam {i + 1}
              </button>
            ))}
          </div>

        </div>

        {/* RIGHT PANEL */}
        <div className="lg:col-span-4 space-y-4">

          {/* SCORE */}
          <div className="bg-white rounded-xl p-4 shadow text-center">
            <p className="text-sm text-gray-500">Safety Score</p>
            <div className="text-4xl font-bold text-orange-500">
              {cam.score}
            </div>
            <div className="h-2 bg-gray-200 rounded mt-3">
              <div
                className="h-2 bg-orange-500 rounded"
                style={{ width: `${cam.score}%` }}
              />
            </div>
          </div>

          {/* CONFIDENCE */}
          <div className="bg-white rounded-xl p-4 shadow text-center">
            <p className="text-sm text-gray-500">AI Confidence</p>
            <div className="text-2xl font-bold text-blue-500">
              {cam.confidence}%
            </div>
          </div>

          {/* ALERTS */}
          <div className="bg-white rounded-xl p-4 shadow">
            <h2 className="font-semibold mb-3">AI Alerts</h2>

            {cam.alerts.length === 0 ? (
              <p className="text-sm text-gray-400">
                No issues detected
              </p>
            ) : (
              <div className="space-y-2 text-sm">
                {cam.alerts.map((a, i) => (
                  <div
                    key={i}
                    className="border-l-4 border-red-500 pl-3"
                  >
                    {a.text}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* DETECTION STATS (FIXED) */}
          <div className="bg-white rounded-xl p-4 shadow">
            <h2 className="font-semibold mb-2">Detection Stats</h2>
            <p className="text-sm text-gray-500">
              People detected: {cam.stats.people}
            </p>
            <p className="text-sm text-gray-500">
              Violations: {cam.stats.violations}
            </p>
            <p className="text-sm text-gray-500">
              Compliance: {cam.stats.compliance}%
            </p>
          </div>

          {/* AI RECOMMENDATION (FIXED) */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <h2 className="font-semibold text-blue-700 mb-2">
              AI Recommendation
            </h2>
            <p className="text-sm text-blue-600">
              {cam.recommendation}
            </p>
          </div>

        </div>

      </div>

      <BottomNav />
    </main>
  );
}