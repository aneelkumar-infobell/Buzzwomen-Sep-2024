import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './footer.css'
const Footer = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showDiv, setShowDiv] = useState(false);
  useEffect(() => {
    const handleConnectionChange = () => {
      setIsOnline(navigator.onLine);
      const timeout = setTimeout(() => {
        setShowDiv(true);
      }, 3000); // Timeout duration in milliseconds
      if(isOnline){
        hideMessage()
      }else{
        setShowDiv(true)
      }
    };
   

    window.addEventListener('online', handleConnectionChange);
    window.addEventListener('offline', handleConnectionChange);

    return () => {
      window.removeEventListener('online', handleConnectionChange);
      window.removeEventListener('offline', handleConnectionChange);
    };
  }, [isOnline]);


  const hideMessage = () => {
    const timeout = setTimeout(() => {
      setShowDiv(false);
    }, 3000);
    return true;
  }

  return (
//     <div className={`footer ${isOnline ? 'online' : 'offline'}`}>
//     {showOnlineStatus && (isOnline ? 'Online' : 'Offline')}
//   </div>

    <div>
          {!isOnline?
            <div  className={`footer ${isOnline ? 'online' : 'offline'}`}>
              <p>
                
               You Are Offline
              </p>
               </div> :  
                 <div  >
                 {showDiv && hideMessage() && (
                   <div className={`footer ${isOnline ? 'online' : 'offline'}`}>
                   <p>
                     
                   You Are Online
                   </p>
                    </div>
                 )}
               </div>
               }
               </div>
  );
};

export default Footer;