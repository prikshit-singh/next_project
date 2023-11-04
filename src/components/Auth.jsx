


import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Loginmodel from './Loginmodel';
import PageLoader from './frontEndComponent/loader/PermLoader';

export const withAuth = (WrappedComponent) => {
  const displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  const EnhancedComponent = (props) => {
    const [loginDialogue, setloginDialogue] = useState(true)
    const session= useSession();
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);
    
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

  EnhancedComponent.displayName = displayName;

  return EnhancedComponent;
};
