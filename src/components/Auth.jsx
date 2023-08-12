// withAuth.js

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from "axios";
import Cookies from 'js-cookie';
import Loader from './Loader';

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
                console.log(111, cookieValue, res)
    
                if (res.data.CODE === 200) {
                    console.log(res)
                    // document.cookie = "token=" + res.data.token;
                    setIsAuthenticated(true)
    
                    // router.push('/write')
                    return true
                } else if (res.data.CODE === 401) {
                    console.log(res)
                    // document.cookie = "token=" + res.data.token;
                    router.push('/login')
                    setIsAuthenticated(false)
                    return false
                } else {
                    router.push('/login')
                    setIsAuthenticated(false)
                    return false
                }
            }else{
                router.push('/login')
                return false
            }
           

        }
        // Render the component if authenticated, or loading/spinner otherwise
        console.log(isAuthenticated)
        if (isAuthenticated) {
            return <WrappedComponent {...props} />;
        }
        else {
            return  <Loader /> 
            // You can replace this with a spinner component

        }

    };
}
