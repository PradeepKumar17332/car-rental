import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MOMENTS = [
  {
    number: '01',
    title: 'The Arrival',
    desc:
      'Pull up to the venue in a vehicle that commands the space. The Fortuner Legender ensures your first impression is one that lasts.',
  },
  {
    number: '02',
    title: 'The Ceremony',
    desc:
      'Elegantly dressed and beautifully detailed, the vehicle becomes part of the story — a memory captured in every photograph.',
  },
  {
    number: '03',
    title: 'The Celebration',
    desc:
      'From the ceremony to the reception, travel in comfort and style. Every moment of your day deserves to feel exceptional.',
  },
];

function WeddingSection() {
  const sectionRef = useRef(null);
  const headRef = useRef(null);
  const momentsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );

      momentsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: i * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
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
      style={{
        background: 'var(--color-dark)',
        padding: 'var(--space-2xl) 0',
        position: 'relative',
        overflow: 'hidden',
      }}
      aria-labelledby="wedding-section-heading"
    >
      {/* Large bg text */}
      <p
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '5%',
          right: '-2rem',
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(6rem, 16vw, 22rem)',
          fontWeight: 300,
          color: 'rgba(198,161,91,0.03)',
          lineHeight: 1,
          userSelect: 'none',
          pointerEvents: 'none',
          letterSpacing: '-0.04em',
        }}
      >
        GROOM
      </p>

      <div className="container">
        {/* Heading */}
        <div
          ref={headRef}
          style={{ opacity: 0, textAlign: 'center', marginBottom: '3.5rem' }}
        >
          <p className="label" style={{ marginBottom: '2rem' }}>Wedding &amp; Groom Service</p>
          <h2
            id="wedding-section-heading"
            className="display-lg"
            style={{
              color: 'var(--color-white)',
              lineHeight: 1.05,
              maxWidth: '700px',
              margin: '0 auto',
            }}
          >
            FOR THE GROOM<br />
            WHO DESERVES<br />
            <span style={{ color: 'var(--color-gold)', fontStyle: 'italic' }}>AN ENTRANCE.</span>
          </h2>

          <p
            className="body-lg"
            style={{ maxWidth: '600px', margin: '2.5rem auto 0', lineHeight: 1.9 }}
          >
            "From the journey to the venue to the moment you arrive, the Fortuner Legender
            brings presence and elegance to one of the most important days of your life."
          </p>
        </div>

        {/* Gold divider */}
        <div className="gold-divider" style={{ marginBottom: '0' }} aria-hidden="true" />

        {/* Three moments */}
        <div className="wedding-moments" role="list">
          {MOMENTS.map((moment, i) => (
            <div
              key={moment.number}
              ref={(el) => (momentsRef.current[i] = el)}
              className="wedding-moment"
              style={{ opacity: 0 }}
              role="listitem"
            >
              <p
                className="wedding-moment-number"
                aria-hidden="true"
              >
                {moment.number}
              </p>
              <p className="label" style={{ marginBottom: '1.2rem' }}>{moment.title}</p>
              <p className="body-md">{moment.desc}</p>
            </div>
          ))}
        </div>

        {/* Gold divider bottom */}
        <div className="gold-divider" style={{ marginTop: '0' }} aria-hidden="true" />
      </div>
    </section>
  );
}

export default WeddingSection;
