import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Send } from 'lucide-react';

export default function Contact() {
  const [status, setStatus] = useState('idle');

  async function onSubmit(e) {
    e.preventDefault();
    setStatus('loading');
    // Mock submit; wire to API later
    try {
      await new Promise((r) => setTimeout(r, 900));
      setStatus('success');
    } catch (e) {
      setStatus('error');
    } finally {
      setTimeout(() => setStatus('idle'), 2500);
    }
  }

  return (
    <section id="contact" className="relative py-16">
      <div className="mx-auto max-w-4xl px-4">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-semibold text-white"
        >
          Contact
        </motion.h2>
        <p className="text-white/70 mt-2">Let’s build something great together. Drop a message and I’ll get back soon.</p>

        <form onSubmit={onSubmit} className="mt-8 grid md:grid-cols-2 gap-4">
          <div className="md:col-span-1">
            <label className="block text-sm text-white/70 mb-1">Name</label>
            <input required className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-white placeholder-white/40 outline-none focus:border-[var(--accent)]/60" placeholder="Your name" />
          </div>
          <div className="md:col-span-1">
            <label className="block text-sm text-white/70 mb-1">Email</label>
            <input type="email" required className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-white placeholder-white/40 outline-none focus:border-[var(--accent)]/60" placeholder="you@example.com" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm text-white/70 mb-1">Message</label>
            <textarea required rows={5} className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-white placeholder-white/40 outline-none focus:border-[var(--accent)]/60" placeholder="Tell me about your project" />
          </div>
          <div className="md:col-span-2 flex items-center gap-3">
            <button
              type="submit"
              disabled={status === 'loading'}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[var(--accent)]/20 hover:bg-[var(--accent)]/25 border border-[var(--accent)]/40 text-[var(--accent)]"
            >
              <Send className="w-4 h-4" />
              {status === 'loading' ? 'Sending…' : 'Send Message'}
            </button>
            {status === 'success' && <span className="text-emerald-400">Sent successfully!</span>}
            {status === 'error' && <span className="text-rose-400">Something went wrong.</span>}
          </div>
        </form>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 text-white/80">
          <div className="inline-flex items-center gap-2"><Mail className="w-4 h-4" /> younes@example.com</div>
          <div className="inline-flex items-center gap-2"><Phone className="w-4 h-4" /> +1 (555) 010-0101</div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(transparent,rgba(0,0,0,0.6))]" />
    </section>
  );
}
