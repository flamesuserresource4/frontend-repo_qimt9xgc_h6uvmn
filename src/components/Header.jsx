import { useState } from 'react';
import { Palette, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PALETTE = [
  '#f97316', // orange
  '#22d3ee', // cyan
  '#a78bfa', // violet
  '#34d399', // emerald
  '#f43f5e', // rose
];

export default function Header({ accent, onChangeAccent }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 right-0 z-30">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between backdrop-blur-md bg-black/30 border-b border-white/10 rounded-b-xl">
        <div className="flex items-center gap-3 select-none">
          <Sparkles className="w-5 h-5 text-white/70" />
          <span className="text-sm md:text-base tracking-wide text-white/80 font-medium">
            Younes • Cinematic Terminal Portfolio
          </span>
        </div>

        <div className="relative">
          <button
            className="group inline-flex items-center gap-2 px-3 py-2 rounded-md border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
            onClick={() => setOpen(v => !v)}
            aria-label="Open color palette"
          >
            <Palette className="w-4 h-4 text-white/80" />
            <span className="text-sm text-white/80 hidden sm:block">Theme</span>
            <span
              className="w-4 h-4 rounded-full shadow-[0_0_12px_var(--accent)]"
              style={{ background: accent, boxShadow: `0 0 16px ${accent}` }}
            />
          </button>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                className="absolute right-0 mt-2 p-3 rounded-lg border border-white/10 bg-black/70 backdrop-blur-xl shadow-2xl"
              >
                <div className="grid grid-cols-5 gap-3">
                  {PALETTE.map((c) => (
                    <button
                      key={c}
                      onClick={() => { onChangeAccent(c); setOpen(false); }}
                      className="relative w-8 h-8 rounded-full ring-2 ring-white/10 focus:outline-none focus:ring-white/40 transition"
                      style={{ background: c, boxShadow: `0 0 20px ${c}66` }}
                      aria-label={`Pick ${c}`}
                    >
                      {accent === c && (
                        <span className="absolute inset-0 rounded-full border-2" style={{ borderColor: 'white' }} />
                      )}
                    </button>
                  ))}
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-2 text-xs text-white/60"
                >
                  Changes apply site‑wide
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
