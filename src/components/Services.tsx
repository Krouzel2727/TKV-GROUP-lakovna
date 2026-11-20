import { motion } from 'framer-motion';
import { siteData } from '../config/siteData';
import { fadeInUp, stagger } from '../utils/animations';
import DynamicIcon from './DynamicIcon';
import { Container, SectionHeader } from './ui';

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
            className="chamfer group relative flex flex-col bg-white p-8 transition-transform duration-300 hover:-translate-y-1"
          >
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
            <div className="flex items-start justify-between">
              <span className="flex h-14 w-14 items-center justify-center rounded-sm bg-ink text-2xl text-primary">
                <DynamicIcon name={service.icon} />
              </span>
              <span aria-hidden="true" className="font-display text-5xl font-bold leading-none text-silver/50">
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>
            <h3 className="mt-8 font-display text-2xl font-bold uppercase tracking-tight">{service.title}</h3>
            <p className="mt-3 leading-relaxed text-muted">{service.desc}</p>
          </motion.li>
        ))}
      </motion.ul>
    </Container>
  </section>
);

export default Services;
