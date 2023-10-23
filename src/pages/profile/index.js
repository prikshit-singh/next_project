import { useState,useEffect } from "react";
import ProfileComponent from "../../components/frontEndComponent/profilePageComponents/ProfileComponent";
import Uploadpreviouspapers from "../../components/Uploadpreviouspapers";
import Navbar from '../../components/frontEndComponent/navabrs/Navbar';
import Footer from "../../components/Footer";
import Layout from "../../layouts/Layout";
import { useSession } from "next-auth/react"
const Profile = () => {
    const [userData,setUserData] = useState({})
    const session = useSession()

    useEffect(() => {
        if (session.data) {
            setUserData(session.data.existingUser)
        } else {
            console.log(userData)
        }
    }, [session])
    return (
        <>
            <Layout>
                <ProfileComponent userData={userData}/>
                <Uploadpreviouspapers />
            </Layout>
        </>
    );
};

export default Profile;