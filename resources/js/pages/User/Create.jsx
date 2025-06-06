import React from "react";
import useAdminLayout from "../../Layouts/useAdminLayout";
import { router, useForm } from "@inertiajs/react";
import { motion } from 'framer-motion';

const Create = ({user}) => {
    const { data, setData } = useForm({
        name: user.name || "",
        email:  user.email || "",
        password: "",
        role:  user.role || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the data to your backend
        console.log("Form submitted:", data);
        router.post("/users", data, {
            onSuccess: () => {
                // Handle success, e.g., redirect or show a success message
                console.log("User created successfully");
            },
            onError: (errors) => {
                // Handle errors, e.g., show validation messages
                console.error("Error creating user:", errors);
            },
        });
        // Reset form after submission
        setData({ name: "", role: "" });
    };

    return (
        <div>
            <div className="p-3">
                <h1 className="text-2xl font-semibold mb-4">Create User</h1>
            <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-lg shadow-md"
        >
            <input type="hidden" name="id" value={user?.id || ''} />

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                    type="text"
                    name="name"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                    placeholder="Enter User Name..."
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                    type="email"
                    name="email"
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                    placeholder="Enter Email..."
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                    type="password"
                    name="password"
                    value={data.password}
                    onChange={(e) => setData("password", e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                    placeholder="Enter Password..."
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                    name="role"
                    value={data.role}
                    onChange={(e) => setData("role", e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                >
                    <option value="">Select role</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                </select>
            </div>

            {/* Full width button across both columns */}
            <div className="md:col-span-2">
                <button
                    type="submit"
                    className="w-l cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition-all duration-300"
                >
                    {user?.id ? 'Update User' : 'Create User'}
                </button>
            </div>
        </motion.form>
            </div>
        </div>
    );
};

export default useAdminLayout(Create);
