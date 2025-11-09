import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TerminalHero from './TerminalHero';

const data = [
  {
    id: 'react-dashboard',
    title: 'Realtime Dashboard',
    story:
      'Built a live analytics cockpit for ops. WebSockets stream KPIs, while virtualized charts keep frames silky at 60fps. Outcome: actionable insights for on-call teams.',
    tech: ['React', 'Tailwind', 'WebSocket'],
    video: 'https://cdn.coverr.co/videos/coverr-coding-typing-8069/1080p.mp4',
    code: '#',
    live: '#',
  },
  {
    id: 'next-ecommerce',
    title: 'Edge E‑commerce',
    story:
      'A frictionless store powered by the App Router. Server Actions for carts, ISR for product pages, and streaming for blazing UX. Result: conversion up, bounce down.',
    tech: ['Next.js', 'Stripe', 'Prisma'],
    video: 'https://cdn.coverr.co/videos/coverr-typing-on-a-keyboard-2121/1080p.mp4',
    code: '#',
    live: '#',
  },
  {
    id: 'python-ml',
    title: 'ML to API Pipeline',
    story:
      'From notebooks to production: trained models wrapped in FastAPI, batch jobs via Celery, and a clean SDK for consumers. Impact: hours saved weekly for analysts.',
    tech: ['FastAPI', 'Pandas', 'scikit-learn'],
    video: 'https://cdn.coverr.co/videos/coverr-laptop-and-coffee-5092/1080p.mp4',
    code: '#',
    live: '#',
  },
];

export default function Projects({ accent, onCommand }) {
  const [index, setIndex] = useState(0);
  const project = data[index];

  const next = () => setIndex((i) => (i + 1) % data.length);
  const prev = () => setIndex((i) => (i - 1 + data.length) % data.length);

  return (
    <section id="projects" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6 py-16">
        {/* Terminal at top controlling narrative */}
        <TerminalHero accent={accent} onCommand={onCommand} />

        <AnimatePresence mode="wait">
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45 }}
            className="mt-8 rounded-xl border border-white/10 bg-white/60 dark:bg-zinc-900/60 backdrop-blur overflow-hidden"
          >
            <div className="grid md:grid-cols-2">
              <div className="p-6 md:p-8">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{project.title}</h3>
                <p className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed">{project.story}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="text-[11px] px-2 py-1 rounded border" style={{ borderColor: accent, color: accent }}>
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex items-center gap-3">
                  <a href={project.code} className="px-4 py-2 rounded-md border text-sm" style={{ color: accent, borderColor: accent }}>View Code</a>
                  <a href={project.live} className="px-4 py-2 rounded-md text-sm text-black" style={{ background: 'var(--accent)' }}>Visit Live</a>
                  <button onClick={next} className="px-4 py-2 rounded-md border text-sm" style={{ color: accent, borderColor: accent }}>Next Project</button>
                </div>
              </div>
              <div className="relative min-h-[260px] md:min-h-[360px]">
                <video className="absolute inset-0 h-full w-full object-cover" src={project.video} autoPlay loop muted playsInline />
                <div className="pointer-events-none absolute inset-0" style={{ boxShadow: `inset 0 0 80px ${accent}22` }} />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-4 flex justify-center gap-2">
          {data.map((_, i) => (
            <button key={i} onClick={() => setIndex(i)} className={`h-2 w-8 rounded-full transition-all ${i === index ? '' : 'opacity-40'}`} style={{ background: 'var(--accent)' }} />
          ))}
        </div>

        <div className="mt-10 flex justify-between">
          <button onClick={prev} className="px-3 py-1.5 rounded-md border text-xs" style={{ color: accent, borderColor: accent }}>Prev</button>
          <button onClick={next} className="px-3 py-1.5 rounded-md border text-xs" style={{ color: accent, borderColor: accent }}>Next</button>
        </div>
      </div>
    </section>
  );
}
