import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chrono } from 'react-chrono';
import { EducationData } from '../interfaces/experiences.interface';
import { useAppContext } from '../context/Context';
import '../assets/css/education.css';

const EducationTimeline: React.FC = () => {

    const { language, theme } = useAppContext();
    const [educationData, setEducationData] = useState<EducationData | null>(null);

    useEffect(() => {
        const fetchEducationData = async () => {
            try {
                const filename= language === 'en' ? 'education_en' : 'education';
                const response = await axios.get<EducationData>(`./json/${filename}.json`);
                setEducationData(response.data);
            } catch (error) {
                console.error('Error fetching education data:', error);
            }
        };

        fetchEducationData();
    }, [language]);

    const educationClass = theme === 'dark' ? 'education_dark' : 'education_light';

    return (
        <div className={educationClass}>
        <div className='container text-center'>
            {educationData && (
                <div>
                    <h2>{educationData.title}</h2>

                    <Chrono items={educationData.content} mode="VERTICAL_ALTERNATING"
                        uniqueId="title"
                        disableToolbar
                        allowDynamicUpdate
                        focusActiveItemOnLoad
                        slideShow
                        enableDarkToggle
                        useReadMore={false}
                        cardHeight={90}
                        theme={{
                            primary: '#3d84c6', // Color de fondo de la línea de tiempo y del contenido
                            secondary: 'white', // Color del punto de tiempo y de los detalles de la tarjeta
                            cardBgColor: '#1b1b1b', // Fondo de la tarjeta
                            titleColor: '#808080', // Color del título de la tarjeta
                            titleColorActive: '#007fff', // Color del subtítulo de la tarjeta
                            cardForeColor: 'red',
                            cardSubtitleColor: '#3d84c6',
                            cardTitleColor: 'white',
                            cardDetailsColor: '#808080', // Color del texto de la tarjeta

                        }}
                        fontSizes={{
                            cardSubtitle: '1rem',
                            cardText: '1rem',
                            cardTitle: '1.2rem',
                            title: '0.8rem',
                        }}
                    >
                    <div className="chrono-icons">
                        {educationData.content.map((item, index) => (
                            <img key={index} src={item.icon.src} alt={`Icon ${index}`} />
                        ))}
                    </div>
                    </Chrono>
                </div>
            )}
        </div>
        </div>
    );
};

export default EducationTimeline;
