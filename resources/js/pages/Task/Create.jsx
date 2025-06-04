import { router, useForm } from "@inertiajs/react";
import React from "react";
import useAdminLayout from "../../Layouts/useAdminLayout";

const Create = ({ task }) => {
    const isEditMode = Boolean(task);

    const { data, setData, processing, errors } = useForm({
        name: task?.name || "",
        id: task?.id || null,
        assigned_to: task?.assigned_to || "",
        starting_date: task?.starting_date || "",
        ending_date: task?.ending_date || "",
        status: task?.status || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEditMode) {
            // If in edit mode, update the task
            router.put(`/tasks/${task.id}`, data, {
                onSuccess: () => {
                    setData("name", "");
                },
            });
            return;
        } else {
            router.post("/tasks", data, {
                onSuccess: () => {
                    setData("name", "");
                },
            });
        }
    };
    return (
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-10 mt-10">
            <h1 className="text-2xl font-bold text-center text-indigo-600 mb-10">
                📝 Task Manager
            </h1>

            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
                {/* Task Name */}
                <div>
                    <label className="block mb-1 font-semibold">
                        Task Name
                    </label>
                    <input
                        type="text"
                        value={data.name}
                        name="name"
                        onChange={(e) => setData("name", e.target.value)}
                        placeholder="Add a new task..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                    />
                    {errors?.name && (
                        <p className="text-red-500 text-sm">{errors.name}</p>
                    )}
                </div>

                {/* Assigned To */}
                <div>
                    <label className="block mb-1 font-semibold">
                        Assigned To
                    </label>
                    <input
                        type="text"
                        value={data.assigned_to}
                        onChange={(e) => setData("assigned_to", e.target.value)}
                        placeholder="Assign to"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                    />
                    {errors?.assigned_to && (
                        <p className="text-red-500 text-sm">
                            {errors.assigned_to}
                        </p>
                    )}
                </div>

                {/* Starting Time */}
                <div>
                    <label className="block mb-1 font-semibold">
                        Starting Time
                    </label>
                    <input
                        type="datetime-local"
                        value={data.starting_date}
                        onChange={(e) =>
                            setData("starting_date", e.target.value)
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                    />
                    {errors?.starting_date && (
                        <p className="text-red-500 text-sm">
                            {errors.starting_date}
                        </p>
                    )}
                </div>

                {/* Ending Time */}
                <div>
                    <label className="block mb-1 font-semibold">
                        Ending Time
                    </label>
                    <input
                        type="datetime-local"
                        value={data.ending_date}
                        onChange={(e) => setData("ending_date", e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                    />
                    {errors?.ending_date && (
                        <p className="text-red-500 text-sm">
                            {errors.ending_date}
                        </p>
                    )}
                </div>

                {/* Status */}
                <div>
                    <label className="block mb-1 font-semibold">Status</label>
                    <select
                        value={data.status}
                        onChange={(e) => setData("status", e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                    >
                        <option value="">Select Status</option>
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                    </select>
                    {errors?.status && (
                        <p className="text-red-500 text-sm">{errors.status}</p>
                    )}
                </div>

                {/* Submit Button */}
                <div className="md:col-span-2">
                    <button
                        disabled={processing}
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200"
                    >
                        {isEditMode ? "Update Task" : "Create Task"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default useAdminLayout(Create);
