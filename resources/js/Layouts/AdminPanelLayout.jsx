import React from "react";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import { usePage } from "@inertiajs/react";

const AdminPanelLayout = ({children}) => {
    const {props} = usePage();
    return (
        <div className="flex h-screen">
            <Sidebar />

            <div className="flex-1 bg-gray-100 flex flex-col">
                <Navbar user={props.auth?.user} />
                <main className="flex-1 overflow-y-auto p-6">{children}</main>
            </div>
        </div>
    );
};

export default AdminPanelLayout;
