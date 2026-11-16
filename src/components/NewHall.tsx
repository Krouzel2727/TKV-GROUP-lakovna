import { motion } from 'framer-motion';
import { siteData } from '../config/siteData';
import { fadeInUp } from '../utils/animations';

const NewHall = () => {
  const { title, subtitle, halls, badge } = siteData.newHallSection;

  return (
    <section className="py-20 bg-dark text-white">
      <div className="container mx-auto px-4">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mt-4 text-primary">{title}</h2>
          <p className="text-gray-400 mt-4 text-lg">{subtitle}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {halls.map((hall, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.2 + index * 0.2 }}
              className="relative bg-[#333131] p-8 md:p-10 rounded-2xl border border-gray-700 hover:border-primary transition-colors pb-16"
            >
              <h3 className="text-3xl font-bold text-primary mb-6">{hall.title}</h3>
              <div className="text-gray-300 leading-relaxed space-y-4">
                {hall.paragraphs.map((paragraph, i) => (
                  // Odstavce mohou obsahovat <strong> – texty jsou pod naší kontrolou v siteData
                  <p key={i} dangerouslySetInnerHTML={{ __html: paragraph }} />
                ))}
              </div>
              <div className="absolute bottom-6 right-6">
                <span className="bg-primary/20 border border-primary text-primary text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider">
                  {badge}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewHall;
