import { motion, AnimatePresence } from 'framer-motion';

const sections = {
  about: {
    title: 'About',
    body:
      'I craft interactive experiences that feel alive. My toolkit spans React, Next.js, and Python APIs — stitched with thoughtful design and motion.',
  },
  skills: {
    title: 'Skills',
    body:
      'Frontend: React, Next.js, Tailwind, Framer Motion. Backend: FastAPI, Node. Infra: Docker, Vercel. Extras: Design systems and accessibility.',
  },
  contact: {
    title: 'Contact',
    body:
      'Open to collaborations and roles. Reach out via email: hello@example.com or DM on Twitter @dev_handle.',
  },
};

export default function EasterEggs({ active, accent }) {
  return (
    <AnimatePresence mode="wait">
      {active in sections && (
        <motion.section
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35 }}
          className="mx-auto max-w-3xl px-6 py-12"
        >
          <h3 className="font-mono text-2xl text-gray-900 dark:text-white">
            <span style={{ color: accent }}>{sections[active].title}</span>
          </h3>
          <p className="mt-2 text-gray-700 dark:text-gray-300 leading-relaxed">
            {sections[active].body}
          </p>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
