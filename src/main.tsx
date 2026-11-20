import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
import './fonts.css';
import './index.css';

const container = document.getElementById('root') as HTMLElement;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// V produkci je HTML předgenerované (prerender) → React ho jen „oživí“.
// Ve vývojovém režimu (npm run dev) je #root prázdný → klasické vykreslení.
if (container.firstElementChild) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
