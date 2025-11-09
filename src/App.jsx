import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Hero from './components/Hero';
import Header from './components/Header';
import TerminalHero from './components/TerminalHero';
import Projects from './components/Projects';
import Contact from './components/Contact';

export default function App() {
  const [accent, setAccent] = useState('#f97316');
  const [activeSection, setActiveSection] = useState('home');
  const [projectKey, setProjectKey] = useState('react');

  const projectsRef = useRef(null);

  useEffect(() => {
    document.documentElement.style.setProperty('--accent', accent);
  }, [accent]);

  useEffect(() => {
    const title = 'Younes • Cinematic Terminal Portfolio';
    const desc = 'A living, terminal-inspired portfolio with immersive storytelling, motion, and a Spline-powered 3D hero.';
    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', desc);
  }, []);

  const handleExplore = () => {
    projectsRef.current?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection('projects');
  };

  const handleNavigate = (cmd) => {
    if (cmd === 'projects') handleExplore();
    if (cmd === 'about') window.scrollTo({ top: 0, behavior: 'smooth' });
    if (cmd === 'skills') handleExplore();
    if (cmd === 'contact') document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(cmd);
  };

  const onProjectSelect = (key) => {
    setProjectKey(key.includes('next') ? 'nextjs' : key);
    handleExplore();
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[var(--accent)]/30 selection:text-white">
      <Header accent={accent} onChangeAccent={setAccent} />

      <main className="relative">
        <Hero onExplore={handleExplore} />

        <motion.div
          ref={projectsRef}
          id="projects"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="pt-6"
        >
          <TerminalHero onNavigate={handleNavigate} onProjectSelect={onProjectSelect} />
          <Projects activeKey={projectKey} />
        </motion.div>

        <Contact />
      </main>

      <footer className="py-8 text-center text-white/50">
        <span>© {new Date().getFullYear()} Younes. Crafted with motion and code.</span>
      </footer>
    </div>
  );
}
