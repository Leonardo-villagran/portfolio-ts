import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { EducationData } from '../interfaces/experiences.interface';
import { useAppContext } from '../context/Context';
import '../assets/css/experiences.css';
import ChronoDark from '../components/ChronoDark';
import ChronoLight from '../components/ChronoLight';

const EducationTimeline: React.FC = () => {
    const { language, theme } = useAppContext();
    const [educationData, setEducationData] = useState<EducationData | null>(null);

    useEffect(() => {
        const fetchEducationData = async () => {
            try {
                const filename = language === 'en' ? 'experiences_en' : 'experiences';
                const response = await axios.get<EducationData>(`./json/${filename}.json`);
                setEducationData(response.data);
            } catch (error) {
                console.error('Error fetching education data:', error);
            }
        };

        fetchEducationData();
    }, [language]);

    const educationClass = theme === 'dark' ? 'education_dark' : 'education_light';

    const ChronoComponent = theme === 'dark' ? ChronoDark : ChronoLight;

    return (
        <div className={educationClass}>
            <div className='container text-center'>
                {educationData && <ChronoComponent title={educationData.title} content={educationData.content} mode="VERTICAL" />}
            </div>
        </div>
    );
};

export default EducationTimeline;
