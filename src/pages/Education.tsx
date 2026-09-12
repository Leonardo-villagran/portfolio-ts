import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { EducationData, EducationItem } from '../interfaces/education.interface';
import { useAppContext } from '../context/Context';
import '../assets/css/education.css';
import SchoolIcon from '@mui/icons-material/School';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

type FilterCategory = 'all' | 'degrees' | 'certifications';

const EducationTimeline: React.FC = () => {
    const { language, theme } = useAppContext();
    const [educationData, setEducationData] = useState<EducationData | null>(null);
    const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');

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

    // Helper to determine credential type
    const getCredentialBadge = (item: EducationItem): { label: string; isHighPriority: boolean } => {
        const titleLower = item.cardTitle.toLowerCase();
        if (titleLower.includes('magíster') || titleLower.includes('master')) {
            return { label: language === 'en' ? 'Master Degree' : 'Grado de Magíster', isHighPriority: true };
        }
        if (titleLower.includes('ingenier') || titleLower.includes('engineer')) {
            return { label: language === 'en' ? 'Professional Degree' : 'Título Profesional', isHighPriority: true };
        }
        if (titleLower.includes('diplomado') || titleLower.includes('diploma')) {
            return { label: language === 'en' ? 'Postgraduate Diploma' : 'Diplomado de Posgrado', isHighPriority: false };
        }
        if (titleLower.includes('data scientist') || titleLower.includes('full-stack')) {
            return { label: language === 'en' ? 'Specialization' : 'Especialización Avanzada', isHighPriority: true };
        }
        return { label: language === 'en' ? 'Certification' : 'Certificación', isHighPriority: false };
    };

    const isDegree = (item: EducationItem) => {
        const t = item.cardTitle.toLowerCase();
        return t.includes('magíster') || t.includes('master') || t.includes('ingenier') || t.includes('engineer');
    };

    const filteredContent = useMemo(() => {
        if (!educationData) return [];
        if (activeFilter === 'degrees') {
            return educationData.content.filter(item => isDegree(item));
        }
        if (activeFilter === 'certifications') {
            return educationData.content.filter(item => !isDegree(item));
        }
        return educationData.content;
    }, [educationData, activeFilter]);

    return (
        <div className={educationClass}>
            <div className="container" style={{ maxWidth: 'var(--max-w)' }}>
                {/* Header */}
                <div className="text-center mb-4">
                    <span className="section-kicker reveal">
                        <SchoolIcon sx={{ fontSize: '0.95rem', marginRight: '5px' }} />
                        Academic Journey
                    </span>
                    <h2 className="section-title reveal reveal-1">
                        {educationData?.title || (language === 'en' ? 'Education & Credentials' : 'Educación')}
                    </h2>
                    <p className="section-subtitle reveal reveal-2">
                        {language === 'en'
                            ? 'University degrees, postgraduate specializations, and advanced technical diplomas in Engineering and Data Science.'
                            : 'Títulos universitarios de pregrado y posgrado, especializaciones pedagógicas y formación técnica en Data Science y Full-Stack.'}
                    </p>

                    {/* Filter Pills */}
                    <div className="edu-filter-row reveal reveal-2">
                        <button
                            type="button"
                            className={`edu-filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
                            onClick={() => setActiveFilter('all')}
                        >
                            {language === 'en' ? 'All Credentials' : 'Todas las Credenciales'}
                        </button>
                        <button
                            type="button"
                            className={`edu-filter-btn ${activeFilter === 'degrees' ? 'active' : ''}`}
                            onClick={() => setActiveFilter('degrees')}
                        >
                            🎓 {language === 'en' ? 'Degrees & Masters' : 'Títulos & Posgrados'}
                        </button>
                        <button
                            type="button"
                            className={`edu-filter-btn ${activeFilter === 'certifications' ? 'active' : ''}`}
                            onClick={() => setActiveFilter('certifications')}
                        >
                            📜 {language === 'en' ? 'Diplomas & Tech Certifications' : 'Diplomados & Certificaciones'}
                        </button>
                    </div>
                </div>

                {/* Credentials Grid */}
                <div className="row g-4 mt-2 justify-content-center">
                    {filteredContent.map((item, index) => {
                        const credential = getCredentialBadge(item);
                        return (
                            <div key={index} className="col-12 col-md-6 col-lg-4">
                                <article
                                    className={`education-card glass ${credential.isHighPriority ? 'card-priority' : ''} reveal`}
                                    style={{ animationDelay: `${Math.min(index * 0.08, 0.4)}s` }}
                                >
                                    <div className="edu-card-top">
                                        <div className="edu-icon-badge">
                                            <img src={item.icon} alt={item.cardSubtitle} loading="lazy" />
                                        </div>
                                        <span className={`edu-type-pill ${credential.isHighPriority ? 'pill-gold' : ''}`}>
                                            <WorkspacePremiumIcon sx={{ fontSize: '0.85rem' }} />
                                            {credential.label}
                                        </span>
                                    </div>

                                    <div className="edu-card-body">
                                        <h3 className="edu-degree-title">{item.cardTitle}</h3>
                                        <h4 className="edu-institution-name">{item.cardSubtitle}</h4>
                                    </div>

                                    <div className="edu-card-footer">
                                        <span className="edu-year-pill">
                                            <CalendarTodayIcon sx={{ fontSize: '0.78rem', marginRight: '4px' }} />
                                            {item.title}
                                        </span>
                                    </div>
                                </article>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default EducationTimeline;

