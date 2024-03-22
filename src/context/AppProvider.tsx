import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext<{
    language: string;
    setLanguage: React.Dispatch<React.SetStateAction<string>>;
    theme: string; // Nuevo estado para el tema
    setTheme: React.Dispatch<React.SetStateAction<string>>; // Nueva función para cambiar el tema
}>({
    language: '',
    setLanguage: () => {},
    theme: '', // Valor predeterminado del tema
    setTheme: () => {}, // Función vacía para cambiar el tema
});

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<string>('');
    const [theme, setTheme] = useState<string>(''); // Estado y función para el tema

    useEffect(() => {
        const getAppConfig = async () => {
            try {
                const response = await fetch('./json/app.json');
                const appConfig = await response.json();
                if (appConfig && appConfig.portfolioLanguages) {
                    const { spanish, english } = appConfig.portfolioLanguages;
                    if (spanish && english) {
                        const storedLanguage = localStorage.getItem('language');
                        const storedTheme = localStorage.getItem('theme'); // Obtener el tema almacenado del localStorage

                        if (storedLanguage) {
                            setLanguage(storedLanguage);
                        } else {
                            setLanguage('es');
                        }
                        if (storedTheme) { // Si hay un tema almacenado, establecerlo
                            setTheme(storedTheme);
                        } else {
                            localStorage.setItem('theme', 'dark');
                            setTheme('dark');
                        }
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
