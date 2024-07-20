import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const HTTPStatusPage = ({ excuses }) => {
    const { httpCode } = useParams();  // Récupère le code HTTP de l'URL
    const navigate = useNavigate();
    const [message, setMessage] = useState("");

    useEffect(() => {
        // S'assurer que les excuses sont chargées avant de procéder
        if (excuses.length > 0) {
            const excuse = excuses.find(exc => exc.http_code === parseInt(httpCode));
            if (excuse) {
                setMessage(excuse.message);
            } else {
                // Si aucune excuse correspondante n'est trouvée après que les excuses sont chargées
                navigate('/not-found', { replace: true });
            }
        }
    }, [excuses, httpCode, navigate]);  // Inclure navigate dans les dépendances d'effet

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <h1>Code: {httpCode}</h1>
            <p>{message || "Chargement..."}</p>
        </div>
    );
};

export default HTTPStatusPage;
