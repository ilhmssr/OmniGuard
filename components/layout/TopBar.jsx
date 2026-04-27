"use client";

import Image from "next/image";
import { Bell, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function TopBar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("auth");
    router.push("/login");
  };

  return (
    <header className="fixed top-0 w-full h-16 px-4 flex items-center justify-between bg-white border-b z-50">

      {/* LEFT */}
      <div className="flex items-center gap-2">

        {/* 🔥 LOGO IMAGE */}
        <Image
          src="/screen.png"
          alt="logo"
          width={28}
          height={28}
          className="object-contain"
        />

        <h1 className="font-bold text-lg">
          OmniGuard
        </h1>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-2">

        {/* NOTIF */}
        <button className="relative p-2 rounded-lg hover:bg-gray-100 transition">
          <Bell size={20} className="text-gray-700" />
        </button>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="p-2 rounded-lg hover:bg-red-100 text-red-600 transition"
        >
          <LogOut size={20} />
        </button>

      </div>

    </header>
  );
}