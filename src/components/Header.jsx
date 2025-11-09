import { useEffect, useState } from 'react';
import { Palette } from 'lucide-react';

const PALETTE = [
  { name: 'Cyan', value: '#22d3ee' },
  { name: 'Violet', value: '#8b5cf6' },
  { name: 'Emerald', value: '#10b981' },
  { name: 'Amber', value: '#f59e0b' },
  { name: 'Rose', value: '#f43f5e' },
];

export default function Header({ accent, onAccentChange }) {
  const [open, setOpen] = useState(false);

  // Close on escape
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/40 bg-white/60 dark:bg-black/40 border-b border-white/20 dark:border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3 select-none">
          <div
            className="h-3 w-3 rounded-full shadow"
            style={{ backgroundColor: accent }}
          />
          <span className="font-mono text-sm tracking-tight text-gray-800 dark:text-gray-100">
            dev@portfolio:~$
          </span>
          <span className="font-mono text-sm text-gray-500"> story-terminal</span>
        </div>
        <div className="relative">
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-2 px-3 py-2 rounded-md border border-white/20 hover:border-white/30 transition-colors text-gray-700 dark:text-gray-200"
            aria-label="Change color theme"
          >
            <Palette size={16} />
            <span className="font-mono text-xs">palette</span>
          </button>
          {open && (
            <div className="absolute right-0 mt-2 w-56 p-3 rounded-lg shadow-xl bg-white/90 dark:bg-zinc-900/90 border border-white/20">
              <div className="grid grid-cols-5 gap-2">
                {PALETTE.map((p) => (
                  <button
                    key={p.value}
                    onClick={() => {
                      onAccentChange(p.value);
                      setOpen(false);
                    }}
                    className="h-9 rounded-md border border-white/30 hover:scale-105 transition-transform"
                    style={{ background: p.value }}
                    aria-label={p.name}
                    title={p.name}
                  />
                ))}
              </div>
              <div className="mt-3 text-[11px] text-gray-500 font-mono">accent → {accent}</div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
