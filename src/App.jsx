import { useEffect, useState } from 'react';
import './styles/globals.css';

import Navbar from './components/Navbar';
import HeroAssembly from './components/HeroAssembly';
import LuxuryIntro from './components/LuxuryIntro';
import Features from './components/Features';
import WeddingAnimation from './components/WeddingAnimation';
import WeddingSection from './components/WeddingSection';
import Occasions from './components/Occasions';
import EditorialCTA from './components/EditorialCTA';
import CTA from './components/CTA';
import Contact from './components/Contact';
import Footer from './components/Footer';

/* ---- Loading screen ---- */
function LoadingScreen({ hidden }) {
  return (
    <div className={`loading-screen${hidden ? ' hidden' : ''}`} role="status" aria-live="polite">
      <p className="loading-label" aria-label="Loading Fortuner Legender experience">
        Loading Experience
      </p>
      <div className="loading-bar-track" aria-hidden="true">
        <div
          className="loading-bar-fill"
          style={{ width: hidden ? '100%' : '40%' }}
        />
      </div>
    </div>
  );
}

function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Hide loading screen after first paint + short delay for first frame
    const timer = setTimeout(() => setLoaded(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingScreen hidden={loaded} />

      {/* Skip to main content for accessibility */}
      <a
        href="#hero"
        style={{
          position: 'fixed',
          top: '-100px',
          left: '1rem',
          zIndex: 9999,
          background: 'var(--color-gold)',
          color: 'var(--color-black)',
          padding: '0.75rem 1.5rem',
          borderRadius: '4px',
          fontFamily: 'var(--font-body)',
          fontSize: '0.85rem',
          fontWeight: 600,
          transition: 'top 0.2s ease',
        }}
        onFocus={(e) => (e.target.style.top = '1rem')}
        onBlur={(e) => (e.target.style.top = '-100px')}
      >
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content">
        {/* 1. Hero — Fortuner assembly animation */}
        <HeroAssembly />

        {/* 2. Luxury positioning */}
        <LuxuryIntro />

        {/* 3. Why the Legender */}
        <Features />

        {/* 4. Wedding decoration animation */}
        <WeddingAnimation />

        {/* 5. Wedding groom section */}
        <WeddingSection />

        {/* 6. Occasions */}
        <Occasions />

        {/* 7. Editorial cinematic CTA */}
        <EditorialCTA />

        {/* 8. Primary CTA */}
        <CTA />

        {/* 9. Contact */}
        <Contact />
      </main>

      <Footer />
    </>
  );
}

export default App;
