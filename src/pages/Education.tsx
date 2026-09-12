import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { EducationData } from '../interfaces/education.interface';
import { useAppContext } from '../context/Context';
import '../assets/css/education.css';
import ChronoDark from '../components/ChronoDark';
import ChronoLight from '../components/ChronoLight';

const EducationTimeline: React.FC = () => {
    const { language, theme } = useAppContext();
    const [educationData, setEducationData] = useState<EducationData | null>(null);

    useEffect(() => {
        const fetchEducationData = async () => {
            try {
                const filename = language === 'en' ? 'education_en' : 'education';
                const response = await axios.get<EducationData>(`./json/${filename}.json`);
                setEducationData(response.data);
            } catch (error) {
                console.error('Error fetching education data:', error);
            }
        };

        fetchEducationData();
    }, [language]);

    const educationClass = theme === 'dark' ? 'education_dark section-shell theme-dark' : 'education_light section-shell theme-light';
    const ChronoComponent = theme === 'dark' ? ChronoDark : ChronoLight;

    return (
        <div className={educationClass}>
            <div className="container" style={{ maxWidth: 'var(--max-w)' }}>
                <div className="text-center">
                    <span className="section-kicker reveal">Journey</span>
                </div>
                <div className="timeline-shell px-2 px-md-4">
                    {educationData && <ChronoComponent title={educationData.title} content={educationData.content} mode="VERTICAL_ALTERNATING" />}
                </div>
            </div>
        </div>
    );
};

export default EducationTimeline;
