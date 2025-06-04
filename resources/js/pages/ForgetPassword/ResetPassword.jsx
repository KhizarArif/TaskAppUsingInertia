import React, { useState } from "react";
import { router, useForm } from "@inertiajs/react";

export default function ResetPassword({ email }) {
 const {data, setData} = useForm({
    password: "",
    password_confirmation: "",
 })

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post("/auth/reset-password", {
            email,
           password: data.password,
            password_confirmation: data.password_confirmation,
        });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full"
            >
                <h2 className="text-2xl font-semibold mb-4 text-center">Reset Password</h2>
                <input
                    type="password"
                    className="w-full px-3 py-2 mb-3 border border-gray-300 rounded-md"
                    value={data.password}
                    name="password"
                    onChange={(e) => setData("password",e.target.value)}
                    placeholder="New password"
                    required
                />
                <input
                    type="password"
                    className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md"
                    value={data.password_confirmation}
                    name="password_confirmation"
                    onChange={(e) => setData("password_confirmation",e.target.value)}
                    placeholder="Confirm new password"
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Reset Password
                </button>
            </form>
        </div>
    );
}
