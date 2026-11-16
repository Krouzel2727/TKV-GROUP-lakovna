import { motion } from 'framer-motion';
import { siteData } from '../config/siteData';
import DynamicIcon from './DynamicIcon';

const Services = () => (
  <section id="sluzby" className="py-20 bg-bgLight">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-3 gap-8">
        {siteData.services.map((service, index) => (
          <motion.div
            key={service.id}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { delay: index * 0.2 } },
            }}
            className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow border-t-4 border-transparent hover:border-primary group"
          >
            <div className="text-4xl text-primary mb-4 group-hover:scale-110 transition-transform">
              <DynamicIcon name={service.icon} />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-primary">{service.title}</h3>
            <p className="text-textLight leading-relaxed">{service.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Services;
