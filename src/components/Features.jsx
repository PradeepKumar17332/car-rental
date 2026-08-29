import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    number: '01',
    title: 'Commanding Presence',
    desc: 'A bold silhouette that commands attention — designed to stand apart from every other vehicle on the road.',
  },
  {
    number: '02',
    title: 'Premium Experience',
    desc: 'A refined, immersive environment for important journeys, ensuring every moment inside feels as good as the arrival.',
  },
  {
    number: '03',
    title: 'Effortless Arrival',
    desc: "Make every entrance feel memorable. Whether it's a celebration or a special occasion, arrive in style.",
  },
  {
    number: '04',
    title: 'Versatile Journeys',
    desc: 'Equally at home in the city or on the open road — ideal for celebrations, events and every special occasion.',
  },
  {
    number: '05',
    title: 'Wedding Ready',
    desc: 'Transform the Fortuner into a premium wedding arrival with elegant floral decoration tailored to your day.',
  },
];

function Features() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            delay: i * 0.1,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              once: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      style={{
        background: 'var(--color-charcoal)',
        padding: 'var(--space-2xl) 0',
        position: 'relative',
        overflow: 'hidden',
      }}
      aria-labelledby="features-heading"
    >
      {/* BG texture */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Decorative large text */}
      <p
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '-2rem',
          right: '-1rem',
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(8rem, 18vw, 24rem)',
          fontWeight: 300,
          color: 'rgba(198,161,91,0.03)',
          lineHeight: 1,
          userSelect: 'none',
          pointerEvents: 'none',
          letterSpacing: '-0.04em',
        }}
      >
        LEGENDER
      </p>

      <div className="container">
        {/* Heading */}
        <div ref={headingRef} style={{ opacity: 0, marginBottom: '3.5rem' }}>
          <p className="label" style={{ marginBottom: '1.5rem' }}>Why Choose the Legender</p>
          <h2
            id="features-heading"
            className="display-lg"
            style={{ color: 'var(--color-white)', maxWidth: '600px' }}
          >
            MADE TO MAKE<br />
            <span style={{ color: 'var(--color-gold)', fontStyle: 'italic' }}>AN ENTRANCE.</span>
          </h2>
        </div>

        {/* Cards grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}
          role="list"
        >
          {FEATURES.map((feature, i) => (
            <article
              key={feature.number}
              ref={(el) => (cardsRef.current[i] = el)}
              className="feature-card"
              style={{ opacity: 0 }}
              role="listitem"
            >
              <p className="feature-number" aria-hidden="true">{feature.number}</p>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-desc">{feature.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
