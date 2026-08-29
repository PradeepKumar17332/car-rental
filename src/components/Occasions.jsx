import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const OCCASIONS = [
  {
    icon: '💍',
    title: 'Weddings',
    subtitle: 'Groom Arrival & Decoration',
    desc: 'Make your groom arrival memorable with a vehicle that turns heads and sets the tone for the entire occasion.',
  },
  {
    icon: '✨',
    title: 'Special Events',
    subtitle: 'Arrive With Confidence',
    desc: 'Arrive with confidence and presence at any event. The Fortuner ensures your entrance is as impressive as the occasion itself.',
  },
  {
    icon: '👨‍👩‍👧‍👦',
    title: 'Family Occasions',
    subtitle: 'Premium Family Travel',
    desc: 'Premium travel for important celebrations. Comfortable, commanding and perfect for moments that matter to the whole family.',
  },
  {
    icon: '🛣️',
    title: 'City & Outstation',
    subtitle: 'Journeys That Matter',
    desc: 'A premium vehicle for any journey — from city drives to outstation trips, every kilometre in the Fortuner feels purposeful.',
  },
];

function Occasions() {
  const sectionRef = useRef(null);
  const headRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 60, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            delay: i * 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
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
        background: 'var(--color-black)',
        padding: 'var(--space-2xl) 0',
        position: 'relative',
        overflow: 'hidden',
      }}
      aria-labelledby="occasions-heading"
    >
      <div className="container">
        {/* Heading */}
        <div ref={headRef} style={{ opacity: 0, marginBottom: '5rem', textAlign: 'center' }}>
          <p className="label" style={{ marginBottom: '1.5rem' }}>One Legender</p>
          <h2
            id="occasions-heading"
            className="display-lg"
            style={{ color: 'var(--color-white)', lineHeight: 1 }}
          >
            ONE LEGENDER.<br />
            <span style={{ color: 'var(--color-gold)', fontStyle: 'italic' }}>
              MANY OCCASIONS.
            </span>
          </h2>
        </div>

        {/* Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.5rem',
          }}
          role="list"
        >
          {OCCASIONS.map((item, i) => (
            <article
              key={item.title}
              ref={(el) => (cardsRef.current[i] = el)}
              className="occasion-card"
              style={{ opacity: 0 }}
              role="listitem"
            >
              {/* Icon */}
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'rgba(198,161,91,0.08)',
                  border: '1px solid rgba(198,161,91,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  marginBottom: '2rem',
                }}
                aria-hidden="true"
              >
                {item.icon}
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--color-gold)',
                  marginBottom: '0.6rem',
                }}
              >
                {item.title}
              </h3>

              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.5rem',
                  fontWeight: 400,
                  color: 'var(--color-white)',
                  marginBottom: '1.2rem',
                  lineHeight: 1.2,
                }}
              >
                {item.subtitle}
              </p>

              <p className="feature-desc">{item.desc}</p>

              {/* Bottom accent */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: '2.5rem',
                  width: '40px',
                  height: '2px',
                  background: 'var(--color-gold-dim)',
                  borderRadius: '1px',
                  opacity: 0.5,
                }}
                aria-hidden="true"
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Occasions;
