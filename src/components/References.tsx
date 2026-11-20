import { siteData } from '../config/siteData';
import { Container, Eyebrow } from './ui';

// Běžící pás se zákazníky (seznam je zdvojený kvůli plynulé smyčce, při najetí myší se zastaví)
const References = () => {
  const { eyebrow, title, items } = siteData.referencesSection;

  return (
    <section id="zakaznici" className="overflow-hidden border-y border-line bg-white py-14">
      <Container className="mb-8 flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-bold uppercase tracking-tight">{title}</h2>
        </div>
      </Container>
      <div className="group mask-fade-x flex w-full overflow-hidden">
        <ul className="flex w-max animate-marquee gap-3 px-1.5 group-hover:[animation-play-state:paused]">
          {[...items, ...items].map((item, index) => {
            // Druhá kopie seznamu je jen kvůli plynulé animaci – čtečky a vyhledávače ji přeskočí
            const duplicate = index >= items.length;
            const cls =
              'flex h-16 items-center whitespace-nowrap rounded-sm border border-line px-6 font-display text-xl font-semibold tracking-wide text-muted';
            return (
              <li key={index} aria-hidden={duplicate || undefined}>
                {item.url ? (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    tabIndex={duplicate ? -1 : undefined}
                    className={`${cls} transition-colors hover:border-primary hover:text-ink`}
                  >
                    {item.name}
                  </a>
                ) : (
                  <span className={cls}>{item.name}</span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default References;
