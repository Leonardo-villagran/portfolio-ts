import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Education from './pages/Education';
import Experiences from './pages/Experiences';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
// Importamos el AppProvider
import { AppProvider } from './context/AppProvider'; 


const App: React.FC = () => {

  return (
    <AppProvider>
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
    </Router>
  </AppProvider>
  );
};

export default App;
