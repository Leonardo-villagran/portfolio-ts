import React, { useState, useEffect } from 'react';
import { AppContext } from './Context';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<string>('es');
    const [theme, setTheme] = useState<string>('dark'); // Tema fijo: siempre oscuro

    useEffect(() => {
        const getAppConfig = async () => {
            try {
                const response = await fetch('./json/app.json');
                const appConfig = await response.json();
                if (appConfig && appConfig.portfolioLanguages) {
                    const { spanish, english } = appConfig.portfolioLanguages;
                    if (spanish && english) {
                        const storedLanguage = localStorage.getItem('language');

                        if (storedLanguage) {
                            setLanguage(storedLanguage);
                        } else {
                            setLanguage('es');
                        }
                        // Tema fijo: siempre oscuro
                        localStorage.setItem('theme', 'dark');
                        setTheme('dark');
                    } else if (spanish && !english) {
                        setLanguage('es');
                    } else if (!spanish && english) {
                        setLanguage('en');
                    }
                }
            } catch (error) {
                console.error('Error fetching app config:', error);
            }
        };
    
        getAppConfig();
    }, []);

    // const getBackgroundImage = (currentTheme: string) => {
    //     return currentTheme === 'dark' ? 'images/fondo_dark.jpg' : 'images/fondo_light.jpg';
    // };

    // const backgroundImage = getBackgroundImage(theme);
    
    return (
        <AppContext.Provider value={{ language, setLanguage, theme, setTheme }}>
            {/* <div style={{ 
                backgroundImage: `url('${backgroundImage}')`, 
                backgroundSize: '100% 100%', 
                backgroundRepeat: 'repeat' }}> */}
            <div>
            {children}
            </div>
        </AppContext.Provider>
    );
};
