import React, { useEffect } from 'react';

const LostPage = () => {
    useEffect(() => {
        //  5 secondes
        const timer = setTimeout(() => {
            window.location.href = '/';  
        }, 5000);

        // Nettoie le timer 
        return () => clearTimeout(timer);
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <h1>I'm lost</h1>
            <img src="https://media.tenor.com/pPKOYQpTO8AAAAAM/monkey-developer.gif" alt="Lost" style={{ width: 'auto', height: 'auto' }} />
        </div>
    );
};

export default LostPage;
