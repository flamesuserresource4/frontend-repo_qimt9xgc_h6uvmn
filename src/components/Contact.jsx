import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone } from 'lucide-react';

export default function Contact({ accent }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setStatus('loading');
      await new Promise((r) => setTimeout(r, 700));
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="scroll-mt-24">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-3xl font-semibold text-gray-900 dark:text-white">Get in touch</motion.h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">Let’s build something impactful together. I usually reply within a day.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-500 dark:text-gray-400">Name</label>
              <input name="name" value={form.name} onChange={handleChange} required className="mt-1 w-full rounded-md border border-white/15 bg-white/60 dark:bg-zinc-900/60 px-3 py-2 outline-none focus:ring-2 focus:ring-white/20" />
            </div>
            <div>
              <label className="text-sm text-gray-500 dark:text-gray-400">Email</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} required className="mt-1 w-full rounded-md border border-white/15 bg-white/60 dark:bg-zinc-900/60 px-3 py-2 outline-none focus:ring-2 focus:ring-white/20" />
            </div>
          </div>
          <div>
            <label className="text-sm text-gray-500 dark:text-gray-400">Message</label>
            <textarea name="message" value={form.message} onChange={handleChange} rows={5} required className="mt-1 w-full rounded-md border border-white/15 bg-white/60 dark:bg-zinc-900/60 px-3 py-2 outline-none focus:ring-2 focus:ring-white/20" />
          </div>
          <button type="submit" disabled={status==='loading'} className="relative rounded-md px-5 py-2 text-black transition-transform hover:-translate-y-0.5" style={{ background: 'var(--accent)' }}>
            {status==='loading' ? 'Sending…' : 'Send Message'}
            <span className="pointer-events-none absolute inset-0 rounded-md" style={{ boxShadow: `0 0 24px var(--accent)` }} />
          </button>
        </form>

        <AnimatePresence>
          {status === 'success' && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-4 text-green-500">Message sent! I\'ll get back to you soon.</motion.div>
          )}
          {status === 'error' && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-4 text-red-500">Something went wrong. Please try again.</motion.div>
          )}
        </AnimatePresence>

        <div className="mt-10 flex items-center gap-6 text-white/80">
          <div className="flex items-center gap-2"><Mail className="h-4 w-4" /><a href="mailto:hello@example.com" className="hover:underline">hello@example.com</a></div>
          <div className="flex items-center gap-2"><Phone className="h-4 w-4" /><a href="tel:+1234567890" className="hover:underline">+1 (234) 567-890</a></div>
        </div>
      </div>
    </section>
  );
}
