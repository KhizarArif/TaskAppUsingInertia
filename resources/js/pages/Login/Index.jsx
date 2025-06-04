import { Link, router, useForm } from "@inertiajs/react";
import React, { useState } from "react";

export default function Login() {
    // const [formData, setFormData] = useState({ email: "", password: "" });
    const { data, setData } = useForm({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post("/auth/login", data, {
            onSuccess: () => {
                console.log("Login successful");
                setData({
                    email: "",
                    password: "",
                });
            },
            onError: (errors) => {
                console.error("Login failed:", errors);
            },
        });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

                <label className="block mb-2 text-sm font-medium text-gray-700">
                    Email
                </label>
                <input
                    type="email"
                    name="email"
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email"
                    required
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
                    placeholder="Enter your password"
                    required
                />

                <Link>
                    <button
                        type="button"
                        className="w-full text-blue-500 hover:underline mb-4 cursor-pointer"
                        onClick={() => console.log("Forgot Password")}
                    >
                        Forgot Password?
                    </button>
                </Link>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 cursor-pointer transition duration-200"
                >
                    Login
                </button>
            </form>
        </div>
    );
}
