import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '../utils/animations';

/**
 * Sdílené stavební prvky designu TKV-GROUP.
 * Stejné komponenty i barevnou paletu použije i web truhlárny.
 */

// Rozložení
export const Container = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

// Značka nad nadpisem: zelená linka + číslo sekce ("— 01"), volitelně krátký text
export const Eyebrow = ({ index, children, dark = false }: { index?: string; children?: ReactNode; dark?: boolean }) => (
  <p
    className={`flex items-center gap-3 font-display text-sm font-bold uppercase tracking-[0.18em] ${
      dark ? 'text-silver' : 'text-body'
    }`}
  >
    <span aria-hidden="true" className="h-0.5 w-10 bg-primary" />
    {index && <span aria-hidden="true">{index}</span>}
    {children && <span className={dark ? 'text-primary' : 'text-ink'}>{children}</span>}
  </p>
);

type SectionHeaderProps = {
  index?: string;
  title: string;
  lead?: string;
  dark?: boolean;
  as?: 'h2' | 'h3';
};

// Jednotná hlavička sekcí
export const SectionHeader = ({ index, title, lead, dark = false, as = 'h2' }: SectionHeaderProps) => {
  const Heading = as;
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className="mb-12 max-w-3xl"
    >
      <Eyebrow index={index} dark={dark} />
      <Heading
        className={`mt-4 font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight sm:text-5xl ${
          dark ? 'text-white' : 'text-ink'
        }`}
      >
        {title}
      </Heading>
      {lead && <p className={`mt-4 text-lg ${dark ? 'text-silver' : 'text-body'}`}>{lead}</p>}
    </motion.div>
  );
};
