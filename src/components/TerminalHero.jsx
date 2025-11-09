import { useEffect, useRef, useState } from 'react';
import Spline from '@splinetool/react-spline';
import { motion, AnimatePresence } from 'framer-motion';
import { CornerDownLeft } from 'lucide-react';

const initialHistory = [
  { type: 'system', text: 'Type a command: about, skills, projects, contact, or React / Next.js / Python' },
];

export default function TerminalHero({ onNavigate, onProjectSelect }) {
  const [history, setHistory] = useState(initialHistory);
  const [input, setInput] = useState('');
  const containerRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
    audioRef.current.volume = 0.2;
  }, []);

  useEffect(() => {
    containerRef.current?.scrollTo({ top: containerRef.current.scrollHeight, behavior: 'smooth' });
  }, [history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    setHistory((h) => [...h, { type: 'user', text: input }]);
    setInput('');
    audioRef.current?.play().catch(() => {});

    if (['about', 'skills', 'projects', 'contact'].includes(cmd)) {
      setHistory((h) => [...h, { type: 'system', text: `Navigating to ${cmd}…` }]);
      onNavigate(cmd);
      return;
    }
    if (['react', 'next.js', 'nextjs', 'python'].includes(cmd)) {
      const key = cmd.replace('.', '');
      onProjectSelect(key);
      setHistory((h) => [
        ...h,
        { type: 'system', text: `Loading ${cmd} projects…` },
      ]);
      return;
    }

    setHistory((h) => [...h, { type: 'error', text: `Unknown command: ${cmd}` }]);
  };

  return (
    <section id="terminal" className="relative min-h-[70vh] w-full">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/cEecEwR6Ehj4iT8T/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-12">
        <div className="rounded-xl border border-white/10 bg-black/60 backdrop-blur-xl overflow-hidden shadow-[0_0_40px_var(--accent)]" style={{ boxShadow: `0 0 36px var(--accent)` }}>
          <div className="px-4 py-3 flex items-center gap-2 text-white/60 text-sm border-b border-white/10">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span className="w-2 h-2 rounded-full bg-yellow-500" />
            <span className="w-2 h-2 rounded-full bg-green-500" />
            <span className="ml-2">~/portfolio</span>
          </div>

          <div ref={containerRef} className="max-h-[40vh] overflow-y-auto px-4 py-4 space-y-2 font-mono text-sm text-white/90">
            <AnimatePresence>
              {history.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className={
                    item.type === 'user'
                      ? 'text-white'
                      : item.type === 'error'
                      ? 'text-red-400'
                      : 'text-white/80'
                  }
                >
                  {item.type === 'user' ? (
                    <span className="text-[var(--accent)]">$</span>
                  ) : (
                    <span className="text-white/50">#</span>
                  )}{' '}
                  {item.text}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <form onSubmit={handleSubmit} className="px-4 py-3 border-t border-white/10 flex items-center gap-2">
            <span className="text-[var(--accent)] font-mono">$</span>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent outline-none text-white placeholder-white/40 font-mono"
              placeholder="about | skills | projects | contact | React | Next.js | Python"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/15 border border-white/10 text-white text-sm"
            >
              Enter <CornerDownLeft className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(transparent,rgba(0,0,0,0.65))] pointer-events-none" />
    </section>
  );
}
