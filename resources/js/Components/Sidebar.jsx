import React from 'react';
import { Link } from '@inertiajs/react';

export default function Sidebar() {
    return (
        <aside className="w-64 bg-gray-800 text-white p-4">
            <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
            <nav>
                <ul className="space-y-3">
                    <li>
                        <Link href="/dashboard" className="hover:underline">
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link href="/tasks" className="hover:underline">
                            Tasks
                        </Link>
                    </li>
                    <li>
                        <Link href="/users" className="hover:underline">
                            Users
                        </Link>
                    </li>
                    <li>
                        <Link href="/roles" className="hover:underline">
                            Roles
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}
