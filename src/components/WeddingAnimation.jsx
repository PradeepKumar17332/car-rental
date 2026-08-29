import { useState } from 'react';
import ScrollImageSequence from './ScrollImageSequence';
import { business, weddingSequence } from '../data/site';

function WeddingTextOverlay({ progress }) {
  const phase1 = progress < 0.2;
  const phase2 = progress >= 0.2 && progress < 0.55;
  const phase3 = progress >= 0.55 && progress < 0.82;
  const phase4 = progress >= 0.82;

  const show = (active) => ({
    opacity: active ? 1 : 0,
    transform: active ? 'translateY(0)' : 'translateY(20px)',
    transition: 'opacity 0.7s ease, transform 0.7s ease',
    pointerEvents: active ? 'auto' : 'none',
  });

  return (
    <div className="hero-overlay" aria-live="polite">
      {/* Gradients */}
      <div className="hero-overlay-top" aria-hidden="true" />
      <div className="hero-overlay-bottom" aria-hidden="true" />

      {/* Warm romantic ambient glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80vw',
          height: '80vh',
          background: 'radial-gradient(ellipse, rgba(226,199,122,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Phase 1 — Before decoration */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '6vw',
          transform: 'translateY(-50%)',
          ...show(phase1),
        }}
      >
        <p className="label" style={{ marginBottom: '2rem' }}>Wedding Arrival</p>
        <h2
          className="display-hero"
          style={{ lineHeight: 0.9, maxWidth: '480px' }}
        >
          YOUR<br />
          <span style={{ color: 'var(--color-gold)', fontStyle: 'italic' }}>SPECIAL</span><br />
          DAY<br />
          DESERVES<br />
          A SPECIAL<br />
          ARRIVAL.
        </h2>
      </div>

      {/* Phase 2 — Flowers appearing */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          right: '6vw',
          transform: 'translateY(-50%)',
          textAlign: 'right',
          ...show(phase2),
        }}
      >
        <p className="label" style={{ marginBottom: '2rem', textAlign: 'right' }}>Transforming</p>
        <h2
          className="display-xl"
          style={{ color: 'var(--color-white)', lineHeight: 1 }}
        >
          FROM<br />
          <span style={{ color: 'var(--color-muted)', fontStyle: 'italic' }}>SIMPLE</span><br />
          <span style={{ color: 'var(--color-gold-light)' }}>TO</span><br />
          <span style={{ color: 'var(--color-gold)', fontStyle: 'italic' }}>SPECTACULAR.</span>
        </h2>
      </div>

      {/* Phase 3 — Decoration building */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '6vw',
          transform: 'translateY(-50%)',
          ...show(phase3),
        }}
      >
        <h2
          className="display-xl"
          style={{ color: 'var(--color-cream)', lineHeight: 1 }}
        >
          DECORATED<br />
          FOR THE<br />
          <span style={{ color: 'var(--color-gold)', fontStyle: 'italic' }}>MOMENT.</span>
        </h2>
      </div>

      {/* Phase 4 — Complete */}
      <div
        style={{
          position: 'absolute',
          bottom: '8vh',
          left: '50%',
          transform: phase4
            ? 'translateX(-50%)'
            : 'translateX(-50%) translateY(20px)',
          textAlign: 'center',
          width: '90%',
          opacity: phase4 ? 1 : 0,
          transition: 'opacity 0.8s ease, transform 0.8s ease',
          pointerEvents: phase4 ? 'auto' : 'none',
        }}
      >
        <p className="label" style={{ marginBottom: '1.5rem' }}>Groom Arrival</p>
        <h2
          className="display-lg"
          style={{
            color: 'var(--color-white)',
            marginBottom: '1rem',
            lineHeight: 1,
          }}
        >
          MAKE YOUR<br />
          <span style={{ color: 'var(--color-gold)', fontStyle: 'italic' }}>ARRIVAL</span><br />
          UNFORGETTABLE.
        </h2>
        <p
          className="body-md"
          style={{ maxWidth: '500px', margin: '1.5rem auto', fontSize: '1rem' }}
        >
          Turn your Fortuner Legender into a statement wedding arrival with elegant floral decoration.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1.5rem' }}>
          <a
            href={business.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            aria-label="Plan your wedding arrival via WhatsApp"
          >
            Plan Your Arrival
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
    </div>
  );
}

function WeddingAnimation() {
  const [progress, setProgress] = useState(0);

  return (
    <div id="weddings" style={{ background: 'var(--color-black)' }}>
      <ScrollImageSequence
        folder={weddingSequence.folder}
        totalFrames={weddingSequence.totalFrames}
        framePrefix={weddingSequence.framePrefix}
        framePadding={weddingSequence.framePadding}
        scrollMultiplier={450}
        id="wedding-seq"
        onProgress={setProgress}
      >
        <WeddingTextOverlay progress={progress} />
      </ScrollImageSequence>
    </div>
  );
}

export default WeddingAnimation;
