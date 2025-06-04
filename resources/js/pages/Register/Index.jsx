import { router, useForm } from "@inertiajs/react";
import React, { useState } from "react";

export default function Register() {
    const { data, setData } = useForm({
        name: "",
        email: "",
        password: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log("Register Data:", data);
        router.post("/auth/register", data, {
            onSuccess: () => {
                console.log("Registration successful");
                setData({
                    name: "",
                    email: "",
                    password: "",
                });
            },
            onError: (errors) => {
                console.error("Registration failed:", errors);
            },
        });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">
                    Register
                </h2>

                <label className="block mb-2 text-sm font-medium text-gray-700">
                    Username
                </label>
                <input
                    type="text"
                    name="name"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    placeholder="Enter your username"
                />

                <label className="block mb-2 text-sm font-medium text-gray-700">
                    Email
                </label>
                <input
                    type="email"
                    name="email"
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    placeholder="Enter your email"
                />

                <label className="block mb-2 text-sm font-medium text-gray-700">
                    Password
                </label>
                <input
                    type="password"
                    name="password"
                    value={data.password}
                    onChange={(e) => setData("password", e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    placeholder="Enter your password"
                />

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                    Register
                </button>
            </form>
        </div>
    );
}
