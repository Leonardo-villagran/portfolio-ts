import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Data } from '../interfaces/home.interfaces';
import '../assets/css/Home.css';
import { useAppContext } from '../context/Context';
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

    const heroClass = theme === 'dark' ? 'hero_dark' : 'hero_light';
    const tagline =
        language === 'en'
            ? 'I build fast, elegant web experiences — from idea to production.'
            : 'Construyo experiencias web rápidas y elegantes — de la idea a producción.';

    return (
        <div className={`base ${heroClass}`}>
            <div className="hero-orb hero-orb-a" aria-hidden="true" />
            <div className="hero-orb hero-orb-b" aria-hidden="true" />
            <div className="hero-orb hero-orb-c" aria-hidden="true" />
            {data && (
                <div style={{ maxWidth: '880px', width: '100%' }}>
                    <div className="reveal reveal-1">
                        <Typewriters name={data?.name} strings={data?.roles} />
                    </div>
                    <p className="hero-tagline reveal reveal-2">{tagline}</p>
                    <div className="hero-cta reveal reveal-3">
                        <Link to="/projects" className="btn-gradient">
                            {language === 'en' ? 'View my work' : 'Ver mi trabajo'} →
                        </Link>
                        <Link to="/contact" className="btn-ghost">
                            {language === 'en' ? 'Get in touch' : 'Contáctame'}
                        </Link>
                    </div>
                    <div className="hero-socials reveal reveal-4">
                        <SocialIcons link={data.linkedin} />
                        <SocialIcons link={data.github} />
                        <SocialIcons link={`mailto:${data.email}`} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
