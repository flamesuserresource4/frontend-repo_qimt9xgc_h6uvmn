import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Contact from './components/Contact';

export default function App() {
  const [accent, setAccent] = useState('#f97316');
  const [active, setActive] = useState(null); // React | Next.js | Python or easter commands
  const containerRef = useRef(null);

  useEffect(() => {
    if (active && containerRef.current) {
      if (!['about', 'skills', 'contact'].includes(active)) {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [active]);

  const handleCommand = (cmdRaw) => {
    const cmd = cmdRaw.trim();
    if (!cmd) return;
    const norm = cmd.toLowerCase();

    if (['projects', 'project'].includes(norm)) {
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (['about', 'skills', 'contact'].includes(norm)) {
      setActive(norm);
      const id = norm === 'contact' ? 'contact' : 'home';
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    if (['react', 'r'].includes(norm)) return setActive('React');
    if (['next', 'next.js', 'nextjs'].includes(norm)) return setActive('Next.js');
    if (['python', 'py'].includes(norm)) return setActive('Python');

    setActive(cmd.charAt(0).toUpperCase() + cmd.slice(1));
  };

  const onCta = () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white">
      <Header accent={accent} onChangeAccent={setAccent} />

      {/* Accent color CSS variable global hook */}
      <style>{`:root { --accent:${accent}; }`}</style>

      <main className="pt-16">
        <Hero onCta={onCta} accent={accent} />

        <Projects accent={accent} onCommand={handleCommand} />

        <AnimatePresence mode="wait">
          {active && ['about', 'skills'].includes(active) && (
            <motion.section
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="mx-auto max-w-3xl px-6 py-12"
            >
              <h3 className="font-mono text-2xl"><span style={{ color: accent }}>{active === 'about' ? 'About' : 'Skills'}</span></h3>
              <p className="mt-2 text-white/80">
                {active === 'about'
                  ? 'I craft interactive experiences that feel alive. My toolkit spans React, Next.js, and Python APIs — stitched with thoughtful design and motion.'
                  : 'Frontend: React, Next.js, Tailwind, Framer Motion. Backend: FastAPI, Node. Infra: Docker, Vercel. Extras: Design systems and accessibility.'}
              </p>
            </motion.section>
          )}
        </AnimatePresence>

        <Contact accent={accent} />

        <footer className="px-6 py-12 text-center text-xs text-white/60">
          <div className="mx-auto max-w-3xl">
            <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mb-6" />
            <p className="font-mono">Built with a love for clean terminals and cinematic code.</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
