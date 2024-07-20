import React from 'react';
import '../App.css'; // Assurez-vous que le chemin est correct

const ExcuseDisplay = ({ excuse }) => {
    return (
        <div className="excuse-display">
            <h1>Les excuses de dev</h1>
            <div className="message-box">
                <p>{excuse ? excuse.message : "Aucune excuse disponible"}</p>
            </div>
        </div>
    );
};

export default ExcuseDisplay;
