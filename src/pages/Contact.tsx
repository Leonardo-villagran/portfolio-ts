import React, { useState, useEffect } from 'react';
import axios from 'axios';
import emailjs from '@emailjs/browser';
import { FormData, FormErrors, ContactData } from '../interfaces/contact.interface';
import { useAppContext } from '../context/Context';
import '../assets/css/contact.css';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import SendIcon from '@mui/icons-material/Send';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import DescriptionIcon from '@mui/icons-material/Description';

const serviceId = import.meta.env.VITE_SERVICE_ID;
const templateId = import.meta.env.VITE_TEMPLATE_ID;
const userId = import.meta.env.VITE_USER_ID;

const ContactForm: React.FC = () => {
    const { language, theme } = useAppContext();

    const [formData, setFormData] = useState<FormData>({
        userName: '',
        email: '',
        message: '',
    });
    const [formErrors, setFormErrors] = useState<FormErrors>({
        userName: '',
        email: '',
        message: '',
    });
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
    const [submitError, setSubmitError] = useState<boolean>(false);
    const [contactData, setContactData] = useState<ContactData | null>(null);
    const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
    const [resumeUrl, setResumeUrl] = useState<string>('https://drive.google.com/file/d/110ocegbjrCCNXBCh72ALDjTYxquBf-6L/view');

    useEffect(() => {
        const fetchContactData = async () => {
            try {
                const filename = language === 'en' ? 'contact_en' : 'contact';
                const response = await axios.get<ContactData>(`./json/${filename}.json`);
                setContactData(response.data);
            } catch (error) {
                console.error('Error fetching contact data:', error);
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
                console.error('Error fetching menu data:', error);
            }
        };

        fetchContactData();
        fetchMenuData();
    }, [language]);

    const handleCopyEmail = () => {
        navigator.clipboard.writeText('leonardovillagranchicago@gmail.com');
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2400);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        setFormErrors({
            ...formErrors,
            [name]: '',
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        const errors: FormErrors = { userName: '', email: '', message: '' };

        if (!formData.userName) {
            errors.userName = contactData?.user_name_error || '';
        }
        if (!formData.email) {
            errors.email = contactData?.user_email_error || '';
        } else if (!isValidEmail(formData.email)) {
            errors.email = contactData?.user_email_error_valid || '';
        }
        if (!formData.message) {
            errors.message = contactData?.error_message || '';
        }

        setFormErrors(errors);

        if (Object.values(errors).some(error => error !== '')) {
            setSubmitting(false);
            setSubmitError(true);
            setSubmitSuccess(false);
            return;
        }

        emailjs.send(serviceId, templateId, {
            user_name: formData.userName,
            user_email: formData.email,
            message: formData.message,
        }, userId)
            .then((response: unknown) => {
                setSubmitting(false);
                setSubmitSuccess(true);
                setFormErrors({ userName: '', email: '', message: '' });
                setSubmitError(false);
                setFormData({ userName: '', email: '', message: '' });
                console.log('Email sent:', response);
            })
            .catch((error: Error) => {
                setSubmitting(false);
                setSubmitError(true);
                setSubmitSuccess(false);
                console.error('Error sending email:', error);
            });
    };

    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const contactClass = theme === 'dark' ? 'contact_dark section-shell theme-dark' : 'contact_light section-shell theme-light';

    return (
        <div className={contactClass}>
            <div className="container" style={{ maxWidth: 'var(--max-w)' }}>
                {/* Header */}
                <div className="text-center mb-5">
                    <span className="section-kicker reveal">
                        <EmailIcon sx={{ fontSize: '0.9rem', marginRight: '4px' }} />
                        Get in Touch
                    </span>
                    <h2 className="section-title reveal reveal-1">{contactData && contactData.title}</h2>
                    <p className="section-subtitle reveal reveal-2">
                        {language === 'en'
                            ? "Have an operational management challenge, an IT initiative, or want to transform processes with AI? Let's connect directly."
                            : '¿Tienes un desafío de gestión interna, un proyecto tecnológico o buscas transformar procesos con IA? Conversemos directamente.'}
                    </p>
                </div>

                {/* 2-Column Grid: Direct Channels (Left) + Form (Right) */}
                <div className="row g-4 align-items-stretch">
                    {/* Left Column: Direct Strategic Contact Card */}
                    <div className="col-12 col-lg-5">
                        <div className="direct-contact-panel glass h-100 reveal reveal-2">
                            <h3 className="direct-contact-heading">
                                {language === 'en' ? 'Direct Channels' : 'Canales Directos'}
                            </h3>
                            <p className="direct-contact-desc">
                                {language === 'en'
                                    ? 'Feel free to reach out directly via email or LinkedIn for fast response times.'
                                    : 'Puedes contactarme de inmediato por correo o LinkedIn. Respuesta garantizada en menos de 24h.'}
                            </p>

                            {/* Email Card with Copy Button */}
                            <div className="direct-channel-item">
                                <div className="channel-icon-box">
                                    <EmailIcon sx={{ color: '#38bdf8', fontSize: '1.25rem' }} />
                                </div>
                                <div className="channel-meta">
                                    <span className="channel-label">Email</span>
                                    <span className="channel-value">leonardovillagranchicago@gmail.com</span>
                                </div>
                                <button
                                    type="button"
                                    onClick={handleCopyEmail}
                                    className={`channel-copy-btn ${copiedEmail ? 'copied' : ''}`}
                                    title={language === 'en' ? 'Copy email' : 'Copiar correo'}
                                >
                                    {copiedEmail ? (
                                        <CheckIcon sx={{ fontSize: '1rem', color: '#10b981' }} />
                                    ) : (
                                        <ContentCopyIcon sx={{ fontSize: '0.95rem' }} />
                                    )}
                                </button>
                            </div>

                            {/* LinkedIn Direct */}
                            <a
                                href="https://www.linkedin.com/in/leonardo-villagran/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="direct-channel-link"
                            >
                                <div className="channel-icon-box linkedin-box">
                                    <LinkedInIcon sx={{ color: '#0a66c2', fontSize: '1.25rem' }} />
                                </div>
                                <div className="channel-meta">
                                    <span className="channel-label">LinkedIn</span>
                                    <span className="channel-value">in/leonardo-villagran ↗</span>
                                </div>
                            </a>

                            {/* GitHub Direct */}
                            <a
                                href="https://github.com/Leonardo-villagran"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="direct-channel-link"
                            >
                                <div className="channel-icon-box github-box">
                                    <GitHubIcon sx={{ color: '#ffffff', fontSize: '1.25rem' }} />
                                </div>
                                <div className="channel-meta">
                                    <span className="channel-label">GitHub</span>
                                    <span className="channel-value">github.com/Leonardo-villagran ↗</span>
                                </div>
                            </a>

                            {/* Location & Speed Highlights */}
                            <div className="direct-badges-group mt-4">
                                <div className="direct-badge-item">
                                    <LocationOnIcon sx={{ fontSize: '1rem', color: '#38bdf8' }} />
                                    <span>
                                        {language === 'en'
                                            ? 'Santiago, Chile · Remote / Hybrid / On-site'
                                            : 'Santiago, Chile · Remoto / Híbrido / Presencial'}
                                    </span>
                                </div>
                                <div className="direct-badge-item">
                                    <FlashOnIcon sx={{ fontSize: '1rem', color: '#f59e0b' }} />
                                    <span>
                                        {language === 'en'
                                            ? 'Average response time: < 24 hours'
                                            : 'Tiempo habitual de respuesta: < 24 horas'}
                                    </span>
                                </div>
                            </div>

                            {/* CV Button */}
                            <div className="mt-4 pt-3 border-top border-secondary-subtle">
                                <a
                                    href={resumeUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-cv w-100 text-center"
                                >
                                    <DescriptionIcon sx={{ fontSize: '1.1rem', marginRight: '6px' }} />
                                    <span>{language === 'en' ? 'Download CV / Resume (PDF)' : 'Descargar Currículum Vitae (PDF)'}</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Polished Contact Form */}
                    <div className="col-12 col-lg-7">
                        <div className="contact-form-panel glass h-100 reveal reveal-3">
                            <form onSubmit={handleSubmit} noValidate>
                                <div className="form-group mb-3">
                                    <label htmlFor="userName" className="form-label-custom">
                                        {contactData && contactData.name}
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control form-control-custom"
                                        id="userName"
                                        name="userName"
                                        value={formData.userName}
                                        onChange={handleChange}
                                        placeholder={contactData?.name ?? 'Tu nombre completo'}
                                    />
                                    {formErrors.userName && <div className="text-danger small mt-1">{formErrors.userName}</div>}
                                </div>

                                <div className="form-group mb-3">
                                    <label htmlFor="email" className="form-label-custom">
                                        {contactData?.email}
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control form-control-custom"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder={language === 'en' ? 'your.name@company.com' : 'tu.correo@empresa.com'}
                                    />
                                    {formErrors.email && <div className="text-danger small mt-1">{formErrors.email}</div>}
                                </div>

                                <div className="form-group mb-4">
                                    <label htmlFor="message" className="form-label-custom">
                                        {contactData && contactData.message}
                                    </label>
                                    <textarea
                                        className="form-control form-control-custom"
                                        id="message"
                                        name="message"
                                        rows={5}
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder={
                                            language === 'en'
                                                ? 'Tell me about your project, management challenge, or idea...'
                                                : 'Cuéntame sobre tu proyecto, desafío de gestión interna o idea...'
                                        }
                                    />
                                    {formErrors.message && <div className="text-danger small mt-1">{formErrors.message}</div>}
                                </div>

                                <button type="submit" className="btn-gradient w-100 py-3" disabled={submitting}>
                                    {submitting ? (
                                        <span>{contactData && contactData.sending}</span>
                                    ) : (
                                        <>
                                            <span>{contactData && contactData.button}</span>
                                            <SendIcon sx={{ fontSize: '1.05rem', marginLeft: '6px' }} />
                                        </>
                                    )}
                                </button>
                            </form>

                            {submitSuccess && (
                                <div className="alert alert-success mt-3 mb-0 text-center animate-fade-in">
                                    {contactData && contactData.success_message}
                                </div>
                            )}
                            {submitError && (
                                <div className="alert alert-danger mt-3 mb-0 text-center animate-fade-in">
                                    {contactData && contactData.danger_message}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactForm;

