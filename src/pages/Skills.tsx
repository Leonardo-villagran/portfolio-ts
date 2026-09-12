import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { TechSkill } from '../interfaces/skills.interface';
import '../assets/css/Skills.css';
import { useAppContext } from '../context/Context';
import CodeIcon from '@mui/icons-material/Code';
import TerminalIcon from '@mui/icons-material/Terminal';
import StorageIcon from '@mui/icons-material/Storage';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import PsychologyIcon from '@mui/icons-material/Psychology';

const Skills: React.FC = () => {
    const { language, theme } = useAppContext();
    const [techStackData, setTechStackData] = useState<TechSkill | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    useEffect(() => {
        const fetchTechStackData = async () => {
            try {
                const filename = language === 'en' ? 'skills_en' : 'skills';
                const response = await axios.get<TechSkill>(`./json/${filename}.json`);
                setTechStackData(response.data);
            } catch (error) {
                console.error('Error fetching tech stack data:', error);
            }
        };

        fetchTechStackData();
    }, [language]);

    const skillClass = theme === 'dark' ? 'skill_dark section-shell theme-dark' : 'skill_light section-shell theme-light';

    // Core strategic competencies
    const coreCompetencies = [
        {
            icon: <CodeIcon sx={{ fontSize: '1.8rem', color: '#38bdf8' }} />,
            title: language === 'en' ? 'Internal Management Optimization' : 'Optimización de Gestión Interna',
            desc: language === 'en'
                ? 'Process re-engineering, administrative workflow automation, operational control, and data governance.'
                : 'Reingeniería de procesos, automatización de flujos operativos, control de gestión institucional y gobernanza de datos.',
        },
        {
            icon: <PsychologyIcon sx={{ fontSize: '1.8rem', color: '#818cf8' }} />,
            title: language === 'en' ? 'Applied AI & Automation' : 'Inteligencia Artificial & Automatización',
            desc: language === 'en'
                ? 'Generative AI integration (Gemini, LLMs), prompt engineering, automated assistants, and predictive analytics.'
                : 'Integración de IA generativa (Gemini, LLMs), ingeniería de prompts, asistentes inteligentes y analítica predictiva.',
        },
        {
            icon: <CloudQueueIcon sx={{ fontSize: '1.8rem', color: '#34d399' }} />,
            title: language === 'en' ? 'Enterprise Systems & Cloud' : 'Sistemas Institucionales & Cloud',
            desc: language === 'en'
                ? 'Full-stack platform architecture (React, Node, Python), secure APIs, relational/NoSQL DBs, and Docker/GCP.'
                : 'Arquitectura de plataformas integradas (React, Node, Python), APIs seguras, bases relacionales/NoSQL y despliegue Docker/GCP.',
        },
        {
            icon: <TerminalIcon sx={{ fontSize: '1.8rem', color: '#f59e0b' }} />,
            title: language === 'en' ? 'Leadership & Change Management' : 'Liderazgo & Gestión del Cambio',
            desc: language === 'en'
                ? 'Cross-functional IT leadership, Master in Education applied to training, digital adoption, and continuous improvement.'
                : 'Liderazgo de equipos multidisciplinarios, formación y docencia tecnológica, adopción de herramientas digitales y mejora continua.',
        },
    ];

    const displayedCategories = useMemo(() => {
        if (!techStackData) return [];
        if (selectedCategory === 'all') return techStackData.skills;
        if (selectedCategory === 'ai') {
            return techStackData.skills.filter(cat =>
                cat.title.toLowerCase().includes('artificial') ||
                cat.title.toLowerCase().includes('ia') ||
                cat.title.toLowerCase().includes('intelligence') ||
                cat.title.toLowerCase().includes('llm')
            );
        }
        if (selectedCategory === 'lang') {
            return techStackData.skills.filter(cat =>
                cat.title.toLowerCase().includes('lenguaje') ||
                cat.title.toLowerCase().includes('language')
            );
        }
        if (selectedCategory === 'db') {
            return techStackData.skills.filter(cat =>
                cat.title.toLowerCase().includes('base') ||
                cat.title.toLowerCase().includes('database')
            );
        }
        if (selectedCategory === 'framework') {
            return techStackData.skills.filter(cat =>
                cat.title.toLowerCase().includes('framework')
            );
        }
        if (selectedCategory === 'tools') {
            return techStackData.skills.filter(cat =>
                cat.title.toLowerCase().includes('herramient') ||
                cat.title.toLowerCase().includes('tool') ||
                cat.title.toLowerCase().includes('cloud')
            );
        }
        return techStackData.skills.filter(cat => cat.title.toLowerCase().includes(selectedCategory.toLowerCase()));
    }, [techStackData, selectedCategory]);

    return (
        <div className={skillClass}>
            <div className="container" style={{ maxWidth: 'var(--max-w)' }}>
                {/* Header */}
                <div className="text-center mb-4">
                    <span className="section-kicker reveal">
                        <StorageIcon sx={{ fontSize: '0.9rem', marginRight: '5px' }} />
                        Tech Arsenal
                    </span>
                    <h2 className="section-title reveal reveal-1">
                        {techStackData?.title || (language === 'en' ? 'Technical Stack' : 'Stack Tecnológico')}
                    </h2>
                    <p className="section-subtitle reveal reveal-2">
                        {techStackData?.intro || (language === 'en'
                            ? 'A comprehensive overview of languages, frameworks, cloud tools, and core engineering competencies.'
                            : 'Lenguajes de programación, frameworks, plataformas cloud y competencias clave de ingeniería de software.')}
                    </p>

                    {/* Filter Category Row */}
                    <div className="skills-filter-row reveal reveal-2">
                        <button
                            type="button"
                            className={`skills-filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
                            onClick={() => setSelectedCategory('all')}
                        >
                            {language === 'en' ? 'All' : 'Todas'}
                        </button>
                        <button
                            type="button"
                            className={`skills-filter-btn ${selectedCategory === 'ai' ? 'active' : ''}`}
                            onClick={() => setSelectedCategory('ai')}
                        >
                            {language === 'en' ? '✨ AI & LLMs' : '✨ IA & LLMs'}
                        </button>
                        <button
                            type="button"
                            className={`skills-filter-btn ${selectedCategory === 'lang' ? 'active' : ''}`}
                            onClick={() => setSelectedCategory('lang')}
                        >
                            {language === 'en' ? 'Languages' : 'Lenguajes'}
                        </button>
                        <button
                            type="button"
                            className={`skills-filter-btn ${selectedCategory === 'db' ? 'active' : ''}`}
                            onClick={() => setSelectedCategory('db')}
                        >
                            {language === 'en' ? 'Databases' : 'Bases de Datos'}
                        </button>
                        <button
                            type="button"
                            className={`skills-filter-btn ${selectedCategory === 'framework' ? 'active' : ''}`}
                            onClick={() => setSelectedCategory('framework')}
                        >
                            {language === 'en' ? 'Frameworks' : 'Frameworks'}
                        </button>
                        <button
                            type="button"
                            className={`skills-filter-btn ${selectedCategory === 'tools' ? 'active' : ''}`}
                            onClick={() => setSelectedCategory('tools')}
                        >
                            {language === 'en' ? 'Cloud & Tools' : 'Herramientas & Cloud'}
                        </button>
                    </div>
                </div>

                {/* Tech Stack Categories Grid */}
                {techStackData && (
                    <div className="skills-categories-wrapper">
                        {displayedCategories.map((category, index) => (
                            <section key={index} className="skills-category-panel glass reveal">
                                <h3 className="category-header-title">
                                    <span className="category-bullet" />
                                    {category.title}
                                </h3>

                                <div className="row g-3 justify-content-center pt-3">
                                    {category.items.map((item, itemIndex) => (
                                        <div key={itemIndex} className="col-6 col-sm-4 col-md-3 col-lg-2">
                                            <div className="skill-tile">
                                                <div className="skill-icon-wrap">
                                                    <img
                                                        src={item.icon}
                                                        className="skill-icon"
                                                        alt={item.title}
                                                        loading="lazy"
                                                    />
                                                </div>
                                                <p className="skill-name">{item.title}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        ))}
                    </div>
                )}

                {/* Core Competencies for Hiring Managers */}
                <div className="core-competencies-section mt-5 reveal">
                    <div className="text-center mb-4">
                        <span className="section-kicker">{language === 'en' ? 'Core Pillars' : 'Pilares Estratégicos'}</span>
                        <h3 className="competencies-title">
                            {language === 'en' ? 'Strategic Value for Organizations & Teams' : 'Valor Estratégico para Organizaciones & Equipos'}
                        </h3>
                    </div>

                    <div className="row g-4">
                        {coreCompetencies.map((comp, idx) => (
                            <div key={idx} className="col-12 col-md-6 col-lg-3">
                                <div className="competency-card glass">
                                    <div className="comp-icon-box">{comp.icon}</div>
                                    <h4 className="comp-title">{comp.title}</h4>
                                    <p className="comp-desc">{comp.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Skills;

