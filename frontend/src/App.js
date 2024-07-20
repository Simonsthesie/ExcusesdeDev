import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ExcuseButton from './components/ExcuseButton';
import ExcuseDisplay from './components/ExcuseDisplay';
import LostPage from './components/LostPage';
import NotFoundPage from './components/NotFoundPage';
import HTTPStatusPage from './components/HTTPStatusPage';
import ExcuseModal from './components/ExcuseModal';
import './App.css';

const App = () => {
    const [excuses, setExcuses] = useState([]);
    const [currentExcuse, setCurrentExcuse] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showTitle, setShowTitle] = useState(true);
    const [animateButton, setAnimateButton] = useState(false);

    useEffect(() => {
        fetch('http://localhost:3001/api/excuses')
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(data => {
                setExcuses(data);
                if (data.length > 0) {
                    setCurrentExcuse(data[0]);
                }
            })
            .catch(error => console.error('Error fetching data:', error));

        setTimeout(() => {
            setShowTitle(false);
            setAnimateButton(true);
        }, 2000);
    }, []);

    const generateExcuse = () => {
        setLoading(true);
        const delay = Math.random() * (5000 - 1000) + 1000;
        setTimeout(() => {
            if (excuses.length > 1) {
                let newExcuse;
                do {
                    const randomIndex = Math.floor(Math.random() * excuses.length);
                    newExcuse = excuses[randomIndex];
                } while (currentExcuse && newExcuse.http_code === currentExcuse.http_code);
                setCurrentExcuse(newExcuse);
            }
            setLoading(false);
        }, delay);
    };

    const handleSaveExcuse = (httpCode, tag, message) => {
        const newExcuse = { http_code: parseInt(httpCode, 10), tag, message };
        fetch('http://localhost:3001/api/excuses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newExcuse)
        })
        .then(response => response.json())
        .then(data => {
            setExcuses([...excuses, data]);
            setCurrentExcuse(data);
            setModalOpen(false);
        })
        .catch(error => console.error('Error adding excuse:', error));
    };

    return (
        <Router>
            <Routes>
                <Route path="/lost" element={<LostPage />} />
                <Route path="/:httpCode" element={<HTTPStatusPage excuses={excuses} />} />
                <Route path="/" element={
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                        {showTitle && <h1 style={{ animation: 'fadeIn 2s' }}>Bonjour la ForEach Academy!</h1>}
                        {animateButton && <>
                            <div style={{ position: 'absolute', top: '20px', transition: 'all 2s' }}>
                                {loading ? <div>Loading...</div> : (currentExcuse && <ExcuseDisplay excuse={currentExcuse} />)}
                            </div>
                            <ExcuseButton onClick={generateExcuse} />
                            <button 
                            onClick={() => setModalOpen(true)}
                            className="add-excuse-button"
                        >
                            Ajouter Excuse
                        </button>
                        </>}
                    </div>
                } />
                <Route path="/not-found" element={<NotFoundPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
            {isModalOpen && <ExcuseModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} onSave={handleSaveExcuse} />}
        </Router>
    );
};

export default App;

