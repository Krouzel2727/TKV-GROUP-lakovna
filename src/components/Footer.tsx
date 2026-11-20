import { siteData } from '../config/siteData';
import { Container } from './ui';
import logo from '../assets/logo_remove_BG.png';

// Patička: logo + divize skupiny, pod čarou původní údaje (©, adresa, IČO, DIČ)
const Footer = () => {
  const { footer, divisions, brand } = siteData;

  return (
    <footer className="bg-blueprint border-t-4 border-primary bg-ink text-sm text-silver">
      <Container className="flex flex-col gap-8 py-12 md:flex-row md:items-center md:justify-between">
        <a href="/" aria-label={siteData.navbar.homeLabel} className="shrink-0">
          {/* Logo v bílé (monochromní) verzi pro tmavé pozadí */}
          <img src={logo} alt={siteData.navbar.logoAlt} width={992} height={196} loading="lazy" className="h-10 w-auto brightness-0 invert" />
        </a>

        <nav aria-label={siteData.divisionsLabel}>
          <ul className="flex flex-wrap gap-3">
            {divisions.map((d) => {
              const current = d.brand === brand;
              return (
                <li key={d.brand}>
                  <a
                    href={d.url}
                    aria-current={current ? 'page' : undefined}
                    className={`flex items-center gap-2.5 rounded-sm border px-4 py-2.5 font-display text-base font-bold uppercase tracking-wide transition-colors ${
                      current ? 'border-primary text-white' : 'border-steel-line text-silver hover:border-primary hover:text-white'
                    }`}
                  >
                    <span aria-hidden="true" className="h-2 w-2 rounded-full bg-primary" />
                    {siteData.groupName} · {d.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </Container>

      <div className="border-t border-steel-line">
        <Container className="flex flex-col gap-2 py-6 text-xs sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {footer.text}
          </p>
          <p>
            {footer.address} <span aria-hidden="true">·</span> {footer.ico} <span aria-hidden="true">·</span> {footer.dico}
          </p>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
