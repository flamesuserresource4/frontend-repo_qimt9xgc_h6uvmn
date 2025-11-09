import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import TerminalHero from './components/TerminalHero';
import StorySection from './components/StorySection';
import EasterEggs from './components/EasterEggs';

const isEaster = (cmd) => ['about', 'skills', 'contact'].includes(cmd.toLowerCase());

export default function App() {
  const [accent, setAccent] = useState('#8b5cf6');
  const [active, setActive] = useState(null); // React | Next.js | Python
  const containerRef = useRef(null);

  // Smooth scroll when a command activates
  useEffect(() => {
    if (active && containerRef.current) {
      const el = document.getElementById('story');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [active]);

  const handleCommand = (cmdRaw) => {
    const cmd = cmdRaw.trim();
    if (!cmd) return;
    const norm = cmd.toLowerCase();
    if (isEaster(norm)) return setActive(norm);

    // Map a few common aliases
    if (['react', 'r'].includes(norm)) return setActive('React');
    if (['next', 'next.js', 'nextjs'].includes(norm)) return setActive('Next.js');
    if (['python', 'py'].includes(norm)) return setActive('Python');

    // Default: keep as-is with first letter capitalized
    setActive(cmd.charAt(0).toUpperCase() + cmd.slice(1));
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white">
      <Header accent={accent} onAccentChange={setAccent} />

      <main className="pt-20">
        <TerminalHero accent={accent} onCommand={handleCommand} />

        <AnimatePresence mode="wait">
          {active && !['about', 'skills', 'contact'].includes(active) && (
            <motion.div
              key={active + '-story'}
              id="story"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <StorySection accent={accent} active={active} onNavigate={setActive} />
            </motion.div>
          )}
        </AnimatePresence>

        <EasterEggs active={active} accent={accent} />

        <footer className="px-6 py-12 text-center text-xs text-gray-500">
          <div className="mx-auto max-w-3xl">
            <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mb-6" />
            <p className="font-mono">Built with a love for clean terminals and cinematic code.</p>
          </div>
        </footer>
      </main>

      {/* Accent color CSS variable for subtle theming hooks */}
      <style>{`:root { --accent:${accent}; }`}</style>
    </div>
  );
}
