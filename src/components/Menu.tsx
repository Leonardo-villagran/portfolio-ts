import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import axios from 'axios';
import { MenuItem } from '../interfaces/menu.interface';
import '../assets/css/Menu.css';
import { useAppContext } from '../context/Context';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import DescriptionIcon from '@mui/icons-material/Description';
import LanguageIcon from '@mui/icons-material/Language';

const Menu: React.FC = () => {
    const { language, setLanguage } = useAppContext();
    const [menuData, setMenuData] = useState<MenuItem | null>(null);
    const [expanded, setExpanded] = useState<boolean>(false);
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
                    setShowMenu(Boolean(spanish && english));
                }
            } catch (error) {
                console.error('Error fetching app config:', error);
            }
        };

        getAppConfig();
    }, []);

    const handleLanguageChange = (lang: string) => {
        setLanguage(lang);
        localStorage.setItem('language', lang);
        setExpanded(false);
    };

    const closeMenu = () => setExpanded(false);

    if (!menuData) {
        return null;
    }

    return (
        <header className="sticky-top">
            <Navbar
                expand="lg"
                expanded={expanded}
                onToggle={(value: boolean) => setExpanded(value)}
                className="premium-nav"
                variant="dark"
            >
                <Container>
                    <Navbar.Brand as={Link} to="/" onClick={closeMenu} className="nav-brand-group" aria-label="Home">
                        <div className="nav-avatar-ring">
                            <span className="nav-monogram">LV</span>
                        </div>
                        <div className="nav-brand-text">
                            <span className="nav-brand-name">Leonardo Villagrán</span>
                            <span className="nav-brand-role">
                                {language === 'en' ? 'Management, IT & AI' : 'Gestión Interna, TI & IA'}
                            </span>
                        </div>
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="navbarNav" className="nav-toggler-custom" />
                    <Navbar.Collapse id="navbarNav">
                        <Nav className="ms-auto align-items-lg-center nav-links-wrap">
                            <Nav.Link as={NavLink} to="/" end onClick={closeMenu}>
                                {menuData.home}
                            </Nav.Link>
                            <Nav.Link as={NavLink} to="/about" onClick={closeMenu}>
                                {menuData.about}
                            </Nav.Link>
                            <Nav.Link as={NavLink} to="/skills" onClick={closeMenu}>
                                {menuData.skills}
                            </Nav.Link>
                            <Nav.Link as={NavLink} to="/experiences" onClick={closeMenu}>
                                {menuData.experiences}
                            </Nav.Link>
                            <Nav.Link as={NavLink} to="/education" onClick={closeMenu}>
                                {menuData.education}
                            </Nav.Link>
                            <Nav.Link as={NavLink} to="/projects" onClick={closeMenu}>
                                {menuData.projects}
                            </Nav.Link>
                            <Nav.Link as={NavLink} to="/contact" onClick={closeMenu}>
                                {menuData.contact}
                            </Nav.Link>
                            
                            {/* Prominent CV Action Button */}
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={menuData.resume.link}
                                className="nav-cv-btn"
                                onClick={closeMenu}
                                title={language === 'en' ? 'Download / View CV' : 'Descargar / Ver Currículum'}
                            >
                                <DescriptionIcon sx={{ fontSize: '1.05rem' }} />
                                <span>{menuData.resume.title}</span>
                            </a>
                        </Nav>

                        {/* Language Dropdown */}
                        {showMenu && (
                            <div className="nav-lang-wrap ms-lg-2 mt-3 mt-lg-0">
                                <NavDropdown
                                    title={
                                        <span className="nav-lang-trigger">
                                            <LanguageIcon sx={{ fontSize: '1.05rem', marginRight: '5px' }} />
                                            {language === 'es' ? 'ES' : 'EN'}
                                        </span>
                                    }
                                    id="language-dropdown"
                                    align="end"
                                    className="nav-lang-dropdown"
                                >
                                    <NavDropdown.Item
                                        active={language === 'es'}
                                        onClick={() => handleLanguageChange('es')}
                                    >
                                        🇨🇱 Español (ES)
                                    </NavDropdown.Item>
                                    <NavDropdown.Item
                                        active={language === 'en'}
                                        onClick={() => handleLanguageChange('en')}
                                    >
                                        🇺🇸 English (EN)
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </div>
                        )}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Menu;

