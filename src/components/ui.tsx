import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '../utils/animations';

/**
 * Sdílené stavební prvky designu TKV-GROUP.
 * Stejné komponenty použije i web truhlárny – liší se jen akcentní barvou.
 */

// Rozložení
export const Container = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

// Malý popisek nad nadpisem: "01 — Služby"
export const Eyebrow = ({ index, children, dark = false }: { index?: string; children: ReactNode; dark?: boolean }) => (
  <p
    className={`flex items-center gap-3 font-display text-sm font-semibold uppercase tracking-[0.18em] ${
      dark ? 'text-primary' : 'text-primary-strong'
    }`}
  >
    <span aria-hidden="true" className="h-0.5 w-8 bg-primary" />
    {index && <span className={dark ? 'text-white/50' : 'text-muted'}>{index}</span>}
    <span>{children}</span>
  </p>
);

type SectionHeaderProps = {
  index?: string;
  eyebrow: string;
  title: string;
  lead?: string;
  dark?: boolean;
  align?: 'left' | 'center';
  as?: 'h2' | 'h3';
};

// Jednotná hlavička sekcí
export const SectionHeader = ({ index, eyebrow, title, lead, dark = false, align = 'left', as = 'h2' }: SectionHeaderProps) => {
  const Heading = as;
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className={`mb-12 max-w-3xl ${align === 'center' ? 'mx-auto text-center [&>p:first-child]:justify-center' : ''}`}
    >
      <Eyebrow index={index} dark={dark}>
        {eyebrow}
      </Eyebrow>
      <Heading
        className={`mt-4 font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight sm:text-5xl ${
          dark ? 'text-white' : 'text-ink'
        }`}
      >
        {title}
      </Heading>
      {lead && <p className={`mt-4 text-lg ${dark ? 'text-white/70' : 'text-muted'}`}>{lead}</p>}
    </motion.div>
  );
};
