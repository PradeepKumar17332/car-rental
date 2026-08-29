import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function LuxuryIntro() {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true,
          },
        }
      );
      gsap.fromTo(
        rightRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: 'power3.out',
          delay: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true,
          },
        }
      );
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="legender"
      className="luxury-intro"
      aria-labelledby="luxury-intro-heading"
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '30%',
          left: '-10%',
          width: '50vw',
          height: '50vw',
          background: 'radial-gradient(circle, rgba(198,161,91,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container">
        {/* Gold line top */}
        <div
          ref={lineRef}
          style={{
            height: '1px',
            background: 'linear-gradient(90deg, var(--color-gold-dim), transparent)',
            marginBottom: '4rem',
            transformOrigin: 'left',
          }}
          aria-hidden="true"
        />

        <div className="luxury-intro-grid">
          {/* Left — headline */}
          <div ref={leftRef} style={{ opacity: 0 }}>
            <p className="label" style={{ marginBottom: '2rem' }}>The Experience</p>
            <h2
              id="luxury-intro-heading"
              className="display-xl"
              style={{ color: 'var(--color-cream)' }}
            >
              MORE<br />
              THAN<br />
              A RIDE.<br />
              <span
                style={{
                  color: 'var(--color-gold)',
                  fontStyle: 'italic',
                  display: 'block',
                  marginTop: '0.5rem',
                }}
              >
                IT'S AN<br />
                ARRIVAL.
              </span>
            </h2>
          </div>

          {/* Right — copy + image */}
          <div ref={rightRef} style={{ opacity: 0 }}>
            <div
              style={{
                width: '40px',
                height: '1px',
                background: 'var(--color-gold)',
                marginBottom: '2.5rem',
              }}
              aria-hidden="true"
            />
            <p
              className="body-lg"
              style={{ maxWidth: '520px', marginBottom: '2.5rem', fontSize: 'clamp(1rem, 1.8vw, 1.3rem)', lineHeight: 2 }}
            >
              "The Toyota Fortuner Legender brings together commanding presence, premium
              comfort and an unmistakable road presence — making every journey feel like
              an occasion."
            </p>

            {/* Feature pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '2rem' }}>
              {['Premium Comfort', 'Commanding Presence', 'Refined Elegance', 'Memorable Arrivals'].map((pill) => (
                <span
                  key={pill}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.65rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--color-gold)',
                    border: '1px solid rgba(198,161,91,0.3)',
                    borderRadius: '2px',
                    padding: '0.5rem 1rem',
                  }}
                >
                  {pill}
                </span>
              ))}
            </div>

            {/* Big editorial number */}
            <p
              aria-hidden="true"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(6rem, 12vw, 16rem)',
                fontWeight: 300,
                color: 'rgba(198,161,91,0.06)',
                lineHeight: 0.8,
                marginTop: '2rem',
                letterSpacing: '-0.05em',
                userSelect: 'none',
              }}
            >
              FL
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LuxuryIntro;
