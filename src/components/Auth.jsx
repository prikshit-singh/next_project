// withAuth.js

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from "axios";

export default function withAuth(WrappedComponent) {
    return function WithAuth(props) {
        const [isAuthenticated, setIsAuthenticated] = useState(false)
        const router = useRouter();
      
        useEffect(() => {
          
            checkAuth()
            
        }, []);

        const checkAuth = async () => {
            const cookieValue =await document.cookie
                .split('; ')
                .find(row => row.startsWith('token'))
                .split('=')[1];
                 const res = await axios.post('http://localhost:3000/api/varifytoken', {token:cookieValue})
                  console.log(111,cookieValue,res)

            if (res.status === 200) {
                console.log(res)
                // document.cookie = "token=" + res.data.token;
                setIsAuthenticated(true)

                // router.push('/write')
                return true
            }else if (res.status === 401) {
                console.log(res)
                // document.cookie = "token=" + res.data.token;
                router.push('/login')
                return false
            }else{
                router.push('/login')
                setIsAuthenticated(false)
                return false
            }
           
        }
        // Render the component if authenticated, or loading/spinner otherwise
        console.log(isAuthenticated)
        if (isAuthenticated) {
            return <WrappedComponent {...props} />;
        } 
        else {
            return <div>Loading...</div>; // You can replace this with a spinner component

        }

    };
}
