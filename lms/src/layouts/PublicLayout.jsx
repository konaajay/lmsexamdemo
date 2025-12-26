import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const PublicLayout = () => {
    return (
        <>
            <Navbar />
            <div style={{ paddingTop: '0px' }}> {/* Navbar is fixed/overlay, so explicit padding not needed if Auth.css takes care of full height */}
                <Outlet />
            </div>
        </>
    );
};

export default PublicLayout;
