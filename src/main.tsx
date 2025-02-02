import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import POC from './POC';

/* istanbul ignore next -- @preserve */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <POC />
  </StrictMode>
);
