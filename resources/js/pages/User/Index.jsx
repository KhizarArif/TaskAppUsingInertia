import React from "react";
import useAdminLayout from "../../Layouts/useAdminLayout";
import { Edit, Trash2 } from "lucide-react";

const Index = ({ users }) => {
    return (
        <div className="p-3">
            <button className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition">
                Create
            </button>
            <div className="overflow-x-auto rounded-xl shadow-sm mt-4">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                                Name
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                                Email
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                                Role
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {users.map((user) => (
                            <tr
                                key={user.id}
                                className="hover:bg-gray-50 transition"
                            >
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">
                                    {user.name}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                                    {user.email}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                                    {user.role}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-right text-sm">
                                    <button
                                        onClick={() =>
                                            alert(`Edit user ${user.id}`)
                                        }
                                        className="text-blue-500 hover:text-blue-700 mr-3"
                                        title="Edit"
                                    >
                                        <Edit size={18} />
                                    </button>
                                    <button
                                        onClick={() =>
                                            alert(`Delete user ${user.id}`)
                                        }
                                        className="text-red-500 hover:text-red-700"
                                        title="Delete"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default useAdminLayout(Index);
