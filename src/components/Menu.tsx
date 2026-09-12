import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import axios from 'axios';
import { MenuItem } from '../interfaces/menu.interface';
import '../assets/css/Menu.css';
import { useAppContext } from '../context/Context';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import HomeIcon from '@mui/icons-material/Home';

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
        <div className="sticky-top">
            <Navbar
                expand="lg"
                expanded={expanded}
                onToggle={(value: boolean) => setExpanded(value)}
                className="premium-nav"
                variant="dark"
            >
                <Container>
                    <Navbar.Brand as={Link} to="/" onClick={closeMenu} className="nav-brand" aria-label="Home">
                        <HomeIcon fontSize="medium" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarNav" />
                    <Navbar.Collapse id="navbarNav">
                        <Nav className="me-auto align-items-lg-center">
                            <Nav.Link as={NavLink} to="/about" onClick={closeMenu}>{menuData.about}</Nav.Link>
                            <Nav.Link as={NavLink} to="/skills" onClick={closeMenu}>{menuData.skills}</Nav.Link>
                            <Nav.Link as={NavLink} to="/education" onClick={closeMenu}>{menuData.education}</Nav.Link>
                            <Nav.Link as={NavLink} to="/experiences" onClick={closeMenu}>{menuData.experiences}</Nav.Link>
                            <Nav.Link as={NavLink} to="/projects" onClick={closeMenu}>{menuData.projects}</Nav.Link>
                            <Nav.Link as={NavLink} to="/contact" onClick={closeMenu}>{menuData.contact}</Nav.Link>
                            <Nav.Link
                                target="_blank"
                                rel="noopener noreferrer"
                                href={menuData.resume.link}
                                className="resume-link"
                            >
                                {menuData.resume.title} ↗
                            </Nav.Link>
                        </Nav>
                        <Nav className="align-items-lg-center gap-2 mt-3 mt-lg-0">
                            {showMenu && (
                                <NavDropdown
                                    title={language === 'es' ? 'Español' : 'English'}
                                    id="basic-nav-dropdown"
                                    align="end"
                                >
                                    <NavDropdown.Item onClick={() => handleLanguageChange('es')}>Español</NavDropdown.Item>
                                    <NavDropdown.Item onClick={() => handleLanguageChange('en')}>English</NavDropdown.Item>
                                </NavDropdown>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default Menu;
