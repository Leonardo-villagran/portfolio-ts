import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Data } from '../interfaces/home.interfaces';
import '../assets/css/Home.css';
import { useAppContext } from '../context/Context'; // Importa el hook useAppContext desde el archivo Context.tsx// Importa el 
import SocialIcons from '../components/SocialIcons';
import Typewriters from '../components/Typewriters';


const Home: React.FC = () => {
    const { language, theme } = useAppContext();
    const [data, setData] = useState<Data | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const filename = language === 'en' ? 'home_en' : 'home';
                const response = await axios.get<Data>(`./json/${filename}.json`);
                setData(response.data);
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        };

        fetchData();
    }, [language]);

    // Agrega una clase al contenedor principal del hero según el tema seleccionado
    const heroClass = theme === 'dark' ? 'hero_dark' : 'hero_light';

    return (
        <div className={`base ${heroClass}`}>
            {data && (
                <div>
                    <Typewriters name={data?.name} strings={data?.roles} />
                    <div>
                        <SocialIcons link={data.linkedin} />
                        <SocialIcons link={data.github} />
                        <SocialIcons link={`mailto:${data.email}`}/>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
