import { useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './sections/Hero';
import './App.css';

function App() {
  useEffect(() => {
    const cleanURL = () => {
      // Force URL to show only "/#"
      window.history.replaceState(null, '', '/');
    };

    window.addEventListener('hashchange', cleanURL);
    window.addEventListener('popstate', cleanURL);

    return () => {
      window.removeEventListener('hashchange', cleanURL);
      window.removeEventListener('popstate', cleanURL);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navigation />
      <main>
        <Hero />
      </main>
    </div>
  );
}

export default App;
