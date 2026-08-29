import { useState } from 'react';
import ScrollImageSequence from './ScrollImageSequence';
import { business, heroSequence } from '../data/site';

function HeroTextOverlay({ progress }) {
  // progress: 0 → 1
  const phase1 = progress < 0.15; // opening
  const phase2 = progress >= 0.15 && progress < 0.55; // assembling
  const phase3 = progress >= 0.55 && progress < 0.85; // almost done
  const phase4 = progress >= 0.85; // complete

  const showPhase = (active) => ({
    opacity: active ? 1 : 0,
    transform: active ? 'translateY(0)' : 'translateY(20px)',
    transition: 'opacity 0.7s ease, transform 0.7s ease',
    pointerEvents: active ? 'auto' : 'none',
  });

  return (
    <div className="hero-overlay" aria-live="polite">
      {/* Top gradient */}
      <div className="hero-overlay-top" aria-hidden="true" />
      {/* Bottom gradient */}
      <div className="hero-overlay-bottom" aria-hidden="true" />

      {/* Radial ambient glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '70vw',
          height: '70vh',
          background: 'radial-gradient(ellipse, rgba(198,161,91,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Phase 1 — Opening message */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '6vw',
          transform: 'translateY(-50%)',
          ...showPhase(phase1),
        }}
      >
        <p className="label" style={{ marginBottom: '1.5rem' }}>Fortuner Legender · Luxury Rentals</p>
        <h1
          className="display-hero"
          style={{ maxWidth: '520px', lineHeight: 0.92 }}
        >
          THE<br />
          <span style={{ color: 'var(--color-gold-light)', fontStyle: 'italic' }}>ARRIVAL</span><br />
          STARTS<br />
          HERE.
        </h1>
      </div>

      {/* Phase 2 — Assembling */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '6vw',
          transform: 'translateY(-50%)',
          ...showPhase(phase2),
        }}
      >
        <p className="label" style={{ marginBottom: '1.5rem', opacity: 0.7 }}>Assembling</p>
        <h2
          className="display-hero"
          style={{ maxWidth: '480px', lineHeight: 0.9 }}
        >
          BUILT<br />
          FOR THE<br />
          <span style={{ color: 'var(--color-gold)', fontStyle: 'italic' }}>MOMENT.</span>
        </h2>
      </div>

      {/* Phase 3 — Qualities */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          right: '6vw',
          transform: 'translateY(-50%)',
          textAlign: 'right',
          ...showPhase(phase3),
        }}
      >
        <h2
          className="display-xl"
          style={{ lineHeight: 1, color: 'var(--color-cream)' }}
        >
          COMMANDING.<br />
          <span style={{ color: 'var(--color-gold)', fontStyle: 'italic' }}>ELEGANT.</span><br />
          UNFORGETTABLE.
        </h2>
      </div>

      {/* Phase 4 — Complete vehicle */}
      <div
        style={{
          position: 'absolute',
          bottom: '10vh',
          left: '50%',
          transform: phase4 ? 'translateX(-50%)' : 'translateX(-50%) translateY(20px)',
          textAlign: 'center',
          width: '90%',
          opacity: phase4 ? 1 : 0,
          transition: 'opacity 0.8s ease, transform 0.8s ease',
          pointerEvents: phase4 ? 'auto' : 'none',
        }}
      >
        <p className="label" style={{ marginBottom: '1rem' }}>The Fortuner Legender</p>
        <h2
          className="display-md"
          style={{
            color: 'var(--color-white)',
            marginBottom: '1rem',
            fontStyle: 'italic',
          }}
        >
          A premium arrival for journeys that deserve something extraordinary.
        </h2>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1.5rem' }}>
          <a
            href={business.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            aria-label="Book your ride via WhatsApp"
          >
            Book Your Ride
          </a>
          <a
            href={business.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
            aria-label="Contact us on WhatsApp"
          >
            WhatsApp Us
          </a>
        </div>
      </div>

      {/* Scroll hint — only at start */}
      <div
        style={{
          position: 'absolute',
          bottom: '3vh',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          opacity: phase1 ? 0.7 : 0,
          transition: 'opacity 0.5s ease',
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      >
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.6rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'var(--color-gold)',
          }}
        >
          Scroll to assemble
        </span>
        <div
          style={{
            width: '1px',
            height: '40px',
            background: 'linear-gradient(180deg, var(--color-gold), transparent)',
            animation: 'scrollPulse 2s ease-in-out infinite',
          }}
        />
      </div>
    </div>
  );
}


function HeroAssembly() {
  const [progress, setProgress] = useState(0);

  return (
    <div id="hero" style={{ background: 'var(--color-black)' }}>
      <style>{`
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(1.3); }
        }
      `}</style>
      <ScrollImageSequence
        folder={heroSequence.folder}
        totalFrames={heroSequence.totalFrames}
        framePrefix={heroSequence.framePrefix}
        framePadding={heroSequence.framePadding}
        scrollMultiplier={500}
        id="hero-seq"
        onProgress={setProgress}
      >
        <HeroTextOverlay progress={progress} />
      </ScrollImageSequence>
    </div>
  );
}

export default HeroAssembly;
