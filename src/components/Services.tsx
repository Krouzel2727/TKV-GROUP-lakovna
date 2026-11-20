import { motion } from 'framer-motion';
import { siteData } from '../config/siteData';
import { fadeInUp, stagger } from '../utils/animations';
import DynamicIcon from './DynamicIcon';
import { Container, SectionHeader } from './ui';
import { card } from './buttons';

const Services = () => (
  <section id="sluzby" className="bg-concrete py-20 sm:py-28">
    <Container>
      <SectionHeader index="01" title={siteData.nav[0].label} />
      <motion.ul
        variants={stagger(0.12)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="grid gap-5 md:grid-cols-3"
      >
        {siteData.services.map((service, index) => (
          <motion.li
            key={service.id}
            variants={fadeInUp}
            className={`${card.light} group flex flex-col p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_40px_-24px_rgb(36_34_34/0.35)]`}
          >
            <div className="flex items-start justify-between">
              <span className="flex h-14 w-14 items-center justify-center rounded-sm bg-primary text-2xl text-ink transition-transform duration-300 group-hover:scale-105">
                <DynamicIcon name={service.icon} />
              </span>
              <span aria-hidden="true" className="font-display text-5xl font-bold leading-none text-silver/50">
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>
            <h3 className="mt-8 font-display text-2xl font-bold uppercase tracking-tight">{service.title}</h3>
            <p className="mt-3 leading-relaxed text-body">{service.desc}</p>
          </motion.li>
        ))}
      </motion.ul>
    </Container>
  </section>
);

export default Services;
