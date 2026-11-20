import { motion } from 'framer-motion';
import { siteData } from '../config/siteData';
import { fadeInUp, stagger } from '../utils/animations';
import DynamicIcon from './DynamicIcon';
import { Container, SectionHeader } from './ui';

// Technické parametry ve formě „technického listu“
const TechSpecs = () => {
  const { title, cards, linkPrefix } = siteData.techSection;

  return (
    <section id="kapacita" className="bg-white py-20 sm:py-28">
      <Container>
        <SectionHeader index="02" title={title} />

        <motion.dl
          variants={stagger(0.06)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-2 border-l border-t border-line lg:grid-cols-4"
        >
          {cards.map((card) => (
            <motion.div
              key={card.id}
              variants={fadeInUp}
              className="group relative flex flex-col border-b border-r border-line p-4 transition-colors hover:bg-concrete sm:p-7"
            >
              <span aria-hidden="true" className="absolute left-0 top-0 h-full w-0.5 scale-y-0 bg-primary transition-transform group-hover:scale-y-100" />
              <DynamicIcon name={card.icon} className="text-xl text-primary" />
              <dt className="mt-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted sm:mt-5 sm:text-xs">{card.label}</dt>
              <dd className="mt-1 font-display text-xl font-bold leading-tight text-ink sm:text-3xl">
                {card.link ? (
                  <>
                    {linkPrefix}
                    <a
                      href={card.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-ink underline decoration-primary decoration-[3px] underline-offset-4 transition-colors hover:bg-primary hover:no-underline"
                    >
                      {card.value.replace(linkPrefix, '')}
                    </a>
                  </>
                ) : (
                  card.value
                )}
                {card.tooltip && (
                  <span className="mt-2 block font-sans text-sm font-normal normal-case leading-snug text-muted">{card.tooltip}</span>
                )}
              </dd>
            </motion.div>
          ))}
        </motion.dl>
      </Container>
    </section>
  );
};

export default TechSpecs;
