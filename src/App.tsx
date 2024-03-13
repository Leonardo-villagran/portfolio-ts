import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './components/Menu';
 // Asegúrate de que la ruta sea correcta
import Home from './components/Home';
import About from './components/About';
import Skills from './components/Skills';
import Education from './components/Education';
import Experiences from './components/Experiences';
import Projects from './components/Projects';
import Contact from './components/Contact';

const root_url = import.meta.env.VITE_ROOT_URL;
const App: React.FC = () => {
  return (
    <Router>
      <Menu />
      <Routes>
        <Route path={`/${root_url}/`} element={<Home />} />
        <Route path={`/${root_url}/about`} element={<About />} />
        <Route path={`/${root_url}/skills`} element={<Skills />} />
        <Route path={`/${root_url}/education`} element={<Education />} />
        <Route path={`/${root_url}/experiences`} element={<Experiences />} />
        <Route path={`/${root_url}/projects`} element={<Projects />} />
        <Route path={`/${root_url}/contact`} element={<Contact />} />
      </Routes>
    </Router>
  );
};

export default App;
