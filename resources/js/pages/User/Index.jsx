import React from "react";
import useAdminLayout from "../../Layouts/useAdminLayout";
import { Edit, Trash2 } from "lucide-react";
import { Link, router, usePage } from "@inertiajs/react";

const Index = ({ users }) => {
    const { props } = usePage();
    const permissions = props.auth?.permissions || [];

    const can = (perm) => permissions.includes(perm);
    const handleUserEdit = (e) => {
        e.preventDefault();
        router.get(`/users/${e.currentTarget.dataset.id}/edit`);
    };

    return (
        <div className="p-3">
            <button className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition">
                {can("create users") && (
                    <Link
                        href="/users/create"
                        className="flex items-center gap-2"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 4v16m8-8H4"
                            />
                        </svg>
                        Create User
                    </Link>
                )}
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
                        {users?.map((user) => (
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
                                    {user?.roles?.length > 0
                                        ? user?.roles?.map((role) => (
                                              <span
                                                  key={role.id}
                                                  className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold mr-2 mb-2"
                                              >
                                                  {role.name}
                                              </span>
                                          ))
                                        : "No Role Assigned"}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-right text-sm">
                                    {can("edit users") && (
                                        <button
                                            onClick={() =>
                                                router.get(
                                                    `/users/${user.id}/edit`
                                                )
                                            }
                                            className="text-blue-500 hover:text-blue-700 mr-3 cursor-pointer"
                                            title="Edit"
                                        >
                                            <Edit size={18} />
                                        </button>
                                    )}
                                    {can("delete users") && (
                                        <button
                                            onClick={() =>
                                                alert(`Delete user ${user.id}`)
                                            }
                                            className="text-red-500 hover:text-red-700 cursor-pointer"
                                            title="Delete"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    )}
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
