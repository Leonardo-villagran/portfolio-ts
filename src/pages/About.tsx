import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AboutData } from '../interfaces/about.interface';
import { useAppContext } from '../context/Context';
import AboutComponent from '../components/AboutComponent';
import '../assets/css/about.css';

const About: React.FC = () => {
    const [aboutData, setAboutData] = useState<AboutData | null>(null);
    const { language, theme } = useAppContext();


    useEffect(() => {
        const fetchAboutData = async () => {
            try {
                const filename = language === 'en' ? 'about_en' : 'about';
                const response = await axios.get<AboutData>(`./json/${filename}.json`);
                setAboutData(response.data);
            } catch (error) {
                console.error('Error fetching about data:', error);
            }
        };

        fetchAboutData();

    }, [language, theme]);

    // Agrega una clase al contenedor principal del hero según el tema seleccionado
    const aboutClass = theme === 'dark' ? 'hero_dark' : 'hero_light';
    const cardColor = theme === 'dark' ? 'bg-dark text-white' : 'bg-light text-dark';

    return (
        <div className={aboutClass}>
            <div className='container'>
                {aboutData && (
                    <div>
                        <h2 className='text-center'>{aboutData.title}</h2>
                        <div className="row">
                            <AboutComponent card={aboutData.about_card} picture={aboutData.about_picture} text={aboutData.about} color={cardColor} />
                            <AboutComponent card={aboutData.family_card} picture={aboutData.family_picture} text={aboutData.family} color={cardColor} />
                            <AboutComponent card={aboutData.sport_card} picture={aboutData.sport_picture} text={aboutData.sport} color={cardColor} />
                            <AboutComponent card={aboutData.hobbie_card} picture={aboutData.hobbie_picture} text={aboutData.hobbie} color={cardColor} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default About;
