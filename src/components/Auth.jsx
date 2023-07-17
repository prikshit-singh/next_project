// withAuth.js

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function withAuth(WrappedComponent) {
    return function WithAuth(props) {
        const [isAuthenticated, setIsAuthenticated] = useState(false)
        const router = useRouter();
        // Perform the authentication check
        useEffect(() => {
            // Your authentication logic goes here
            // Check if the user is authenticated
            // If not, redirect to the login page
             // check authentication status
                  checkAuth()
              if (!checkAuth()) {
                router.push('/login');
              }
        }, []);
        const checkAuth =  () => {
            setIsAuthenticated(true) 
            return true
        }
        // Render the component if authenticated, or loading/spinner otherwise
        if (isAuthenticated) {
            return <WrappedComponent {...props} />;
        } else {
            return <div>Loading...</div>; // You can replace this with a spinner component

        }

    };
}
