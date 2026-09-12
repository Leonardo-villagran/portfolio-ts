import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

const Footer: React.FC = () => {
  const { theme } = useAppContext();
  return (
    <footer
      className="text-center"
      style={{
        height: '10vh',
        flex: '0 0 10vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 1rem',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        background: theme === 'dark' ? '#04060d' : '#eef1f7',
        color: theme === 'dark' ? 'rgba(238,242,255,0.65)' : 'rgba(11,16,32,0.65)',
        borderTop: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(11,16,32,0.08)',
        fontSize: '0.78rem',
      }}
    >
      <span className="gradient-text" style={{ fontWeight: 700 }}>Leonardo Villagrán</span>
      {' — '}
      {new Date().getFullYear()} · Built with React + Vite
    </footer>
  );
};

const Site: React.FC = () => {
  return (
    <Router>
      <Menu />
      <Routes>
        <Route path={`/`} element={<Home />} />
        <Route path={`/about`} element={<About />} />
        <Route path={`/skills`} element={<Skills />} />
        <Route path={`/education`} element={<Education />} />
        <Route path={`/experiences`} element={<Experiences />} />
        <Route path={`/projects`} element={<Projects />} />
        <Route path={`/contact`} element={<Contact />} />
      </Routes>
      <Footer />
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
