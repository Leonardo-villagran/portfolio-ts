import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chrono } from 'react-chrono';
import { EducationData } from '../interfaces/experiences.interface';

const EducationTimeline: React.FC = () => {
    const [educationData, setEducationData] = useState<EducationData | null>(null);

    useEffect(() => {
        const fetchEducationData = async () => {
            try {
                const response = await axios.get<EducationData>('./json/education.json');
                setEducationData(response.data);
            } catch (error) {
                console.error('Error fetching education data:', error);
            }
        };

        fetchEducationData();
    }, []);

    return (
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
    );
};

export default EducationTimeline;
