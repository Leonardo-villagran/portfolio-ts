import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { MenuItem } from '../interfaces/menu.interface';
import '../assets/css/Menu.css';

const Menu: React.FC = () => {
    const [menuData, setMenuData] = useState<MenuItem | null>(null);
    const [menuOpen, setMenuOpen] = useState<boolean>(false); // Estado para controlar la visibilidad del menú

    useEffect(() => {
        const fetchMenuData = async () => {
            try {
                const response = await axios.get<MenuItem>('./json/menu.json');
                setMenuData(response.data);
            } catch (error) {
                console.error('Error fetching menu data:', error);
            }
        };

        fetchMenuData();
    }, []);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen); // Cambiar el estado del menú cuando se haga clic en la hamburguesa
    };

    if (!menuData) {
        return <div>Loading...</div>;
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="/react-ts-portfolio/">{menuData.home}</a>
                <button className="navbar-toggler" type="button" onClick={toggleMenu} aria-expanded={menuOpen ? 'true' : 'false'}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`} id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/react-ts-portfolio/about">{menuData.about}</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/react-ts-portfolio/skills">{menuData.skills}</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/react-ts-portfolio/education">{menuData.education}</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/react-ts-portfolio/experiences">{menuData.experiences}</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/react-ts-portfolio/projects">{menuData.projects}</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/react-ts-portfolio/contact">{menuData.contact}</Link>
                        </li>
                        <li className="nav-item">
                            <a target="_blank" rel="noopener noreferrer" href={menuData.resume.link}>{menuData.resume.title}</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Menu;

