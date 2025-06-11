import React from "react";
import useAdminLayout from "../../Layouts/useAdminLayout";
import { Link, router, usePage } from "@inertiajs/react";
import { Edit, Trash2Icon } from "lucide-react";

const Index = ({ roles }) => {
    const { props } = usePage();
    const permissions = props.auth?.permissions || [];

    const can = (perm) => permissions.includes(perm);
    return (
        <div>
            <div className="p-3 w-full">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-semibold mb-4">Roles</h1>
                    {can("create roles") && (
                        <Link href="/roles/create">
                            <button className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                                Create Role
                            </button>
                        </Link>
                    )}
                </div>
                <div className="overflow-x-auto rounded-xl shadow-sm mt-4 w-full">
                    <table className="w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                                    Role Name
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                                    Permissions
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                                    Status
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                                    Created
                                </th>
                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100 w-full">
                            {roles?.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="px-4 py-3 text-center text-sm text-gray-500"
                                    >
                                        No Roles Found
                                    </td>
                                </tr>
                            ) : (
                                roles?.map((role) => (
                                    <tr
                                        className="hover:bg-gray-50 transition"
                                        key={role.id}
                                    >
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">
                                            {role.name}
                                        </td>
                                        {/* <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800"> */}
                                        {/* <td className="max-w-xs break-words whitespace-normal min-h-[40px]">
                                            {Object.keys(role.permissions)
                                                .length > 0
                                                ? Object.values(
                                                      role.permissions
                                                  ).join(", ")
                                                : "No permissions assigned"}
                                        </td> */}
                                        <td className="px-4 py-3">
                                            <div className="max-w-xs flex flex-wrap gap-2">
                                                {Object.keys(role.permissions)
                                                    .length > 0 ? (
                                                    Object.entries(
                                                        role.permissions
                                                    ).map(([id, name]) => (
                                                        <span
                                                            key={id}
                                                            // className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                                            // Different colors for different permission types
                                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                                                        ${
                                                                            name.includes(
                                                                                "admin"
                                                                            )
                                                                                ? "bg-red-100 text-red-800"
                                                                                : name.includes(
                                                                                      "edit"
                                                                                  )
                                                                                ? "bg-yellow-100 text-yellow-800"
                                                                                : "bg-blue-100 text-blue-800"
                                                                        }`}
                                                        >
                                                            {name}
                                                        </span>
                                                    ))
                                                ) : (
                                                    <span className="text-sm text-gray-500">
                                                        No permissions assigned
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs ${
                                                    role.status === "active"
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-red-100 text-red-800"
                                                }`}
                                            >
                                                {role.status
                                                    ? role.status
                                                          .charAt(0)
                                                          .toUpperCase() +
                                                      role.status.slice(1)
                                                    : "Inactive"}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                            {role.created_at}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-right text-sm space-x-2">
                                            {can("edit roles") && (
                                                <button
                                                    // href={route('roles.edit', role.id)}
                                                    onClick={() =>
                                                        router.get(
                                                            `/roles/${role.id}/edit`
                                                        )
                                                    }
                                                    className="text-blue-500 hover:text-blue-700 cursor-pointer"
                                                    title="Edit"
                                                >
                                                    <Edit size={18} />
                                                </button>
                                            )}

                                            {can("delete roles") && (
                                                <button
                                                    onClick={() =>
                                                        router.delete(
                                                            `/roles/${role.id}`
                                                        )
                                                    }
                                                    // href={route('roles.destroy', role.id)}
                                                    // method="delete"

                                                    className="text-red-500 hover:text-red-700 cursor-pointer"
                                                    title="Delete"
                                                >
                                                    <Trash2Icon size={18} />
                                                </button>
                                            )}
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
