import React, { useState } from 'react';

const ExcuseModal = ({ isOpen, onClose, onSave }) => {
    const [httpCode, setHttpCode] = useState('');
    const [message, setMessage] = useState('');
    const [tag, setTag] = useState('');

    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex',
            alignItems: 'center', justifyContent: 'center'
        }}>
            <div style={{
                background: 'white', padding: '20px', width: '90%', maxWidth: '500px',
                borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}>
                <h2 style={{ textAlign: 'center' }}>Ajouter une nouvelle excuse</h2>
                <input
                    type="text"
                    placeholder="Code HTTP"
                    value={httpCode}
                    onChange={(e) => setHttpCode(e.target.value)}
                    style={{
                        width: '95%', padding: '10px', margin: '10px 0', borderRadius: '4px',
                        border: '1px solid #ccc'
                    }}
                />
                <input
                    type="text"
                    placeholder="Tag"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    style={{
                        width: '95%', padding: '10px', margin: '10px 0', borderRadius: '4px',
                        border: '1px solid #ccc'
                    }}
                />
                <textarea
                    placeholder="Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    style={{
                        width: '95%', padding: '10px', margin: '10px 0', height: '100px',
                        borderRadius: '4px', border: '1px solid #ccc', resize: 'none'
                    }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <button
                        onClick={() => onSave(httpCode, tag, message)}
                        style={{
                            padding: '10px 20px', borderRadius: '5px', border: 'none',
                            backgroundColor: '#007BFF', color: 'white', cursor: 'pointer',
                            transition: 'background-color 0.3s'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007BFF'}
                    >
                        Valider
                    </button>
                    <button
                        onClick={onClose}
                        style={{
                            padding: '10px 20px', borderRadius: '5px', border: 'none',
                            backgroundColor: '#6c757d', color: 'white', cursor: 'pointer',
                            transition: 'background-color 0.3s'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#5a6268'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#6c757d'}
                    >
                        Fermer
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ExcuseModal;
