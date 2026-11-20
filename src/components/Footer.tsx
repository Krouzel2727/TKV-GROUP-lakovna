import { siteData } from '../config/siteData';
import { Container } from './ui';
import logo from '../assets/logo_remove_BG.png';

const Footer = () => {
  const { footer, contacts, nav, divisions, brand } = siteData;
  const headingCls = 'font-display text-sm font-semibold uppercase tracking-[0.18em] text-white/50';
  const linkCls = 'text-white/75 transition-colors hover:text-primary';

  return (
    <footer className="bg-ink text-sm text-white/75">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          {/* Logo v bílé (monochromní) verzi pro tmavé pozadí */}
          <img src={logo} alt={siteData.navbar.logoAlt} width={992} height={196} loading="lazy" className="h-9 w-auto brightness-0 invert" />
          <p className="mt-5 max-w-xs leading-relaxed">{footer.about}</p>
        </div>

        <nav aria-label={footer.navTitle} className="lg:col-span-2">
          <h2 className={headingCls}>{footer.navTitle}</h2>
          <ul className="mt-4 space-y-2.5">
            {nav.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={linkCls}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h2 className={headingCls}>{footer.contactTitle}</h2>
          <address className="mt-4 space-y-2.5 not-italic">
            <p>{contacts.hala1.adres}</p>
            <p>{contacts.hala1.open}</p>
            {[contacts.roman, contacts.jakub].map((p) => (
              <p key={p.name}>
                <a href={`tel:${p.phone.replace(/\s+/g, '')}`} className={linkCls}>
                  {p.phone}
                </a>
                <span className="text-white/60"> · {p.name}</span>
              </p>
            ))}
          </address>
        </div>

        <nav aria-label={footer.divisionsTitle} className="lg:col-span-3">
          <h2 className={headingCls}>{footer.divisionsTitle}</h2>
          <ul className="mt-4 space-y-2.5">
            {divisions.map((d) => (
              <li key={d.brand} data-brand={d.brand}>
                <a href={d.url} aria-current={d.brand === brand ? 'page' : undefined} className={`flex items-center gap-2 ${linkCls}`}>
                  <span aria-hidden="true" className="h-2 w-2 rounded-full bg-primary" />
                  {siteData.groupName} · {d.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-6 text-xs text-white/50 sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {footer.text}
          </p>
          <p>
            {footer.address} · {footer.ico} · {footer.dico}
          </p>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
