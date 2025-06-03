import { router, useForm } from "@inertiajs/react";
import React from "react";

const Create = ({ task }) => {
    const isEditMode = Boolean(task);

    const { post, data, setData, processing, errors } = useForm({
        name: task?.name || "",
        id: task?.id || null,
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
        <div
            className="flex justify-evenly h-[50vh] w-1/3 rounded-2xl shadow-xl p-8 m-auto mt-10"
            style={{ background: "#958d8d" }}
        >
            <div className="flex flex-col items-center w-full max-w-md ">
                <h1 className="text-3xl font-semibold text-center text-indigo-600 mb-6">
                    📝 Task Manager
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="flex w-[250px] gap-2 m-auto mb-6"
                >
                    <input
                        type="text"
                        value={data.name}
                        name="name"
                        onChange={(e) => setData("name", e.target.value)}
                        placeholder="Add a new task..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                    />
                    {errors?.name && (
                        <div className="text-red-500">{errors?.name}</div>
                    )}
                    <button
                        disabled={processing}
                        type="submit"
                        className="px-4 py-2 bg-indigo-500 text-white font-medium rounded-lg hover:bg-indigo-600 transition"
                    >
                        {isEditMode ? "Update Task " : "Create Task"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Create;
