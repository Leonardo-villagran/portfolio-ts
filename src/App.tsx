import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Home from './components/Home';
import About from './components/About';
import Skills from './components/Skills';
import Education from './components/Education';
import Experiences from './components/Experiences';
import Projects from './components/Projects';
import Contact from './components/Contact';
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
