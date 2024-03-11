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

const App: React.FC = () => {
  return (
    <Router>
      <Menu />
      <Routes>
        <Route path="/react-ts-portfolio/" element={<Home />} />
        <Route path="/react-ts-portfolio/about" element={<About />} />
        <Route path="/react-ts-portfolio/skills" element={<Skills />} />
        <Route path="/react-ts-portfolio/education" element={<Education />} />
        <Route path="/react-ts-portfolio/experiences" element={<Experiences />} />
        <Route path="/react-ts-portfolio/projects" element={<Projects />} />
        <Route path="/react-ts-portfolio/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
};

export default App;
