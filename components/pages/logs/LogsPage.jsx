"use client";

import { useState, useEffect } from "react";
import LogsTable from "@/components/pages/logs/LogsTable";
import { machineLogs } from "@/components/pages/logs/machineLogs";
import { safetyLogs } from "@/components/pages/logs/safetyLogs";

export default function LogsPage() {
  const [tab, setTab] = useState("machine");
  const [severity, setSeverity] = useState("ALL");
  const [timeRange, setTimeRange] = useState("24h");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const [isMobile, setIsMobile] = useState(false);

  const data = tab === "machine" ? machineLogs : safetyLogs;
  const now = new Date();

  // 🔥 DETECT MOBILE
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // 🔥 FILTER DATA
  const filtered = data
    .filter((log) => {
      if (severity !== "ALL" && log.type !== severity) return false;

      const logTime = new Date(log.timestamp);
      const diff = now.getTime() - logTime.getTime();

      const ONE_HOUR = 60 * 60 * 1000;
      const ONE_DAY = 24 * ONE_HOUR;
      const ONE_WEEK = 7 * ONE_DAY;

      if (timeRange === "24h") return diff <= ONE_DAY;
      if (timeRange === "7d") return diff <= ONE_WEEK;

      return true;
    })
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  // 🔥 RESET PAGE SAAT FILTER BERUBAH
  useEffect(() => {
    setPage(1);
  }, [tab, severity, timeRange, pageSize]);

  // 🔥 PAGINATION SAFE
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);

  const start = (safePage - 1) * pageSize;
  const paginatedData = filtered.slice(start, start + pageSize);

  return (
    <div className="px-4 space-y-4">

      <h1 className="text-2xl font-bold">
        System Logs & Compliance
      </h1>

      {/* TABS */}
      <div className="flex gap-4 border-b">
        <button
          onClick={() => setTab("machine")}
          className={`pb-2 ${
            tab === "machine"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500"
          }`}
        >
          MACHINE LOGS
        </button>

        <button
          onClick={() => setTab("safety")}
          className={`pb-2 ${
            tab === "safety"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500"
          }`}
        >
          SAFETY LOGS
        </button>
      </div>

      {/* FILTERS */}
      <div className="bg-white p-4 rounded-xl border space-y-3">

        <h2 className="font-semibold">Filters</h2>

        {/* TIME FILTER */}
        <select
          className="w-full border p-2 rounded"
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
        >
          <option value="24h">Last 24 Hours</option>
          <option value="7d">Last 7 Days</option>
          <option value="all">All Time</option>
        </select>

        {/* SEVERITY */}
        <select
          className="w-full border p-2 rounded"
          value={severity}
          onChange={(e) => setSeverity(e.target.value)}
        >
          <option value="ALL">All</option>
          <option value="CRITICAL">Critical</option>
          <option value="WARNING">Warning</option>
          <option value="INFO">Info</option>
        </select>

        {/* PAGE SIZE */}
        <select
          className="w-full border p-2 rounded"
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          <option value={5}>5 / page</option>
          <option value={10}>10 / page</option>
          <option value={20}>20 / page</option>
          <option value={100}>100 / page</option>
        </select>

      </div>

      {/* LOGS */}
      <LogsTable data={paginatedData} />

      {/* INFO */}
      <p className="text-sm text-gray-500 text-center">
        Showing {start + 1} - {Math.min(start + pageSize, filtered.length)} of {filtered.length}
      </p>

{/* PAGINATION */}
<div className="flex justify-center items-center gap-4 pt-4">

  {/* PREV */}
  <button
    onClick={() => setPage((p) => Math.max(p - 1, 1))}
    disabled={safePage === 1}
    className="px-3 py-1 border rounded disabled:opacity-30"
  >
    ‹
  </button>

  {/* PAGE INFO (SEMUA DEVICE) */}
  <span className="text-sm px-3 py-1 bg-gray-100 rounded">
    Page {safePage} of {totalPages}
  </span>

  {/* NEXT */}
  <button
    onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
    disabled={safePage === totalPages}
    className="px-3 py-1 border rounded disabled:opacity-30"
  >
    ›
  </button>

</div>
    </div>
  );
}