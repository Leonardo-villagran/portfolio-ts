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
    }, [language]);

    const aboutClass = theme === 'dark' ? 'about_dark section-shell theme-dark' : 'about_light section-shell theme-light';

    return (
        <div className={aboutClass}>
            <div className="container" style={{ maxWidth: 'var(--max-w)' }}>
                {aboutData && (
                    <div>
                        <div className="text-center">
                            <span className="section-kicker reveal">About</span>
                            <h2 className="section-title reveal reveal-1">
                                {aboutData.title.split(' ').slice(0, -1).join(' ')}{' '}
                                <span className="gradient-text">{aboutData.title.split(' ').slice(-1)}</span>
                            </h2>
                        </div>
                        <div className="row mt-4">
                            <AboutComponent card={aboutData.about_card} picture={aboutData.about_picture} text={aboutData.about} />
                            <AboutComponent card={aboutData.family_card} picture={aboutData.family_picture} text={aboutData.family} />
                            <AboutComponent card={aboutData.sport_card} picture={aboutData.sport_picture} text={aboutData.sport} />
                            <AboutComponent card={aboutData.hobbie_card} picture={aboutData.hobbie_picture} text={aboutData.hobbie} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default About;
