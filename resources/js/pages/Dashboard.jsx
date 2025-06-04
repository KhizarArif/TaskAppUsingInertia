// resources/js/Pages/Dashboard.jsx
import React from 'react';
import useAdminLayout from '../Layouts/useAdminLayout';

const Dashboard = ({totalPendingTasks, totalCompletedTasks}) => {
     const cardStyle = "bg-white p-6 rounded-xl shadow-md flex flex-col items-center";

    return (
         <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className={cardStyle}>
                    <span className="text-3xl font-semibold">{totalPendingTasks}</span>
                    <span className="text-sm text-gray-500 border-t-4 border-t-blue-600 mt-2">Total Pending Tasks</span>
                </div>

                <div className={cardStyle}>
                    <span className="text-3xl font-semibold ">{totalCompletedTasks}</span>
                    <span className="text-sm text-gray-500 border-t-4  border-t-blue-600 mt-2">Total Completed Tasks</span>
                </div>

            </div>
        </div>
    );
}

export default useAdminLayout(Dashboard);
