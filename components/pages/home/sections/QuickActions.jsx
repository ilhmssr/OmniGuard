"use client";

import Button from "../../../ui/Button";
import {
  Stethoscope,
  Flame,
  OctagonX,
} from "lucide-react";

export default function QuickActions({ showToast }) {
  return (
    <section className="flex flex-wrap gap-3 items-center justify-center">

      {/* MEDIC */}
      <Button
        className="bg-green-500 text-black flex items-center gap-2"
        onClick={() =>
          showToast("🩺 Medic team dispatched!", "success")
        }
      >
        <Stethoscope size={16} />
        Medic
      </Button>

      {/* APAR */}
      <Button
        className="bg-orange-600 text-white flex items-center gap-2"
        onClick={() =>
          showToast("🔥 Fire suppression system ready!", "warning")
        }
      >
        <Flame size={16} />
        APAR
      </Button>

      {/* EMERGENCY */}
      <Button
        variant="danger"
        className="flex items-center gap-2"
        onClick={() =>
          showToast("🚨 Production STOPPED!", "danger")
        }
      >
        <OctagonX size={16} />
        Stop Production
      </Button>

    </section>
  );
}