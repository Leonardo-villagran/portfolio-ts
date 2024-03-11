// Interfaz para los datos del formulario
export interface FormData {
    userName: string;
    email: string;
    message: string;
}

// Interfaz para los errores del formulario
export interface FormErrors {
    userName: string;
    email: string;
    message: string;
}

// Interfaz para los datos de contacto
export interface ContactData {
    title: string;
    name: string;
    email: string;
    message: string;
    button: string;
    sending: string;
    user_name_error: string;
    user_email_error: string;
    user_email_error_valid: string;
    error_message: string;
    success_message: string;
    danger_message: string;
    response_success: string;
    response_error: string;
}