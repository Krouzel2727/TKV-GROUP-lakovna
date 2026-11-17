import { siteData } from '../config/siteData';

// Běžící pás s logy/názvy zákazníků (seznam je zdvojený kvůli plynulé smyčce)
const References = () => {
  const { title, items } = siteData.referencesSection;

  return (
    <section id="zakaznici" className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4 mb-8">
        <h2 className="text-3xl font-bold text-center text-primary">{title}</h2>
      </div>
      <div className="flex w-full overflow-hidden whitespace-nowrap bg-white relative">
        <div className="flex w-max animate-marquee gap-8 px-4">
          {[...items, ...items].map((item, index) => {
            // Druhá kopie seznamu je jen kvůli plynulé animaci – čtečky a vyhledávače ji přeskočí
            const duplicate = index >= items.length;
            return item.url ? (
              <a
                key={index}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                aria-hidden={duplicate || undefined}
                tabIndex={duplicate ? -1 : undefined}
                className="inline-block bg-bgLight px-6 py-4 rounded-lg text-textMain font-semibold text-lg hover:text-primary hover:scale-105 transition-all shadow-sm border border-gray-100"
              >
                {item.name}
              </a>
            ) : (
              <div
                key={index}
                aria-hidden={duplicate || undefined}
                className="inline-block bg-bgLight px-6 py-4 rounded-lg text-textMain font-semibold text-lg cursor-default shadow-sm border border-gray-100"
              >
                {item.name}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default References;
