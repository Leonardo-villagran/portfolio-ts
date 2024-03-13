import React, { useState, useEffect } from 'react';
import axios from 'axios';
import emailjs from '@emailjs/browser';
import { FormData, FormErrors, ContactData } from '../interfaces/contact.interface';

const serviceId = import.meta.env.VITE_SERVICE_ID;
const templateId = import.meta.env.VITE_TEMPLATE_ID;
const userId = import.meta.env.VITE_USER_ID;

const ContactForm: React.FC = () => {
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
                const response = await axios.get<ContactData>('./json/contact.json');
                setContactData(response.data);
            } catch (error) {
                console.error('Error fetching contact data:', error);
            }
        };

        fetchContactData();
    }, []);

    // Función para manejar cambios en los campos del formulario
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

    // Función para manejar el envío del formulario
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        // Validación del formulario
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

        // Si hay errores, detener el envío del formulario
        if (Object.values(errors).some(error => error !== '')) {
            setSubmitting(false);
            setSubmitError(true);
            setSubmitSuccess(false); // Borrar mensaje de éxito si existe
            return;
        }

        // Envío del formulario con emailjs
        emailjs.send(serviceId, templateId, {
            from_name: formData.userName,
            reply_to: formData.email,
            message: formData.message,
        }, userId)
            .then((response: unknown) => {
                setSubmitting(false);
                setSubmitSuccess(true);
                setFormErrors({ userName: '', email: '', message: '' }); // Restablecer errores
                setSubmitError(false); // Borrar mensaje de error si existe
                console.log('Email sent:', response);
            })
            .catch((error: Error) => {
                setSubmitting(false);
                setSubmitError(true);
                setSubmitSuccess(false); // Borrar mensaje de éxito si existe
                console.error('Error sending email:', error);
            });
    };

    // Función para validar el formato del correo electrónico
    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    return (
        <div className="container">
            <h2 className="text-center">{contactData && contactData.title}</h2>
            <div className="card bg-dark text-white">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="userName">{contactData && contactData.name}</label>
                            <input type="text" className="form-control" id="userName" name="userName" value={formData.userName} onChange={handleChange} />
                            {submitError && <div className="invalid-feedback">{formErrors.userName}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">{contactData?.email}</label>
                            <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} />
                            {submitError && <div className="invalid-feedback">{formErrors.email}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">{contactData && contactData.message}</label>
                            <textarea className="form-control" id="message" name="message" rows={5} value={formData.message} onChange={handleChange} />
                            {submitError && <div className="invalid-feedback">{formErrors.message}</div>}
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={submitting}>{submitting ? (contactData && contactData.sending) : (contactData && contactData.button)}</button>
                    </form>
                    {submitSuccess && <div className="alert alert-success">{contactData && contactData.success_message}</div>}
                    {submitError && <div className="alert alert-danger">{contactData && contactData.danger_message}</div>}
                </div>
            </div>
        </div>
    );
};

export default ContactForm;
