import React from "react";
import {
    PencilSquareIcon,
    TrashIcon,
    PlusIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { router } from "@inertiajs/react";
import useAdminLayout from "../../Layouts/useAdminLayout";

const Index = ({ taskList }) => {
    return (
        <div className="w-7xl overflow-x-auto m-auto mt-7">
            {/* Add Button */}
            <div className="flex justify-end mr-4 min-w-2xl">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => router.get('tasks/create')}
                    className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow transition"
                >
                    <PlusIcon className="w-5 h-5" />
                    <span>Add Task</span>
                </motion.button>
            </div>

            {/* Table */}
            <table className="min-w-7xl bg-white shadow-md rounded-lg overflow-hidden m-auto ">
                <thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                    <tr>
                        <th className="py-3 px-6 text-left">#</th>
                        <th className="py-3 px-6 text-left">Task Name</th>
                        <th className="py-3 px-6 text-left">Assign To </th>
                        <th className="py-3 px-6 text-left">Starting Time </th>
                        <th className="py-3 px-6 text-left">Ending Time </th>
                        <th className="py-3 px-6 text-left">Status </th>
                        <th className="py-3 px-6 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700 text-sm">
                    {taskList?.length === 0 ? (
                        <tr>
                            <td
                                colSpan="3"
                                className="py-4 text-center text-gray-400"
                            >
                                No tasks yet.
                            </td>
                        </tr>
                    ) : (
                        taskList?.map((task, index) => (
                            <tr
                                key={task.id}
                                className="border-b hover:bg-gray-50"
                            >
                                <td className="py-3 px-6">{index + 1}</td>
                                <td className="py-3 px-6">{task.name}</td>
                                <td className="py-3 px-6">{task.assigned_to || 'Unassigned'}</td>
                                <td className="py-3 px-6">{task.starting_date || 'N/A'}</td>
                                <td className="py-3 px-6">{task.ending_date || 'N/A'}</td>
                                <td className="py-3 px-6">
                                    <span
                                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                                            task.status === 'completed'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-yellow-100 text-yellow-800'
                                        }`}
                                    >
                                        {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                                    </span>
                                </td>
                                <td className="py-3 px-6 text-center flex justify-center gap-4">
                                    <motion.button
                                        whileHover={{ scale: 1.2 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() =>
                                            router.get(`tasks/${task.id}/edit`)
                                        }
                                        className="text-blue-500"
                                        title="Edit"
                                    >
                                        <PencilSquareIcon className="w-5 h-5" />
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.2 }}
                                        whileTap={{ scale: 0.95 }}
                                         onClick={() =>
                                            router.delete(`tasks/${task.id}/delete`)
                                        }
                                        className="text-red-500"
                                        title="Delete"
                                    >
                                        <TrashIcon className="w-5 h-5" />
                                    </motion.button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default useAdminLayout(Index);
