import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { MenuItem } from '../interfaces/menu.interface';
import '../assets/css/Menu.css';
import { useAppContext } from '../context/Context';
import {Form} from 'react-bootstrap';

const Menu: React.FC = () => {
    const { language, setLanguage, theme, setTheme } = useAppContext();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [menuData, setMenuData] = useState<MenuItem | null>(null);
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [showMenu, setShowMenu] = useState<boolean>(false);
    
    useEffect(() => {
        const fetchMenuData = async () => {
            try {
                const menuFileName = language === 'en' ? 'menu_en' : 'menu';
                const response = await axios.get<MenuItem>(`./json/${menuFileName}.json`);
                setMenuData(response.data);
            } catch (error) {
                console.error('Error fetching menu data:', error);
            }
        };

        fetchMenuData();
    }, [language]);

    useEffect(() => {
        const getAppConfig = async () => {
            try {
                const response = await fetch('./json/app.json');
                const appConfig = await response.json();
                if (appConfig && appConfig.portfolioLanguages) {
                    const { spanish, english } = appConfig.portfolioLanguages;
                    if (spanish && english) {
                        setShowMenu(true);
                    } else {
                        setShowMenu(false);
                    }
                }
            } catch (error) {
                console.error('Error fetching app config:', error);
            }
        };

        getAppConfig();
    }, []);



    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleLanguageChange = (lang: string) => {
        setLanguage(lang);
        setDropdownOpen(false);
        localStorage.setItem('language', lang);
    };

    const handleToggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme); // Actualiza el tema en el localStorage
    };
    
    if (!menuData) {
        return <div>Loading...</div>;
    }
    console.log('theme:', theme);
    console.log('stored theme:', localStorage.getItem('theme'));

    return (

        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <Link className="navbar-brand"to="/">Home</Link>
                <button className="navbar-toggler" type="button" onClick={toggleMenu} aria-expanded={menuOpen ? 'true' : 'false'}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`} id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to={`/about`}>{menuData.about}</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={`/skills`}>{menuData.skills}</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={`/education`}>{menuData.education}</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={`/experiences`}>{menuData.experiences}</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={`/projects`}>{menuData.projects}</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={`/contact`}>{menuData.contact}</Link>
                        </li>
                        <li className="nav-item">
                            <a target="_blank" rel="noopener noreferrer" href={menuData.resume.link}>{menuData.resume.title}</a>
                        </li>
                        <li className="nav-item">
                        <Form.Check
                            type="switch"
                            id="mySwitch"
                            checked={theme === "dark"} // Establece el estado del switch según el tema actual
                            onChange={handleToggleTheme} // Manejador para cambiar el tema cuando se activa el switch
                            className="ms-4 mt-2" // Agrega una clase personalizada al switch
                        />
                        </li>
                    </ul>
                    {showMenu &&
                        <div className="ml-auto">
                            <button className="btn btn-secondary dropdown-toggle" type="button" onClick={toggleDropdown} aria-expanded={dropdownOpen ? 'true' : 'false'}>
                                {language === 'es' ? 'Español' : 'English'}
                            </button>
                            <ul className={`dropdown-menu dropdown-menu-end ${dropdownOpen ? 'show' : ''}`} aria-labelledby="dropdownMenuButton">
                                <li><button className="dropdown-item" onClick={() => handleLanguageChange('es')}>Español</button></li>
                                <li><button className="dropdown-item" onClick={() => handleLanguageChange('en')}>English</button></li>
                            </ul>

                        </div>}
                </div>
            </div>
        </nav>

    );
};

export default Menu;
