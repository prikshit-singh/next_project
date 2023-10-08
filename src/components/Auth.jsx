


import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Loginmodel from './Loginmodel';
import PageLoader from './frontEndComponent/loader/PermLoader';
import axios from 'axios';

export const withAuth = (WrappedComponent) => {
  return (props) => {
    const [loginDialogue, setloginDialogue] = useState(true)
    const session= useSession();
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);
    // useEffect(() => {
    //   const checkAuthorization = async () => {
    //     if (status === 'authenticated' && session?.user) {
    //       try {
    //         // Make an API call to check if the user has access to the current URL

    //         const response = await axios.get('/api/settings/rolesettings/getuserroles', {
    //             headers: {
    //                 'token': session.userData.token ,
    //             }
    //         });
    //         console.log(router.pathname)
    //         console.log(response.data.userMenuRoles.includes(router.pathname))

    //         if (response.data.CODE === 200 && response.data.userMenuRoles.includes(router.pathname)) {
    //           setIsAuthorized(true);
    //           setloginDialogue(false);
    //         } else {
    //           // Redirect to an unauthorized page or display a message
    //           setloginDialogue(true);
    //         }
    //       } catch (error) {
    //         console.error('Error checking authorization:', error);
    //         // Handle the error as needed
    //       }
    //     }
    //   };

    //   checkAuthorization();
    // }, [status, session, router]);

    useEffect(()=>{
      if(session && session.data){
        const index = session.data.existingUser.roles[0].canaccessprofilemenus.findIndex((data)=>data.url === router.pathname)
        if(index !== -1){
          setIsAuthorized(true)
        }
      }
    },[session])
    
    if ( session && session.status === 'authenticated' && !isAuthorized) {
        return  <p>Not Authorised...</p>; // You can use a loading indicator or unauthorized message here
      }
      if (session && session.status === "unauthenticated") {
        return <Loginmodel loginDialogue={loginDialogue} setloginDialogue={setloginDialogue}/>
    }
    if (session && session.status === 'loading' || !isAuthorized) {
      return <PageLoader/>; // You can use a loading indicator or unauthorized message here
    }
    
   


    return <WrappedComponent {...props} />;
  };
};
