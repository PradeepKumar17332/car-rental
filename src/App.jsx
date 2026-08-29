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

/* ---- Tire / Wheel SVG Loader ---- */
function TireLoader() {
  const spokes = 6;
  const cx = 80, cy = 80, r = 80;
  const outerR = 74;   // outer tire edge
  const innerR = 54;   // rim edge
  const hubR   = 14;   // centre hub

  // Tread blocks around outer ring
  const treadCount = 24;
  const treadBlocks = Array.from({ length: treadCount }, (_, i) => {
    const angle = (i / treadCount) * 360;
    const gap = 7; // degrees gap between blocks
    const start = angle + gap / 2;
    const end   = angle + (360 / treadCount) - gap / 2;
    const toRad = (d) => (d * Math.PI) / 180;
    const x1 = cx + outerR * Math.cos(toRad(start));
    const y1 = cy + outerR * Math.sin(toRad(start));
    const x2 = cx + outerR * Math.cos(toRad(end));
    const y2 = cy + outerR * Math.sin(toRad(end));
    const x3 = cx + (outerR - 10) * Math.cos(toRad(end));
    const y3 = cy + (outerR - 10) * Math.sin(toRad(end));
    const x4 = cx + (outerR - 10) * Math.cos(toRad(start));
    const y4 = cy + (outerR - 10) * Math.sin(toRad(start));
    return `M ${x1} ${y1} A ${outerR} ${outerR} 0 0 1 ${x2} ${y2} L ${x3} ${y3} A ${outerR - 10} ${outerR - 10} 0 0 0 ${x4} ${y4} Z`;
  });

  // Spokes from hub to inner rim
  const spokeAngles = Array.from({ length: spokes }, (_, i) => (i / spokes) * 360);

  return (
    <svg
      width="160"
      height="160"
      viewBox="0 0 160 160"
      aria-hidden="true"
      style={{ overflow: 'visible' }}
    >
      <defs>
        {/* Glow filter */}
        <filter id="gold-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Spoke gradient */}
        <linearGradient id="spoke-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#C6A15B" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#E2C77A" stopOpacity="1" />
          <stop offset="100%" stopColor="#C6A15B" stopOpacity="0.3" />
        </linearGradient>
        {/* Rim gradient */}
        <radialGradient id="rim-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#2A2F3A" />
          <stop offset="100%" stopColor="#11151D" />
        </radialGradient>
        {/* Hub gradient */}
        <radialGradient id="hub-grad" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#E2C77A" />
          <stop offset="60%" stopColor="#C6A15B" />
          <stop offset="100%" stopColor="#8A6E3A" />
        </radialGradient>

        {/* Spinning wheel group animation */}
        <style>{`
          @keyframes tireSpin {
            from { transform: rotate(0deg); }
            to   { transform: rotate(360deg); }
          }
          @keyframes ringPulse {
            0%   { stroke-dashoffset: 440; opacity: 0.4; }
            50%  { stroke-dashoffset: 110; opacity: 1; }
            100% { stroke-dashoffset: 440; opacity: 0.4; }
          }
          @keyframes hubGlow {
            0%, 100% { filter: drop-shadow(0 0 4px #C6A15B88); }
            50%       { filter: drop-shadow(0 0 12px #E2C77Acc); }
          }
          .tire-spin {
            transform-origin: 80px 80px;
            animation: tireSpin 1.6s linear infinite;
          }
          .ring-pulse {
            stroke-dasharray: 440;
            stroke-dashoffset: 440;
            animation: ringPulse 1.6s ease-in-out infinite;
          }
          .hub-pulse {
            animation: hubGlow 1.6s ease-in-out infinite;
          }
        `}</style>
      </defs>

      {/* Outer dark background circle */}
      <circle cx={cx} cy={cy} r={outerR + 2} fill="#05070B" />

      {/* === SPINNING GROUP === */}
      <g className="tire-spin">

        {/* Outer tire rubber */}
        <circle cx={cx} cy={cy} r={outerR} fill="none" stroke="#1B2029" strokeWidth="12" />

        {/* Tread blocks */}
        {treadBlocks.map((d, i) => (
          <path
            key={i}
            d={d}
            fill={i % 2 === 0 ? '#252B38' : '#1B2029'}
            stroke="#C6A15B"
            strokeWidth="0.4"
            strokeOpacity="0.5"
          />
        ))}

        {/* Rim area fill */}
        <circle cx={cx} cy={cy} r={innerR} fill="url(#rim-grad)" />

        {/* Rim outer ring */}
        <circle
          cx={cx} cy={cy} r={innerR}
          fill="none"
          stroke="#C6A15B"
          strokeWidth="1.5"
          strokeOpacity="0.6"
        />

        {/* Spokes */}
        {spokeAngles.map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const x1 = cx + hubR * Math.cos(rad);
          const y1 = cy + hubR * Math.sin(rad);
          const x2 = cx + (innerR - 3) * Math.cos(rad);
          const y2 = cy + (innerR - 3) * Math.sin(rad);
          return (
            <line
              key={i}
              x1={x1} y1={y1}
              x2={x2} y2={y2}
              stroke="url(#spoke-grad)"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          );
        })}

        {/* Spoke accent lines (thinner, midway offset) */}
        {spokeAngles.map((angle, i) => {
          const offsetAngle = angle + 360 / spokes / 2;
          const rad = (offsetAngle * Math.PI) / 180;
          const x1 = cx + (hubR + 6) * Math.cos(rad);
          const y1 = cy + (hubR + 6) * Math.sin(rad);
          const x2 = cx + (innerR - 8) * Math.cos(rad);
          const y2 = cy + (innerR - 8) * Math.sin(rad);
          return (
            <line
              key={`accent-${i}`}
              x1={x1} y1={y1}
              x2={x2} y2={y2}
              stroke="#C6A15B"
              strokeWidth="1"
              strokeOpacity="0.25"
              strokeLinecap="round"
            />
          );
        })}

        {/* Hub circle */}
        <circle cx={cx} cy={cy} r={hubR} fill="url(#hub-grad)" className="hub-pulse" />
        <circle cx={cx} cy={cy} r={hubR} fill="none" stroke="#E2C77A" strokeWidth="1" strokeOpacity="0.8" />

        {/* Hub centre dot */}
        <circle cx={cx} cy={cy} r={4} fill="#05070B" />
        <circle cx={cx} cy={cy} r={2} fill="#C6A15B" />
      </g>

      {/* === STATIC glow ring (not spinning) === */}
      <circle
        cx={cx} cy={cy}
        r={70}
        fill="none"
        stroke="#C6A15B"
        strokeWidth="2"
        strokeLinecap="round"
        className="ring-pulse"
        filter="url(#gold-glow)"
        style={{ transformOrigin: '80px 80px', transform: 'rotate(-90deg)' }}
      />

      {/* Outer thin border ring */}
      <circle
        cx={cx} cy={cy} r={outerR + 2}
        fill="none"
        stroke="#C6A15B"
        strokeWidth="0.5"
        strokeOpacity="0.2"
      />
    </svg>
  );
}

