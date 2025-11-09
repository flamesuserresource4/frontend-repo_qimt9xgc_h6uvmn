import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';

export default function Hero({ onCta, accent }) {
  return (
    <section id="home" className="relative min-h-[92vh] w-full overflow-hidden">
      {/* Spline Cover */}
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/cEecEwR6Ehj4iT8T/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Ambient gradient and vignette overlays that don't block Spline */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
      <div className="pointer-events-none absolute inset-0" style={{
        background: 'radial-gradient(60% 60% at 50% 30%, rgba(255,255,255,0.06), transparent 60%)'
      }} />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-28 sm:py-36">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="max-w-3xl"
        >
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="text-4xl sm:text-6xl font-semibold tracking-tight text-white"
          >
            A cinematic terminal for a modern developer
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mt-4 text-base sm:text-lg text-white/80 max-w-2xl"
          >
            Hey there 👋 I’m Younes — I turn ideas into sleek, high-performance digital experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-8 flex items-center gap-4"
          >
            <button
              onClick={onCta}
              className="relative inline-flex items-center gap-2 rounded-md px-5 py-3 font-medium text-black shadow-2xl transition-transform hover:-translate-y-0.5"
              style={{ background: 'var(--accent)' }}
            >
              Start Exploring
              <span className="pointer-events-none absolute inset-0 rounded-md" style={{ boxShadow: `0 0 32px var(--accent)` }} />
            </button>
            <span className="text-white/70 text-sm">Scroll to projects ↓</span>
          </motion.div>
        </motion.div>

        {/* Floating code fragments */}
        <div className="pointer-events-none relative mt-16">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl">
            {[`npm run build`, `git push origin main`, `npx create-next-app`, `pip install fastapi`, `pnpm dev`, `vercel --prod`].map((code, i) => (
              <motion.div
                key={code}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.06 }}
                className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-xs font-mono text-white/80 backdrop-blur"
                style={{ boxShadow: `0 0 0 1px rgba(255,255,255,0.03), 0 0 24px ${accent}22` }}
              >
                {code}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
