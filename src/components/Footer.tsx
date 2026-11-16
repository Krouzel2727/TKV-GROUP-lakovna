import { siteData } from '../config/siteData';

const Footer = () => (
  <footer className="bg-dark text-center py-6 border-t border-gray-800">
    <p className="text-gray-500 text-sm">
      © {new Date().getFullYear()} {siteData.footer.text}
    </p>
    <p className="text-gray-500 text-sm">{siteData.footer.address}</p>
    <p className="text-gray-500 text-sm">
      {siteData.footer.ico} | {siteData.footer.dico}
    </p>
  </footer>
);

export default Footer;
