import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import POC from './POC';

async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  const { worker } = await import('./mocks/browser');

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start({ onUnhandledRequest: 'bypass' });
}

async function fetchPlan() {
  const response = await fetch('/api/load');
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}

/* istanbul ignore next -- @preserve */
enableMocking()
  .then(fetchPlan)
  .then((plan) => {
    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <POC plan={plan} />
      </StrictMode>
    );
  });
