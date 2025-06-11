import React from "react";
import { Link, usePage } from "@inertiajs/react";

export default function Sidebar() {
    const { props } = usePage();
    const permissions = props.auth?.permissions || [];
    const can = (perm) => permissions.includes(perm);

    return (
        <aside className="w-64 bg-gray-800 text-white p-4">
            <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
            <nav>
                <ul className="space-y-3">
                    {can("view dashboard") && (
                        <li>
                            <Link href="/dashboard" className="hover:underline">
                                Dashboard
                            </Link>
                        </li>
                    )}
                    {can("view tasks") && (
                        <li>
                            <Link href="/tasks" className="hover:underline">
                                Tasks
                            </Link>
                        </li>
                    )}
                    {can("view users") && (
                        <li>
                            <Link href="/users" className="hover:underline">
                                Users
                            </Link>
                        </li>
                    )}
                    {can("view roles") && (
                        <li>
                            <Link href="/roles" className="hover:underline">
                                Roles
                            </Link>
                        </li>
                    )}
                </ul>
            </nav>
        </aside>
    );
}
