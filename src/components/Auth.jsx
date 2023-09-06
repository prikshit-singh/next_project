// withAuth.js

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
// import axios from "axios";
// import Cookies from 'js-cookie';
import Loader from './Loader';
import { toast } from 'react-toastify';
import { useSession } from "next-auth/react"
import Loginmodel from './Loginmodel';

export default function withAuth(WrappedComponent) {
    return function WithAuth(props) {
        const [isAuthenticated, setIsAuthenticated] = useState(false)
        const [loginDialogue, setloginDialogue] = useState(true)
        const router = useRouter();
        const { data: session, status } = useSession()


        // useEffect(() => {
        //     if(session.data != undefined){
        //         checkAuth()
        //     }
        // }, [session]);
console.log('status',status)

        const checkAuth = async () => {
            if (session.data != undefined) {
                setIsAuthenticated(true)
                return true
            } else {
                toast('Please Login First', { hideProgressBar: false, autoClose: 2000, type: 'warning' })
                router.push('/login')
                return false
            }
        }
        if (status === "loading") {
            return <Loader />
        }

        if (status === "unauthenticated") {
            return <Loginmodel loginDialogue={loginDialogue} setloginDialogue={setloginDialogue}/>
        }

        // Render the component if authenticated, or loading/spinner otherwise
        // if (isAuthenticated) {
            return <WrappedComponent {...props} />;
        // }
        // else {
        //     return <Loader />
        //     // You can replace this with a spinner component

        // }

    };
}
