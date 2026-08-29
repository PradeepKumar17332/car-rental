import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function EditorialCTA() {
  const sectionRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const subRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          once: true,
        },
      });

      tl.fromTo(
        line1Ref.current,
        { opacity: 0, y: 60, skewY: 3 },
        { opacity: 1, y: 0, skewY: 0, duration: 1.1, ease: 'power3.out' }
      )
        .fromTo(
          line2Ref.current,
          { opacity: 0, y: 60, skewY: 3 },
          { opacity: 1, y: 0, skewY: 0, duration: 1.1, ease: 'power3.out' },
          '-=0.7'
        )
        .fromTo(
          line3Ref.current,
          { opacity: 0, y: 60, skewY: 3 },
          { opacity: 1, y: 0, skewY: 0, duration: 1.1, ease: 'power3.out' },
          '-=0.7'
        )
        .fromTo(
          subRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
          '-=0.4'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="editorial-section"
      aria-labelledby="editorial-heading"
      style={{
        padding: 'var(--space-2xl) 0',
        background: 'var(--color-charcoal)',
      }}
    >
      {/* Ambient glow center */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80vw',
          height: '80vh',
          background: 'radial-gradient(ellipse, rgba(198,161,91,0.07) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      {/* Gold line top */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: '10%',
          right: '10%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, var(--color-gold-dim), transparent)',
          opacity: 0.5,
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Label */}
        <p className="label" style={{ marginBottom: '3rem' }} aria-hidden="true">
          The Moment
        </p>

        {/* Oversized text */}
        <div
          style={{ overflow: 'hidden', marginBottom: '0.5rem' }}
        >
          <h2
            id="editorial-heading"
            ref={line1Ref}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3.5rem, 9vw, 12rem)',
              fontWeight: 300,
              lineHeight: 0.92,
              color: 'var(--color-white)',
              opacity: 0,
              letterSpacing: '-0.02em',
            }}
          >
            WHEN THE
          </h2>
        </div>

        <div style={{ overflow: 'hidden', marginBottom: '0.5rem' }}>
          <p
            ref={line2Ref}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3.5rem, 9vw, 12rem)',
              fontWeight: 300,
              lineHeight: 0.92,
              color: 'var(--color-gold)',
              fontStyle: 'italic',
              opacity: 0,
              letterSpacing: '-0.02em',
            }}
            aria-hidden="true"
          >
            MOMENT MATTERS,
          </p>
        </div>

        <div style={{ overflow: 'hidden' }}>
          <p
            ref={line3Ref}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3.5rem, 9vw, 12rem)',
              fontWeight: 300,
              lineHeight: 0.92,
              color: 'var(--color-white)',
              opacity: 0,
              letterSpacing: '-0.02em',
            }}
            aria-hidden="true"
          >
            ARRIVE DIFFERENT.
          </p>
        </div>

        {/* Sub line */}
        <p
          ref={subRef}
          className="body-lg"
          style={{
            marginTop: '4rem',
            maxWidth: '500px',
            margin: '4rem auto 0',
            opacity: 0,
          }}
        >
          The Fortuner Legender is not just transport. It is a statement.<br />
          A declaration that this moment deserves something exceptional.
        </p>
      </div>

      {/* Gold line bottom */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0,
          left: '10%',
          right: '10%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, var(--color-gold-dim), transparent)',
          opacity: 0.5,
        }}
      />
    </section>
  );
}

export default EditorialCTA;
