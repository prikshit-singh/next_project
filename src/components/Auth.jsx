// withAuth.js

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from "axios";
import Cookies from 'js-cookie';
import Loader from './Loader';
import {  toast } from 'react-toastify';

export default function withAuth(WrappedComponent) {
    return function WithAuth(props) {
        const [isAuthenticated, setIsAuthenticated] = useState(false)
        const router = useRouter();

        useEffect(() => {
            checkAuth()
        }, []);

        const checkAuth = async () => {
            const cookieValue = await Cookies.get('token')
            if(cookieValue){
                const res = await axios.post('/api/varifytoken', { token: cookieValue })
                if (res.data.CODE === 200) {
                    console.log(res)
                    // document.cookie = "token=" + res.data.token;
                    setIsAuthenticated(true)
                    // router.push('/write')
                    return true
                } else if (res.data.CODE === 401) {
                    console.log(res)
                    // document.cookie = "token=" + res.data.token;
                    toast('Please Login First', { hideProgressBar: false, autoClose: 2000, type: 'warning' })
                    router.push('/login')
                    setIsAuthenticated(false)
                    return false
                } else {
                    toast('Please Login First', { hideProgressBar: false, autoClose: 2000, type: 'warning' })

                    router.push('/login')
                    setIsAuthenticated(false)
                    return false
                }
            }else{
                toast('Please Login First', { hideProgressBar: false, autoClose: 2000, type: 'warning' })

                router.push('/login')
                return false
            }
           

        }
        // Render the component if authenticated, or loading/spinner otherwise
        if (isAuthenticated) {
            return <WrappedComponent {...props} />;
        }
        else {
            return  <Loader /> 
            // You can replace this with a spinner component

        }

    };
}
