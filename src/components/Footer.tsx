import { siteData } from '../config/siteData';
import { Container } from './ui';
import logo from '../assets/logo_remove_BG.png';

const Footer = () => {
  const { footer, contacts, nav, divisions, brand } = siteData;
  const linkCls = 'text-silver transition-colors hover:text-primary';

  return (
    <footer className="border-t-4 border-primary bg-ink text-sm text-silver">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          {/* Logo v bílé (monochromní) verzi pro tmavé pozadí */}
          <img src={logo} alt={siteData.navbar.logoAlt} width={992} height={196} loading="lazy" className="h-9 w-auto brightness-0 invert" />
          <ul className="mt-6 space-y-2.5">
            {divisions.map((d) => (
              <li key={d.brand}>
                <a href={d.url} aria-current={d.brand === brand ? 'page' : undefined} className={`flex items-center gap-2 ${linkCls}`}>
                  <span aria-hidden="true" className="h-2 w-2 rounded-full bg-primary" />
                  {siteData.groupName} · {d.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label={siteData.navbar.navLabel} className="lg:col-span-3">
          <ul className="space-y-2.5">
            {nav.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={`font-display text-lg font-bold uppercase tracking-wide ${linkCls}`}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <address className="space-y-2.5 not-italic lg:col-span-5">
          <p className="text-white">{contacts.hala1.adres}</p>
          <p>{contacts.hala1.open}</p>
          {[contacts.roman, contacts.jakub].map((p) => (
            <p key={p.name}>
              <a href={`tel:${p.phone.replace(/\s+/g, '')}`} className={linkCls}>
                {p.phone}
              </a>
              <span> · {p.name}</span>
            </p>
          ))}
        </address>
      </Container>

      <div className="border-t border-steel-line">
        <Container className="flex flex-col gap-2 py-6 text-xs sm:flex-row sm:justify-between">
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
