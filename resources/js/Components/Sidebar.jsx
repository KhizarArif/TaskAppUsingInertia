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
                    {/* Add more links as needed */}
                </ul>
            </nav>
        </aside>
    );
}
