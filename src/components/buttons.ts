/**
 * Třídy tlačítek a karet designu TKV-GROUP (sdílené pro lakovnu i truhlárnu).
 * Všechny prvky mají stejný tvar: hranatý obdélník (zaoblení 2 px).
 */
const btnBase =
  'inline-flex items-center justify-center gap-2 font-semibold text-base px-7 py-3.5 rounded-sm transition-all duration-200 focus-visible:outline-offset-4';
export const btn = {
  primary: `${btnBase} bg-primary text-on-primary hover:brightness-110 hover:-translate-y-0.5 shadow-[0_10px_30px_-12px_var(--color-primary)]`,
  outlineLight: `${btnBase} border border-silver text-white hover:bg-white hover:text-ink`,
  outlineDark: `${btnBase} border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-white`,
};

/**
 * Karty – jednotný vzhled napříč webem:
 * hranatý obdélník, tenký rámeček a zelená linka nahoře.
 */
const cardBase = 'relative rounded-sm border border-t-[3px] border-t-primary';
export const card = {
  light: `${cardBase} border-line bg-white`,
  dark: `${cardBase} border-steel-line bg-steel text-white`,
};
