import { motion } from 'framer-motion';
import { siteData } from '../config/siteData';
import { fadeInUp } from '../utils/animations';
import DynamicIcon from './DynamicIcon';

const TechSpecs = () => {
  const { title, cards, linkPrefix } = siteData.techSection;

  return (
    <section id="kapacita" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-16 text-primary"
        >
          {title}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-bgLight p-6 rounded-2xl border border-gray-100 hover:border-primary transition-colors flex flex-col items-center text-center"
            >
              <div className="bg-primary/20 p-4 rounded-full text-primary mb-4 text-2xl relative group cursor-pointer">
                <DynamicIcon name={card.icon} />
                {card.tooltip && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-dark text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 shadow-lg">
                    {card.tooltip}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-dark" />
                  </div>
                )}
              </div>

              <p className="text-sm text-textLight uppercase tracking-wider font-medium mb-1">{card.label}</p>

              {card.link ? (
                <div className="text-xl font-bold uppercase text-dark flex items-center gap-2">
                  {linkPrefix}
                  <a href={card.link} target="_blank" rel="noreferrer" className="text-primary hover:underline">
                    {card.value.replace(linkPrefix, '')}
                  </a>
                </div>
              ) : (
                <p className="text-xl font-bold text-dark">{card.value}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechSpecs;
