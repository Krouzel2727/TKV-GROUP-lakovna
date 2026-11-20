import { motion } from 'framer-motion';
import { siteData } from '../config/siteData';
import { fadeInUp } from '../utils/animations';
import { Container, SectionHeader } from './ui';

const NewHall = () => {
  const { title, subtitle, halls, badge } = siteData.newHallSection;

  return (
    <section className="bg-blueprint relative bg-graphite py-20 text-white sm:py-28">
      <Container>
        <SectionHeader index="03" title={title} lead={subtitle} dark />

        <div className="grid gap-5 lg:grid-cols-2">
          {halls.map((hall, index) => (
            <motion.article
              key={index}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: index * 0.12 }}
              className="chamfer group relative border border-steel-line bg-steel p-8 transition-colors hover:border-primary sm:p-10"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span aria-hidden="true" className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-silver">
                  {String(index + 1).padStart(2, '0')} / {String(halls.length).padStart(2, '0')}
                </span>
                <span className="rounded-sm border border-primary/60 bg-primary/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-primary">
                  {badge}
                </span>
              </div>
              <h3 className="mt-6 font-display text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">{hall.title}</h3>
              <div className="mt-6 space-y-4 leading-relaxed text-silver [&_strong]:font-semibold [&_strong]:text-white">
                {hall.paragraphs.map((paragraph, i) => (
                  // Odstavce mohou obsahovat <strong> – texty jsou pod naší kontrolou v siteData
                  <p key={i} dangerouslySetInnerHTML={{ __html: paragraph }} />
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default NewHall;
