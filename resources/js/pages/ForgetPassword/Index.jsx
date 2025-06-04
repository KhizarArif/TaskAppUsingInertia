import { router, useForm } from '@inertiajs/react';
import React from 'react'

const ForgetPassword = () => {
    const {data, setData} = useForm({
        email: ""
    })
    const handleSubmit = (e) => {
        e.preventDefault();
        router.post('/auth/forget-password', data)
    }

  return (
    <div>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
            <h2 className="text-2xl font-bold mb-6 text-center">Forget Password</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                </div>
                <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
                >
                Send Reset Link
                </button>
            </form>
            </div>
        </div>
    </div>
  )
}

export default ForgetPassword;