/* ---- Loading screen ---- */
function LoadingScreen({ hidden }) {
  return (
    <div
      className={`loading-screen${hidden ? ' hidden' : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Loading Fortuner Legender experience"
    >
      {/* Ambient radial background */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '60vw',
          height: '60vw',
          background: 'radial-gradient(circle, rgba(198,161,91,0.07) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      {/* Tire animation */}
      <div style={{ marginBottom: '2.5rem', position: 'relative', zIndex: 1 }}>
        <TireLoader />
      </div>

      {/* Brand label */}
      <p
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.4rem',
          fontWeight: 300,
          letterSpacing: '0.18em',
          color: 'var(--color-white)',
          marginBottom: '0.35rem',
          position: 'relative',
          zIndex: 1,
        }}
      >
        FORTUNER LEGENDER
      </p>

      <p className="loading-label" style={{ position: 'relative', zIndex: 1 }}>
        Preparing your experience
      </p>

      {/* Thin gold progress line */}
      <div
        aria-hidden="true"
        style={{
          marginTop: '1.5rem',
          width: '180px',
          height: '1px',
          background: 'rgba(198,161,91,0.15)',
          position: 'relative',
          zIndex: 1,
          overflow: 'hidden',
          borderRadius: '1px',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '60%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, var(--color-gold-light), transparent)',
            animation: 'loadingSweep 1.4s ease-in-out infinite',
          }}
        />
      </div>

      <style>{`
        @keyframes loadingSweep {
          0%   { left: -60%; }
          100% { left: 160%; }
        }
      `}</style>
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
