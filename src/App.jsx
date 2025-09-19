import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import CursorBalls from './components/CursorBalls/CursorBalls';
import Navigation from './components/Navigation/Navigation';
import FloatingElements from './components/FloatingElements/FloatingElements';
import ParticleBackground from './components/ParticleBackground/ParticleBackground';
import VoiceNavigation from './components/VoiceNavigation/VoiceNavigation';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import SkillsPage from './pages/SkillsPage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';
import Rights from './sections/Rights/Rights';

function App() {
  return (
    <Router>
      <ParticleBackground />
      <FloatingElements />
      <CursorBalls />
      <Navigation />
      <VoiceNavigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Rights />
    </Router>
  );
}

export default App;
