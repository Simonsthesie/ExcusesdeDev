import React from 'react';
import '../App.css'; // Assurez-vous que le chemin est correct

const ExcuseButton = ({ onClick }) => {
    return (
        <button
            className="excuse-button"
            onClick={onClick}
        >
            Générer une excuse
        </button>
    );
};

export default ExcuseButton;
