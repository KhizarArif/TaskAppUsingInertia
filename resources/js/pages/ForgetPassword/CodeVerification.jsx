import React, { useState } from "react";
import { router } from "@inertiajs/react";

export default function CodeVerification({ email }) {
    const [code, setCode] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post("/auth/verify-code", { email, code });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full"
            >
                <h2 className="text-2xl font-semibold mb-4 text-center">
                    Enter Reset Code
                </h2>
                <input
                    type="text"
                    className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="6-digit code"
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Verify Code
                </button>
            </form>
        </div>
    );
}
