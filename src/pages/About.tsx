import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AboutData } from '../interfaces/about.interface';
import { useAppContext } from '../context/Context';
import AboutComponent from '../components/AboutComponent';
import '../assets/css/about.css';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import VerifiedIcon from '@mui/icons-material/Verified';

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
                        {/* Title Header */}
                        <div className="text-center mb-4">
                            <span className="section-kicker reveal">
                                <PersonOutlineIcon sx={{ fontSize: '0.95rem', marginRight: '4px' }} />
                                Profile
                            </span>
                            <h2 className="section-title reveal reveal-1">
                                {aboutData.title.split(' ').slice(0, -1).join(' ')}{' '}
                                <span className="gradient-text">{aboutData.title.split(' ').slice(-1)}</span>
                            </h2>
                            <p className="section-subtitle reveal reveal-2">
                                {language === 'en'
                                    ? 'A strategic mindset combining computer engineering, institutional management optimization, and modern AI tools.'
                                    : 'Visión estratégica que une ingeniería informática, optimización de la gestión institucional y aplicación práctica de IA.'}
                            </p>
                        </div>

                        {/* Executive Summary Spotlight Box */}
                        <div className="about-executive-spotlight glass mb-5 reveal reveal-2">
                            <div className="row align-items-center g-4">
                                <div className="col-12 col-md-3 text-center">
                                    <div className="about-spotlight-avatar-wrap">
                                        <img
                                            src="images/about/profile.jpg"
                                            alt="Leonardo Villagrán"
                                            className="about-spotlight-avatar"
                                            loading="lazy"
                                        />
                                        <span className="about-verified-badge" title="Verified Professional">
                                            <VerifiedIcon sx={{ fontSize: '1.25rem', color: '#38bdf8' }} />
                                        </span>
                                    </div>
                                </div>
                                <div className="col-12 col-md-9">
                                    <h3 className="about-spotlight-title">Leonardo Villagrán</h3>
                                    <h4 className="about-spotlight-subtitle">
                                        {language === 'en'
                                            ? 'Computer & Management Engineer · Process Optimization & AI · Master in Education'
                                            : 'Ingeniero en Informática y Gestión · Optimización de Procesos con IA · Magíster en Educación'}
                                    </h4>

                                    <div className="about-pillars-grid mt-3">
                                        <div className="about-pillar-chip">
                                            <span className="pillar-dot" />
                                            <span>
                                                {language === 'en' ? 'Internal Management & Process Optimization' : 'Optimización de Gestión Interna & Procesos'}
                                            </span>
                                        </div>
                                        <div className="about-pillar-chip">
                                            <span className="pillar-dot" />
                                            <span>
                                                {language === 'en' ? 'Enterprise IT Systems & Control' : 'Sistemas y Plataformas de Control TI'}
                                            </span>
                                        </div>
                                        <div className="about-pillar-chip">
                                            <span className="pillar-dot" />
                                            <span>
                                                {language === 'en' ? 'Applied AI & Automation' : 'Inteligencia Artificial Aplicada a la Gestión'}
                                            </span>
                                        </div>
                                        <div className="about-pillar-chip">
                                            <span className="pillar-dot" />
                                            <span>
                                                {language === 'en' ? 'Team Leadership & Change Management' : 'Liderazgo de Equipos y Gestión del Cambio'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 4 Cards Grid */}
                        <div className="row mt-2">
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

