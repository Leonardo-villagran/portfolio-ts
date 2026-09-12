import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Menu from './components/Menu';
import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Education from './pages/Education';
import Experiences from './pages/Experiences';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import { AppProvider } from './context/AppProvider';
import { useAppContext } from './context/Context';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
};

const Footer: React.FC = () => {
  const { language } = useAppContext();

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        background: '#040711',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '1.8rem 1rem',
        color: '#94a3b8',
        fontSize: '0.84rem',
        marginTop: 'auto',
      }}
    >
      <div
        className="container d-flex flex-column flex-md-row align-items-center justify-content-between gap-3 text-center text-md-start"
        style={{ maxWidth: 'var(--max-w)' }}
      >
        <div>
          <span className="gradient-text" style={{ fontWeight: 700 }}>
            Leonardo Villagrán
          </span>
          {' · '}
          <span>{language === 'en' ? 'Computer & Management Engineer' : 'Ingeniero en Informática y Gestión'}</span>
          <div className="small text-muted mt-1">
            © {new Date().getFullYear()} · {language === 'en' ? 'All rights reserved' : 'Todos los derechos reservados'}
          </div>
        </div>

        <div className="d-flex align-items-center gap-2 flex-wrap justify-content-center">
          <span
            style={{
              fontSize: '0.75rem',
              padding: '0.2rem 0.65rem',
              borderRadius: '999px',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              color: '#cbd5e1',
            }}
          >
            React 19 + TypeScript + Vite
          </span>
          <button
            type="button"
            onClick={handleScrollTop}
            aria-label="Scroll to top"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '50%',
              width: '34px',
              height: '34px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#38bdf8',
              cursor: 'pointer',
              transition: 'transform 0.2s, background 0.2s',
            }}
            title={language === 'en' ? 'Back to top' : 'Volver arriba'}
          >
            <KeyboardArrowUpIcon sx={{ fontSize: '1.2rem' }} />
          </button>
        </div>
      </div>
    </footer>
  );
};

const MainContent: React.FC = () => {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <div className={`app-wrapper ${isHome ? 'is-home-page' : ''}`}>
      <ScrollToTop />
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/experiences" element={<Experiences />} />
        <Route path="/education" element={<Education />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      {!isHome && <Footer />}
    </div>
  );
};

const Site: React.FC = () => {
  return (
    <Router>
      <MainContent />
    </Router>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <Site />
    </AppProvider>
  );
};

export default App;

