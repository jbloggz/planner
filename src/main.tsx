import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import POC from './POC';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <POC />
  </StrictMode>
);
