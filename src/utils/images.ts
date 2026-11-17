/**
 * Optimalizované varianty fotek z src/assets/gallery.
 * Při buildu se z každé fotky vygenerují zmenšené WebP verze (vite-imagetools)
 * a prohlížeč si podle atributu `sizes` a displeje vybere nejmenší vhodnou.
 */

const fileName = (path: string) => path.split('/').pop()!.replace(/\.[^.]+$/, '');

const variants: Record<string, string> = Object.fromEntries(
  Object.entries(
    import.meta.glob<string>('../assets/gallery/*.webp', {
      eager: true,
      import: 'default',
      query: { w: '400;800;1280;1920', format: 'webp', quality: '72', withoutEnlargement: '', as: 'srcset' },
    }),
  ).map(([path, srcset]) => [fileName(path), srcset]),
);

const urls = (srcset: string) => srcset.split(',').map((s) => s.trim().split(' ')[0]);

export type ResponsiveImage = {
  srcSet: string;
  /** Výchozí src (střední velikost) */
  src: string;
  /** Největší varianta */
  large: string;
};

export const getImage = (name: string): ResponsiveImage => {
  const srcSet = variants[name];
  if (!srcSet) throw new Error(`Fotka "${name}" neexistuje v src/assets/gallery`);
  const list = urls(srcSet);
  return { srcSet, src: list[Math.min(1, list.length - 1)], large: list[list.length - 1] };
};
