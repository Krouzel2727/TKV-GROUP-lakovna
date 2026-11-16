import { motion } from 'framer-motion';
import { siteData } from '../config/siteData';
import { fadeInUp } from '../utils/animations';

const CtaSection = () => {
  const { title, subtitle, btnText, url } = siteData.ctaSection;

  return (
    <section className="py-16 bg-dark text-center border-t-4 border-primary">
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="container mx-auto px-4"
      >
        <h2 className="text-3xl text-primary font-bold mb-6">{title}</h2>
        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">{subtitle}</p>
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="inline-block bg-primary text-white font-bold py-4 px-10 rounded-full hover:bg-green-500 transition-colors shadow-[0_0_20px_rgba(146,208,80,0.3)] hover:shadow-[0_0_30px_rgba(146,208,80,0.5)]"
        >
          {btnText}
        </a>
      </motion.div>
    </section>
  );
};

export default CtaSection;
