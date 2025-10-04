import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { reportWebVitals } from './lib/performance'

createRoot(document.getElementById("root")!).render(<App />);

// Monitor web vitals for performance
reportWebVitals((metric) => {
  // Metrics will be logged in development and sent to analytics in production
  console.log(metric);
});
