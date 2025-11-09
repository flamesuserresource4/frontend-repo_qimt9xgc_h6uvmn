import { motion } from 'framer-motion';

const projectsByLang = {
  React: [
    { title: 'Realtime Dashboard', description: 'Streaming metrics with websockets and charts.', tags: ['React', 'Tailwind', 'WebSocket'] },
    { title: 'Design System', description: 'Composable components with accessibility baked in.', tags: ['React', 'Radix', 'Storybook'] },
  ],
  'Next.js': [
    { title: 'Edge-rendered Blog', description: 'ISR + MDX for blazing content.', tags: ['Next.js', 'MDX', 'ISR'] },
    { title: 'E-commerce', description: 'App Router, server actions, and payments.', tags: ['Next.js', 'Stripe', 'Prisma'] },
  ],
  Python: [
    { title: 'ML Playground', description: 'Notebooks to experiments-to-API pipeline.', tags: ['FastAPI', 'Pandas', 'scikit-learn'] },
    { title: 'Automation Suite', description: 'Bots that ship on time.', tags: ['Python', 'Celery', 'Redis'] },
  ],
};

export default function StorySection({ accent, active, onNavigate }) {
  const projects = projectsByLang[active] || [];

  return (
    <section className="relative scroll-mt-20">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="font-mono text-2xl sm:text-3xl text-gray-900 dark:text-white"
        >
          Showing projects in <span style={{ color: accent }}>{active}</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-2 text-gray-600 dark:text-gray-300 max-w-2xl"
        >
          A journey written in commits, pull requests, and late-night breakthroughs.
        </motion.p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {projects.map((p, idx) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="relative rounded-xl border border-white/10 bg-white/70 dark:bg-zinc-900/70 backdrop-blur p-5 overflow-hidden"
            >
              <div
                className="pointer-events-none absolute -inset-1 opacity-20"
                style={{ background: `radial-gradient(600px circle at 0 0, ${accent}, transparent 40%)` }}
              />
              <h3 className="font-mono text-lg text-gray-900 dark:text-white">{p.title}</h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{p.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] px-2 py-1 rounded border border-white/20 text-gray-700 dark:text-gray-200"
                    style={{ borderColor: accent + '55', color: accent }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex gap-3">
          {Object.keys(projectsByLang).map((lang) => (
            <button
              key={lang}
              onClick={() => onNavigate(lang)}
              className="px-3 py-1.5 rounded border text-xs font-mono"
              style={{
                background: lang === active ? accent : 'transparent',
                color: lang === active ? '#0b0b0b' : accent,
                borderColor: accent,
              }}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
