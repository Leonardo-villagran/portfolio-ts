import React, { useState, useEffect } from 'react';
import axios from 'axios';
import emailjs from '@emailjs/browser';
import { FormData, FormErrors, ContactData } from '../interfaces/contact.interface';
import { useAppContext } from '../context/Context';
import '../assets/css/contact.css';

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

        fetchContactData();
    }, [language]);

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
                <div className="text-center">
                    <span className="section-kicker reveal">Contact</span>
                    <h2 className="section-title reveal reveal-1">{contactData && contactData.title}</h2>
                </div>
                <div className="contact-card mt-4 reveal reveal-2">
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="form-group">
                            <label htmlFor="userName">{contactData && contactData.name}</label>
                            <input type="text" className="form-control" id="userName" name="userName" value={formData.userName} onChange={handleChange} placeholder={contactData?.name ?? ''} />
                            {formErrors.userName && <div className="text-danger small mt-1">{formErrors.userName}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">{contactData?.email}</label>
                            <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@email.com" />
                            {formErrors.email && <div className="text-danger small mt-1">{formErrors.email}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">{contactData && contactData.message}</label>
                            <textarea className="form-control" id="message" name="message" rows={5} value={formData.message} onChange={handleChange} />
                            {formErrors.message && <div className="text-danger small mt-1">{formErrors.message}</div>}
                        </div>
                        <button type="submit" className="btn-gradient contact-submit" disabled={submitting}>
                            {submitting ? (contactData && contactData.sending) : (contactData && contactData.button)}
                        </button>
                    </form>
                    {submitSuccess && <div className="alert alert-success mt-3 mb-0">{contactData && contactData.success_message}</div>}
                    {submitError && <div className="alert alert-danger mt-3 mb-0">{contactData && contactData.danger_message}</div>}
                </div>
            </div>
        </div>
    );
};

export default ContactForm;
