import React from "react";
import useAdminLayout from "../../Layouts/useAdminLayout";
import { router, useForm } from "@inertiajs/react";

const Create = ({ permissions }) => {
    const { data, setData } = useForm({
        name: "",
        status: "",
        permissions: [],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post("/roles", data, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest",
            },
            preserveScroll: true,
            onSuccess: () => {
                console.log("Role created successfully");
            },
            onError: (errors) => {
                console.error("Error creating role:", errors);
            },
        });
        console.log("Role created:", data.name);
        setData("name", "");
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-4xl mx-auto">
            <h1 className="text-2xl font-semibold mb-6 text-gray-800">
                Create Role
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Row 1: Name and Status */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Role Name
                        </label>
                        <input
                            type="text"
                            placeholder="Create role..."
                            name="name"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Status
                        </label>
                        <select
                            name="status"
                            value={data.status}
                            onChange={(e) => setData("status", e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                            <option value="">Select Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                </div>

                {/* Row 2: Permissions */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Permissions
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {permissions.map((permission) => (
                            <label
                                key={permission.id}
                                className="flex items-center space-x-2"
                            >
                                <input
                                    type="checkbox"
                                    name="permissions[]"
                                    value={permission.id}
                                    checked={data.permissions?.includes(
                                        permission.id
                                    )}
                                    onChange={(e) => {
                                        const value = parseInt(e.target.value);
                                        if (e.target.checked) {
                                            setData("permissions", [
                                                ...(data.permissions || []),
                                                value,
                                            ]);
                                        } else {
                                            setData(
                                                "permissions",
                                                (data.permissions || []).filter(
                                                    (id) => id !== value
                                                )
                                            );
                                        }
                                    }}
                                    className="accent-blue-600"
                                />
                                <span className="text-gray-700">
                                    {permission.name}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Submit Button */}
                <div className="text-right">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-2 rounded-md shadow hover:bg-blue-700 transition-all duration-300"
                    >
                        Create Role
                    </button>
                </div>
            </form>
        </div>
    );
};

export default useAdminLayout(Create);
