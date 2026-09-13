import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Data } from '../interfaces/home.interfaces';
import '../assets/css/Home.css';
import { useAppContext } from '../context/Context';
import SocialIcons from '../components/SocialIcons';
import Typewriters from '../components/Typewriters';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DescriptionIcon from '@mui/icons-material/Description';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import VerifiedIcon from '@mui/icons-material/Verified';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import StorageIcon from '@mui/icons-material/Storage';
import PsychologyIcon from '@mui/icons-material/Psychology';

const Home: React.FC = () => {
    const { language, theme } = useAppContext();
    const [data, setData] = useState<Data | null>(null);
    const [resumeUrl, setResumeUrl] = useState<string>('https://drive.google.com/file/d/1VCEHmb_qvZMA5vTpRAAoGzt15bgO93Dh/view?usp=sharing');
    const [copiedEmail, setCopiedEmail] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const filename = language === 'en' ? 'home_en' : 'home';
                const response = await axios.get<Data>(`./json/${filename}.json`);
                setData(response.data);
            } catch (error) {
                console.error('Error al obtener los datos de Home:', error);
            }
        };

        const fetchMenuData = async () => {
            try {
                const menuFileName = language === 'en' ? 'menu_en' : 'menu';
                const response = await axios.get<{ resume: { link: string } }>(`./json/${menuFileName}.json`);
                if (response.data?.resume?.link) {
                    setResumeUrl(response.data.resume.link);
                }
            } catch (error) {
                console.error('Error al obtener el enlace del currículum:', error);
            }
        };

        fetchData();
        fetchMenuData();
    }, [language]);

    const handleCopyEmail = () => {
        if (data?.email) {
            navigator.clipboard.writeText(data.email);
            setCopiedEmail(true);
            setTimeout(() => setCopiedEmail(false), 2400);
        }
    };

    const heroClass = theme === 'dark' ? 'hero_dark' : 'hero_light';

    const tagline =
        language === 'en'
            ? 'Computer & Management Engineer with 15+ years of experience optimizing organizational workflows and internal management. Transforming institutional operations through robust systems, data analytics, and applied Artificial Intelligence.'
            : 'Ingeniero en Informática y Gestión con más de 15 años de experiencia optimizando la gestión interna y procesos operacionales. Transformo la gestión institucional y empresarial mediante desarrollo de sistemas, analítica de datos e Inteligencia Artificial aplicada.';

    const metrics = [
        {
            icon: <TrendingUpIcon sx={{ fontSize: '1.25rem', color: '#38bdf8' }} />,
            value: '+15',
            title: language === 'en' ? 'Years of Experience' : 'Años de Trayectoria',
            desc: language === 'en' ? 'IT leadership & strategic operations' : 'Liderazgo en gestión y proyectos TI',
        },
        {
            icon: <AccountTreeIcon sx={{ fontSize: '1.25rem', color: '#818cf8' }} />,
            value: 'Gestión & TI',
            title: language === 'en' ? 'Process Optimization' : 'Optimización de Procesos',
            desc: language === 'en' ? 'Workflow re-engineering & governance' : 'Reingeniería y control de gestión',
        },
        {
            icon: <StorageIcon sx={{ fontSize: '1.25rem', color: '#34d399' }} />,
            value: '12+',
            title: language === 'en' ? 'Institutional Systems' : 'Sistemas Implementados',
            desc: language === 'en' ? 'High-availability enterprise platforms' : 'Plataformas web y gestión interna',
        },
        {
            icon: <PsychologyIcon sx={{ fontSize: '1.25rem', color: '#f59e0b' }} />,
            value: 'IA & Cloud',
            title: language === 'en' ? 'Applied AI & Automation' : 'Automatización & LLMs',
            desc: language === 'en' ? 'Gemini, Qdrant & intelligent agents' : 'Gemini, Qdrant y analítica predictiva',
        },
    ];

    const techChips = [
        '✨ Gemini & LLMs',
        '⚡ React & Node',
        '🐍 Python & Flask',
        '🗄️ PostgreSQL & Qdrant',
        '☁️ Docker & GCP',
    ];

    return (
        <main className={`base ${heroClass}`}>
            <div className="hero-orb hero-orb-a" aria-hidden="true" />
            <div className="hero-orb hero-orb-b" aria-hidden="true" />
            <div className="hero-orb hero-orb-c" aria-hidden="true" />

            {data && (
                <div className="hero-container">
                    <div className="hero-grid">
                        {/* Left Column: Identity, Value Proposition & Actions */}
                        <div className="hero-col-left">
                            {/* Focus Pill Badge */}
                            <div className="hero-focus-pill reveal reveal-1">
                                <AutoGraphIcon sx={{ fontSize: '1.05rem', color: '#38bdf8' }} />
                                <span>
                                    {language === 'en'
                                        ? 'Internal Management & Applied AI Solutions'
                                        : 'Optimización de Gestión Interna & Soluciones con IA'}
                                </span>
                            </div>

                            {/* Name & Typewriter */}
                            <div className="reveal reveal-2 hero-typewriter-wrap">
                                <Typewriters name={data.name} strings={data.roles} />
                            </div>

                            {/* Strategic Tagline */}
                            <p className="hero-tagline reveal reveal-3">{tagline}</p>

                            {/* Location & Modality badge */}
                            <div className="hero-location-badge reveal reveal-3">
                                <LocationOnIcon sx={{ fontSize: '0.95rem', color: '#38bdf8' }} />
                                <span>
                                    {language === 'en'
                                        ? 'Santiago, Chile · Remote / Hybrid / On-site Projects'
                                        : 'Santiago, Chile · Proyectos Remoto / Híbrido / Presencial'}
                                </span>
                            </div>

                            {/* Call to Actions */}
                            <div className="hero-cta reveal reveal-4">
                                <Link to="/projects" className="btn-gradient">
                                    <span>{language === 'en' ? 'Explore Solutions & Systems' : 'Ver Soluciones & Sistemas'}</span>
                                    <ArrowForwardIcon sx={{ fontSize: '1.1rem' }} />
                                </Link>
                                <a
                                    href={resumeUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-cv"
                                    title={language === 'en' ? 'View Resume in PDF' : 'Ver Currículum en PDF'}
                                >
                                    <DescriptionIcon sx={{ fontSize: '1.1rem' }} />
                                    <span>{language === 'en' ? 'Download CV (PDF)' : 'Descargar CV (PDF)'}</span>
                                </a>
                                <Link to="/contact" className="btn-ghost">
                                    {language === 'en' ? 'Get in Touch' : 'Contáctame'}
                                </Link>
                            </div>

                            {/* Social Links & Quick Email Copy */}
                            <div className="hero-footer-bar reveal reveal-4">
                                <div className="hero-socials">
                                    <SocialIcons link={data.linkedin} />
                                    <SocialIcons link={data.github} />
                                </div>

                                <button
                                    type="button"
                                    onClick={handleCopyEmail}
                                    className={`copy-email-btn ${copiedEmail ? 'copied' : ''}`}
                                    title={language === 'en' ? 'Click to copy email address' : 'Clic para copiar correo'}
                                >
                                    {copiedEmail ? (
                                        <>
                                            <CheckIcon sx={{ fontSize: '1rem', color: '#10b981' }} />
                                            <span>{language === 'en' ? 'Email copied!' : '¡Correo copiado!'}</span>
                                        </>
                                    ) : (
                                        <>
                                            <ContentCopyIcon sx={{ fontSize: '0.95rem' }} />
                                            <span>{data.email}</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Right Column: Executive Profile & Strategic Impact Matrix */}
                        <div className="hero-col-right reveal reveal-2">
                            <div className="hero-spotlight-card glass">
                                {/* Profile Header Block */}
                                <div className="spotlight-header">
                                    <div className="spotlight-avatar-box">
                                        <img
                                            src="images/about/profile.jpg"
                                            alt={data.name}
                                            className="spotlight-avatar-img"
                                            loading="eager"
                                        />
                                        <span className="status-indicator-dot" title={language === 'en' ? 'Active & Consulting' : 'Activo y en Consultoría'} />
                                    </div>
                                    <div className="spotlight-meta">
                                        <div className="spotlight-name-row">
                                            <h3 className="spotlight-name">{data.name}</h3>
                                            <VerifiedIcon sx={{ fontSize: '1.15rem', color: '#38bdf8' }} titleAccess="Verified Profile" />
                                        </div>
                                        <p className="spotlight-title">
                                            {language === 'en' ? 'Senior Solutions & Process Architect' : 'Arquitecto de Soluciones & Gestión de TI'}
                                        </p>
                                        <div className="spotlight-status-pill">
                                            <span className="pulse-beacon" />
                                            <span>{language === 'en' ? 'Available for Strategic Advisory & Projects' : 'Disponible para Asesorías & Proyectos'}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Tech Focus Highlights Chips */}
                                <div className="spotlight-tech-chips">
                                    {techChips.map((chip, idx) => (
                                        <span key={idx} className="tech-chip-item">{chip}</span>
                                    ))}
                                </div>

                                {/* 2x2 Impact Matrix */}
                                <div className="spotlight-metrics-grid">
                                    {metrics.map((metric, idx) => (
                                        <div key={idx} className="spotlight-metric-tile">
                                            <div className="metric-tile-header">
                                                <div className="metric-icon-box">{metric.icon}</div>
                                                <span className="metric-tile-value">{metric.value}</span>
                                            </div>
                                            <div className="metric-tile-title">{metric.title}</div>
                                            <p className="metric-tile-desc">{metric.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
};

export default Home;
