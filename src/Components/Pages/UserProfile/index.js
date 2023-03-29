import React from "react";
import Footer from "../../SharedComponents/Footer/Footer";
import Navbar from "../../SharedComponents/NavBar/NavBar";
import UserProfile from "./UserProfile";

const UserProfileMain = () => {
    return (
        <div>
            <Navbar />
            <UserProfile />
            <Footer/>
        </div>
    );
}

export default UserProfileMain;