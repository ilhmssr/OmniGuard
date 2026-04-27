"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Shield,
  Hand,
  Eye,
  Footprints,
} from "lucide-react";

export default function SOPLoginPage() {
  const router = useRouter();

  const [workerId, setWorkerId] = useState("");
  const [shift, setShift] = useState("morning");
  const [zone, setZone] = useState("clean_room_a");
  const [pin, setPin] = useState("");

  const [ppe, setPpe] = useState({
    coverall: false,
    mask: false,
    gloves: false,
    goggles: false,
    boots: false,
  });

  const togglePPE = (key) => {
    setPpe((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const allChecked = Object.values(ppe).every(Boolean);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!workerId) return alert("Worker ID required");
    if (!allChecked) return alert("Complete all PPE checks");
    if (pin !== "1234") return alert("Invalid PIN");

    localStorage.setItem("auth", "true");
    localStorage.setItem("user", workerId);

    router.push("/");
  };

  return (
    <main className="min-h-screen bg-gray-100 px-4 pt-6 pb-10 flex justify-center">
      <div className="w-full max-w-xl space-y-6">

        {/* 🔥 WELCOME HEADER */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 p-6 text-white shadow-lg">

          {/* glow effect */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />

          <div className="relative z-10 space-y-3">

            {/* BADGE */}
            <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-xs">
              🛡️ Safety Protocol System
            </div>

            {/* 🔥 WELCOME TEXT */}
            <h1 className="text-2xl font-bold leading-tight">
              Welcome, Operator
            </h1>

            {/* 🔥 DYNAMIC USER */}
            <p className="text-sm text-white/80">
              {workerId
                ? `ID: ${workerId} • Ready for verification`
                : "Please complete pre-shift verification"}
            </p>

            {/* STATUS */}
            <div className="flex items-center gap-4 pt-2 text-xs">
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                System Ready
              </div>

              <div className="flex items-center gap-1">
                <span className="w-2 h-2 bg-yellow-300 rounded-full" />
                PPE Required
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* 🔥 DETAILS */}
          <div className="bg-white rounded-2xl shadow-sm border p-4 space-y-4">

            <div className="space-y-1">
              <label className="text-xs text-gray-500">Worker ID</label>
              <input
                value={workerId}
                onChange={(e) => setWorkerId(e.target.value)}
                placeholder="OPR-10492"
                className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-500">Shift</label>
              <select
                value={shift}
                onChange={(e) => setShift(e.target.value)}
                className="w-full border p-2 rounded-lg"
              >
                <option value="morning">Morning (06:00 - 14:00)</option>
                <option value="afternoon">Afternoon (14:00 - 22:00)</option>
                <option value="night">Night (22:00 - 06:00)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-500">Zone</label>
              <select
                value={zone}
                onChange={(e) => setZone(e.target.value)}
                className="w-full border p-2 rounded-lg"
              >
                <option value="clean_room_a">Clean Room A</option>
                <option value="clean_room_b">Clean Room B</option>
                <option value="packaging">Packaging</option>
              </select>
            </div>

          </div>

          {/* 🔥 PPE */}
          <div className="bg-white rounded-2xl shadow-sm border p-4 space-y-4">

            <div className="bg-gray-100 px-5 py-3 font-semibold rounded-lg">
              PPE Requirements
            </div>

            <div className="space-y-2">

              {[
                ["coverall", "Sterile Coveralls Intact", ShieldCheck],
                ["mask", "N95 / PAPR Respirator Checked", Shield],
                ["gloves", "Double Nitrile Gloves Secured", Hand],
                ["goggles", "Safety Goggles / Face Shield On", Eye],
                ["boots", "Boot Covers Applied", Footprints],
              ].map(([key, label, Icon]) => (
                <label
                  key={key}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer border transition"
                >
                  <input
                    type="checkbox"
                    checked={ppe[key]}
                    onChange={() => togglePPE(key)}
                    className="w-4 h-4"
                  />

                  <span className="flex-1">{label}</span>

                  <Icon size={18} className="text-gray-500" />
                </label>
              ))}

            </div>
          </div>

          {/* 🔥 PIN */}
          <div className="bg-white rounded-2xl shadow-sm border p-4 space-y-4">
            <h3 className="font-semibold">
              Safety Officer Authorization
            </h3>

            <input
              type="password"
              maxLength={4}
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="••••"
              className="border p-2 rounded-lg w-32 text-center tracking-widest"
            />

            <p className="text-xs text-gray-500">
              Enter 4-digit auth pin
            </p>
          </div>

          {/* 🔥 ACTION */}
          <div className="flex justify-between items-center pt-2">

            <button
              type="button"
              className="px-5 py-2 border rounded-lg hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
            >
              ✔ Submit & Authorize
            </button>

          </div>

        </form>
      </div>
    </main>
  );
}