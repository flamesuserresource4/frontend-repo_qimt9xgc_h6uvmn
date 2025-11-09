import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Spline from '@splinetool/react-spline';

const SUGGESTIONS = ['React', 'Next.js', 'Python'];
const EASTER = ['about', 'skills', 'contact'];

export default function TerminalHero({ accent, onCommand }) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', text: 'Welcome, traveler. Initializing story shell...' },
  ]);
  const [blink, setBlink] = useState(true);
  const audioRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const id = setInterval(() => setBlink((b) => !b), 530);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const playTick = () => {
    try {
      audioRef.current?.currentTime && (audioRef.current.currentTime = 0);
      audioRef.current?.play();
    } catch (e) {}
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cmd = input.trim();
    if (!cmd) return;

    setHistory((h) => [
      ...h,
      { type: 'user', text: cmd },
    ]);

    onCommand(cmd);
    setInput('');
  };

  return (
    <section className="relative min-h-[90vh] grid lg:grid-cols-2 items-stretch">
      <div className="relative order-2 lg:order-1">
        <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/0 to-white pointer-events-none" />
        <Spline scene="https://prod.spline.design/VJLoxp84lCdVfdZu/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="order-1 lg:order-2 px-6 sm:px-10 py-24 flex flex-col justify-center">
        <div className="bg-black rounded-xl border border-white/15 shadow-2xl overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2 border-b border-white/10 bg-white/5">
            <span className="h-3 w-3 rounded-full bg-red-500" />
            <span className="h-3 w-3 rounded-full bg-yellow-500" />
            <span className="h-3 w-3 rounded-full bg-green-500" />
            <span className="ml-3 text-xs font-mono text-white/60">story-terminal</span>
          </div>
          <div className="p-5 sm:p-7 font-mono text-[13px] leading-relaxed text-white/90 space-y-2">
            <div className="text-white/70">Which language would you like me to show?</div>
            <AnimatePresence initial={false}>
              {history.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="whitespace-pre-wrap"
                >
                  <span className="text-white/50">{line.type === 'user' ? '➜' : '∴'}</span>{' '}
                  <span
                    className={line.type === 'user' ? 'text-white' : 'text-white/80'}
                    style={line.type === 'user' ? { color: accent } : {}}
                  >
                    {line.text}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
            <form onSubmit={handleSubmit} className="flex items-center gap-2 pt-2">
              <span className="text-[12px] text-white/50">$</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  playTick();
                }}
                placeholder={`Try ${SUGGESTIONS.join(', ')} or ${EASTER.map((e) => `"${e}"`).join(', ')}`}
                className="flex-1 bg-transparent outline-none placeholder:text-white/30 text-white"
              />
              <button
                type="submit"
                className="px-3 py-1 rounded border border-white/20 hover:border-white/40 text-white/80 text-xs"
                style={{ color: accent, borderColor: accent + '66' }}
              >
                run
              </button>
              <div className={`ml-1 h-4 w-[2px] ${blink ? 'opacity-100' : 'opacity-0'} bg-white`} />
            </form>
          </div>
        </div>
        <audio ref={audioRef} src="https://assets.mixkit.co/active_storage/sfx/2001/2001-preview.mp3" preload="auto" />
        <p className="mt-4 text-sm text-gray-600">
          Hint: Try typing React, Next.js, Python, or Easter eggs like about, skills, contact.
        </p>
      </div>
    </section>
  );
}
