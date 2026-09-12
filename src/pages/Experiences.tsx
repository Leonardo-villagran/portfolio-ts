import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { EducationData, EducationItem } from '../interfaces/experiences.interface';
import { useAppContext } from '../context/Context';
import '../assets/css/experiences.css';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const Experiences: React.FC = () => {
    const { language, theme } = useAppContext();
    const [experiencesData, setExperiencesData] = useState<EducationData | null>(null);

    useEffect(() => {
        const fetchExperiencesData = async () => {
            try {
                const filename = language === 'en' ? 'experiences_en' : 'experiences';
                const response = await axios.get<EducationData>(`./json/${filename}.json`);
                setExperiencesData(response.data);
            } catch (error) {
                console.error('Error fetching experiences data:', error);
            }
        };

        fetchExperiencesData();
    }, [language]);

    const experiencesClass = theme === 'dark' ? 'experiences_dark section-shell theme-dark' : 'experiences_light section-shell theme-light';

    // Helper to supply relevant tech stack chips for each company
    const getRoleTags = (item: EducationItem): string[] => {
        const sub = item.cardSubtitle.toLowerCase();
        if (sub.includes('incaser')) {
            return ['React', 'Node.js', 'IA Generativa', 'PostgreSQL', 'Docker', 'Cloud'];
        }
        if (sub.includes('biotik')) {
            return ['Google Cloud Platform', 'Docker', 'WebSockets', 'Python', 'Flask', 'PostgreSQL', 'ODK'];
        }
        if (sub.includes('b-72') || sub.includes('liceo')) {
            return ['Liderazgo Técnico', 'Docencia TI', 'Bases de Datos', 'Programación Web', 'Gestión Curricular'];
        }
        if (sub.includes('indisa')) {
            return ['Análisis Estadístico', 'Automatización', 'SQL', 'Reportería de Datos', 'Gestión de Proyectos'];
        }
        if (sub.includes('itnline')) {
            return ['Desarrollo Web', 'Gestión Educativa', 'Arquitectura Web', 'Bases de Datos'];
        }
        return ['Tecnología', 'Desarrollo Web'];
    };

    return (
        <div className={experiencesClass}>
            <div className="container" style={{ maxWidth: 'var(--max-w)' }}>
                {/* Header */}
                <div className="text-center mb-4">
                    <span className="section-kicker reveal">
                        <WorkOutlineIcon sx={{ fontSize: '0.9rem', marginRight: '4px' }} />
                        Career Path
                    </span>
                    <h2 className="section-title reveal reveal-1">
                        {experiencesData?.title || (language === 'en' ? 'Work Experience' : 'Experiencia Laboral')}
                    </h2>
                    <p className="section-subtitle reveal reveal-2">
                        {language === 'en'
                            ? 'Over 15 years leading web engineering projects, cloud architectures, data analytics, and technical education.'
                            : 'Más de 15 años de trayectoria liderando proyectos de desarrollo web, arquitecturas cloud, analítica de datos y docencia informática.'}
                    </p>
                </div>

                {/* Custom Modern Vertical Timeline */}
                {experiencesData && (
                    <div className="custom-timeline-container">
                        <div className="timeline-track-line" aria-hidden="true" />

                        {experiencesData.content.map((item, index) => {
                            const tags = getRoleTags(item);
                            const isPresent = item.title.toLowerCase().includes('present') || item.title.toLowerCase().includes('presente');

                            return (
                                <div
                                    key={index}
                                    className="timeline-item reveal"
                                    style={{ animationDelay: `${Math.min(index * 0.1, 0.4)}s` }}
                                >
                                    {/* Timeline Node Point */}
                                    <div className={`timeline-node-point ${isPresent ? 'point-active' : ''}`} />

                                    {/* Timeline Card Content */}
                                    <article className="timeline-experience-card glass">
                                        <div className="exp-card-header">
                                            {/* Company Logo / Avatar */}
                                            <div className="exp-company-logo-wrap">
                                                <img
                                                    src={item.icon}
                                                    alt={item.cardSubtitle}
                                                    className="exp-company-logo"
                                                    loading="lazy"
                                                />
                                            </div>

                                            {/* Title & Company Info */}
                                            <div className="exp-role-meta">
                                                <h3 className="exp-role-title">{item.cardTitle}</h3>
                                                <h4 className="exp-company-name">{item.cardSubtitle}</h4>
                                            </div>

                                            {/* Date Pill */}
                                            <div className="exp-date-container">
                                                <span className={`exp-date-pill ${isPresent ? 'date-current' : ''}`}>
                                                    <CalendarTodayIcon sx={{ fontSize: '0.8rem', marginRight: '4px' }} />
                                                    {item.title}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Detailed Points */}
                                        {item.cardDetailedText && item.cardDetailedText.length > 0 && (
                                            <ul className="exp-bullets-list">
                                                {item.cardDetailedText.map((bullet, bIdx) => (
                                                    <li key={bIdx}>
                                                        <CheckCircleOutlineIcon
                                                            sx={{ fontSize: '1rem', color: '#38bdf8', flexShrink: 0, marginTop: '2px' }}
                                                        />
                                                        <span>{bullet}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}

                                        {/* Tech Stack Chips */}
                                        <div className="exp-tags-wrapper">
                                            {tags.map((tag, tIdx) => (
                                                <span key={tIdx} className="exp-tech-chip">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </article>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Experiences;

