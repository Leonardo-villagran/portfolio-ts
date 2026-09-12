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

const Home: React.FC = () => {
    const { language, theme } = useAppContext();
    const [data, setData] = useState<Data | null>(null);
    const [resumeUrl, setResumeUrl] = useState<string>('https://drive.google.com/file/d/110ocegbjrCCNXBCh72ALDjTYxquBf-6L/view');
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

    return (
        <main className={`base ${heroClass}`}>
            <div className="hero-orb hero-orb-a" aria-hidden="true" />
            <div className="hero-orb hero-orb-b" aria-hidden="true" />
            <div className="hero-orb hero-orb-c" aria-hidden="true" />

            {data && (
                <div className="hero-content-wrapper">
                    {/* Top Focus & Avatar Group */}
                    <div className="hero-header-badge reveal reveal-1">
                        <div className="hero-avatar-container">
                            <img
                                src="images/about/profile.jpg"
                                alt={data.name}
                                className="hero-avatar-img"
                                loading="eager"
                            />
                        </div>

                        <div className="hero-focus-pill">
                            <AutoGraphIcon sx={{ fontSize: '1.05rem', color: '#38bdf8' }} />
                            <span>
                                {language === 'en'
                                    ? 'Internal Management & Applied AI Solutions'
                                    : 'Optimización de Gestión Interna & Soluciones con IA'}
                            </span>
                        </div>
                    </div>

                    {/* Main Name & Roles Typewriter */}
                    <div className="reveal reveal-2 mt-1">
                        <Typewriters name={data.name} strings={data.roles} />
                    </div>

                    {/* Strategic Pitch */}
                    <p className="hero-tagline reveal reveal-3">{tagline}</p>

                    {/* Location & Modality badge */}
                    <div className="hero-location-badge reveal reveal-3">
                        <LocationOnIcon sx={{ fontSize: '1rem', color: '#38bdf8' }} />
                        <span>
                            {language === 'en'
                                ? 'Santiago, Chile · Remote / Hybrid / On-site Projects'
                                : 'Santiago, Chile · Proyectos Remoto / Híbrido / Presencial'}
                        </span>
                    </div>

                    {/* Strategic Stats Strip */}
                    <div className="stats-strip reveal reveal-3">
                        <div className="stat-item">
                            <div className="stat-value">+15</div>
                            <p className="stat-label">
                                {language === 'en' ? 'Years of Experience' : 'Años de Trayectoria'}
                            </p>
                        </div>
                        <div className="stat-item">
                            <div className="stat-value">Gestión & TI</div>
                            <p className="stat-label">
                                {language === 'en' ? 'Process Optimization' : 'Optimización de Procesos'}
                            </p>
                        </div>
                        <div className="stat-item">
                            <div className="stat-value">12+</div>
                            <p className="stat-label">
                                {language === 'en' ? 'Institutional Systems' : 'Sistemas Implementados'}
                            </p>
                        </div>
                        <div className="stat-item">
                            <div className="stat-value">IA & Cloud</div>
                            <p className="stat-label">
                                {language === 'en' ? 'Automation & Gemini' : 'Automatización & Gemini'}
                            </p>
                        </div>
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

                    {/* Social links & Email quick copy */}
                    <div className="hero-footer-bar reveal reveal-4">
                        <div className="hero-socials">
                            <SocialIcons link={data.linkedin} />
                            <SocialIcons link={data.github} />
                        </div>

                        {/* Quick Copy Email Button */}
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
            )}
        </main>
    );
};

export default Home;

