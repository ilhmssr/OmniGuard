"use client";

import { useState } from "react";

// 🔥 default recommendation per machine
const DEFAULT_INTERVAL = {
  granulator: 14,
  fluidbed: 12,
  tabletpress: 10,
  coating: 9,
  blister: 11,
  autoclave: 7,
};

const serviceDataInit = {
  granulator: { task: "", date: "" },
  fluidbed: { task: "", date: "" },
  tabletpress: { task: "", date: "" },
  coating: { task: "", date: "" },
  blister: { task: "", date: "" },
  autoclave: { task: "", date: "" },
};

export default function NextServiceCard({ asset }) {
  const [openForm, setOpenForm] = useState(false);
  const [confirmMode, setConfirmMode] = useState(false);

  const [taskInput, setTaskInput] = useState("");
  const [dateInput, setDateInput] = useState("");

  const [data, setData] = useState(serviceDataInit);

  const current = data[asset];

  // 🔥 SMART RECOMMENDATION LOGIC
  const getRemainingDays = () => {
    // kalau sudah di schedule user
    if (current.date) {
      const today = new Date();
      const target = new Date(current.date);

      const diff = target - today;
      return Math.ceil(diff / (1000 * 60 * 60 * 24));
    }

    // kalau belum → pakai sistem rekomendasi
    return DEFAULT_INTERVAL[asset];
  };

  const remainingDays = getRemainingDays();

  // STEP 1: open form
  const handleOpen = () => {
    setOpenForm(true);
    setConfirmMode(false);
  };

  // STEP 2: next confirm preview
  const handleNext = () => {
    if (!taskInput || !dateInput) return;
    setConfirmMode(true);
  };

  // STEP 3: save data
  const handleConfirm = () => {
    setData((prev) => ({
      ...prev,
      [asset]: {
        task: taskInput,
        date: dateInput,
      },
    }));

    setOpenForm(false);
    setConfirmMode(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-4 space-y-4">

      {/* TITLE */}
      <div className="text-center font-semibold">
        Next Service
      </div>

      {/* COUNTDOWN */}
      <div className="flex flex-col items-center">

        <p className="text-xs text-gray-500">
          {current.date ? "Scheduled in" : "Recommended in"}
        </p>

        <p className="text-3xl font-bold text-blue-600">
          {remainingDays}{" "}
          <span className="text-base font-medium">Days</span>
        </p>

        {current.task && (
          <p className="text-xs text-green-600 mt-1">
            Scheduled: {current.date}
          </p>
        )}
      </div>

      {/* TASK DISPLAY */}
      {current.task && (
        <div className="border-t pt-3 text-sm">
          <span className="font-bold">Task:</span>{" "}
          {current.task}
        </div>
      )}

      {/* BUTTON */}
      <button
        onClick={handleOpen}
        className="
          w-full border rounded-lg py-2 text-sm
          hover:bg-blue-600 hover:text-white
          transition active:scale-95
        "
      >
        Schedule Maintenance
      </button>

      {/* FORM STEP 1 */}
      {openForm && !confirmMode && (
        <div className="space-y-2 border-t pt-3">

          <input
            type="text"
            placeholder="Enter task..."
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            className="w-full border rounded-lg p-2 text-sm"
          />

          <input
            type="date"
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
            className="w-full border rounded-lg p-2 text-sm"
          />

          <button
            onClick={handleNext}
            className="w-full bg-blue-600 text-white rounded-lg py-2 text-sm"
          >
            Next
          </button>

        </div>
      )}

      {/* CONFIRM STEP */}
      {confirmMode && (
        <div className="space-y-2 border-t pt-3">

          <p className="text-sm text-gray-600">
            Confirm this schedule?
          </p>

          <div className="text-xs text-gray-500 space-y-1">
            <p><b>Task:</b> {taskInput}</p>
            <p><b>Date:</b> {dateInput}</p>
          </div>

          <div className="flex gap-2">

            <button
              onClick={handleConfirm}
              className="
                flex-1 bg-green-600 text-white rounded-lg py-2 text-sm
                hover:bg-green-700 transition
              "
            >
              Confirm
            </button>

            <button
              onClick={() => setConfirmMode(false)}
              className="
                flex-1 border rounded-lg py-2 text-sm
                hover:bg-red-50 hover:text-red-600
              "
            >
              Back
            </button>

          </div>
        </div>
      )}

    </div>
  );
}