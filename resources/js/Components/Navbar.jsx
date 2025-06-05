import React from "react";
import { LogOut } from "lucide-react";
import { router } from "@inertiajs/react";

export default function Navbar({ user }) {
    const handleLogout = () => {
        console.log("Logging out...");

        router.post(
            "/auth/logout",
            {},
            {
                onFinish: () => { 
                    router.visit("/auth/login");
                },
            }
        );
    };

    return (
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
            <h1 className="text-lg font-semibold">Welcome, Admin</h1>
            <div className="flex items-center gap-3">
                <img
                    src="https://via.placeholder.com/40"
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover"
                />
                <span className="font-medium text-gray-700">
                    {user?.name ?? "User"}
                </span>
                <button
                    onClick={handleLogout}
                    title="Logout"
                    className="p-2 hover:bg-gray-100 rounded-full text-gray-600 hover:text-red-500 transition"
                >
                    <LogOut className="w-5 h-5" />
                </button>
            </div>
        </header>
    );
}
