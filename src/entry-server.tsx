import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';

// Používá se jen při buildu (scripts/prerender.mjs): vyrenderuje celou stránku do HTML,
// aby vyhledávače (i ty bez JavaScriptu, např. Seznam) viděly kompletní obsah.
export const render = () =>
  renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
