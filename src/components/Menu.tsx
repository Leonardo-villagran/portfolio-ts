import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { MenuItem } from '../interfaces/menu.interface';
import '../assets/css/Menu.css';
import { useAppContext } from '../context/Context';
import { Navbar, Nav, NavDropdown, Form} from 'react-bootstrap';
import HomeIcon from '@mui/icons-material/Home';

const Menu: React.FC = () => {
    const { language, setLanguage, theme, setTheme } = useAppContext();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [menuData, setMenuData] = useState<MenuItem | null>(null);
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const [isActive, setIsActive] = useState<boolean>(false); // Estado para el menú activo


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


    useEffect(() => {
        console.log('Menu open:', menuOpen);
    }, [menuOpen]);

    useEffect(() => {
        console.log('Menu active:', isActive);
    }, [isActive]);


    const toggleMenu = () => {
        setMenuOpen(prevMenuOpen => {
            const newMenuOpen = !prevMenuOpen;
            setIsActive(!newMenuOpen); // Cambiar estado del menú activo
            return newMenuOpen;
        });

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

    return (
        <div className="sticky-top">
            <Navbar expand="lg" variant="dark" bg="black" className={isActive ? "navbar-active" : ""} style={{ fontWeight: 'bold' }}>

            <Navbar.Brand as={Link} to="/">
                <HomeIcon fontSize="large" />
            </Navbar.Brand>
            <Navbar.Toggle className="me-1" onClick={toggleMenu} aria-expanded={menuOpen ? 'true' : 'false'} />
            <Navbar.Collapse id="navbarNav" className={`navbar-collapse ${menuOpen ? 'show' : ''}`}>
                <Nav className="me-auto ps-1">
                    <Nav.Link as={Link} to="/about">{menuData.about}</Nav.Link>
                    <Nav.Link as={Link} to="/skills">{menuData.skills}</Nav.Link>
                    <Nav.Link as={Link} to="/education">{menuData.education}</Nav.Link>
                    <Nav.Link as={Link} to="/experiences">{menuData.experiences}</Nav.Link>
                    <Nav.Link as={Link} to="/projects">{menuData.projects}</Nav.Link>
                    <Nav.Link as={Link} to="/contact">{menuData.contact}</Nav.Link>
                    <Nav.Link
                        target="_blank"
                        rel="noopener noreferrer"
                        href={menuData.resume.link}
                        className="resume-link" // Agregar una clase específica al enlace del currículum
                    >
                        {menuData.resume.title}
                    </Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Item>
                        <Form.Check
                            type="switch"
                            id="mySwitch"
                            label=""
                            checked={theme === "dark"}
                            onChange={handleToggleTheme}
                            className="ms-4 mt-2"
                        />
                    </Nav.Item>
                    {showMenu &&
                        <NavDropdown
                            title={language === 'es' ? 'Español' : 'English'}
                            id="basic-nav-dropdown"
                            align="end"
                            show={dropdownOpen}
                            onToggle={toggleDropdown}
                            
                        >
                            <NavDropdown.Item onClick={() => handleLanguageChange('es')} >Español</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => handleLanguageChange('en')}>English</NavDropdown.Item>
                        </NavDropdown>
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        </div>
    );
};

export default Menu;
