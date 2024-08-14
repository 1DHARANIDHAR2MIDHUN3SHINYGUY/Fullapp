import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    const apiUrl = 'http://localhost:8000/token/'; 

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const response = await axios.post(apiUrl, {
                    username: 'dharani',  
                    password: 'dharani',  
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                setToken(response.data.access); 
            } catch (error) {
                console.log(Response);
                console.error('Error response:', error.response); // Log the full error response
                if (error.response && error.response.data) {
                    console.error('Error message:', error.response.data.message); // Log the error message if available
                } else if (error.request) {
                    console.error('Error request:', error.request); // Log the error request
                } else {
                    console.error('Error message:', error.message); // Log a generic error message
                }
            } finally {
                setLoading(false);
            }
        };

        fetchToken();
    }, []); 

    if (loading) {
        return <div>Loading...</div>; 
    }

    return (
        <TokenContext.Provider value={{ token, setToken }}>
            {children}
        </TokenContext.Provider>
    );
};
