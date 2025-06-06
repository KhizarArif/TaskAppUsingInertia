import React from "react";
import useAdminLayout from "../../Layouts/useAdminLayout";
import { router, useForm } from "@inertiajs/react";

const Index = ({ roles }) => {
    const { data, setData } = useForm({
        roles: "",
        status: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post("/roles", data, {
            preserveScroll: true,
            onSuccess: () => {
                console.log("Role created successfully");
            },
            onError: (errors) => {
                console.error("Error creating role:", errors);
            },
        });
        console.log("Role created:", data.roles);
        setData("roles", "");
    };

    return (
        <div>
            <div className="p-3 w-3/4">
                <h1 className="text-2xl font-semibold mb-4">Roles</h1>
                <form
                    className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4"
                    onSubmit={handleSubmit}
                >
                    {/* Role Input */}
                    <input
                        type="text"
                        placeholder="Create roles..."
                        name="roles"
                        value={data.roles}
                        onChange={(e) => setData("roles", e.target.value)}
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-1/2"
                    />

                    {/* Status Select */}
                    <select
                        name="status"
                        value={data.status}
                        onChange={(e) => setData("status", e.target.value)}
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-1/4"
                    >
                        <option value="">Select Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition w-full sm:w-1/4"
                    >
                        Create Role
                    </button>
                </form>

                <div className="overflow-x-auto rounded-xl shadow-sm mt-4 w-full">
                    <table className="w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                                    Role Name
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                                    Status
                                </th>
                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100 w-full">
                            {/* Example role data, replace with actual data */}
                            {roles?.length === 0 ? (
                                <tr>
                                    <td> No Roles Yet </td>
                                </tr>
                            ) : (
                                roles?.map((role) => (
                                    <tr
                                        className="hover:bg-gray-50 transition"
                                        key={role?.id}
                                    >
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">
                                            {role.name}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">
                                            {role.status
                                                ? "Active"
                                                : "Inactive"}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-right text-sm">
                                            <button
                                                onClick={() =>
                                                    alert("Edit role")
                                                }
                                                className="text-blue-500 hover:text-blue-700 mr-3"
                                                title="Edit"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() =>
                                                    alert("Delete role")
                                                }
                                                className="text-red-500 hover:text-red-700"
                                                title="Delete"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default useAdminLayout(Index);
