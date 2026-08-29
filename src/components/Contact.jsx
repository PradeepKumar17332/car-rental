import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { business } from '../data/site';

gsap.registerPlugin(ScrollTrigger);

function Contact() {
  const sectionRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        innerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
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
      id="contact"
      className="contact-section"
      aria-labelledby="contact-heading"
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '60vw',
          height: '60vh',
          background: 'radial-gradient(circle, rgba(198,161,91,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div ref={innerRef} style={{ opacity: 0 }}>
          <p className="label" style={{ marginBottom: '2rem' }}>Get in Touch</p>

          <h2
            id="contact-heading"
            className="display-md"
            style={{
              color: 'var(--color-white)',
              lineHeight: 1.1,
              marginBottom: '0',
            }}
          >
            LET'S MAKE<br />
            YOUR ARRIVAL<br />
            <span style={{ color: 'var(--color-gold)', fontStyle: 'italic' }}>
              MEMORABLE.
            </span>
          </h2>

          {/* Phone number */}
          <a
            href={business.phoneHref}
            className="contact-phone"
            aria-label={`Call us at ${business.phone}`}
          >
            {business.phone}
          </a>

          {/* Action buttons */}
          <div className="contact-actions">
            <a
              href={business.phoneHref}
              className="btn btn-secondary btn-lg"
              aria-label={`Call us at ${business.phone}`}
              id="contact-call-btn"
              style={{ minWidth: '180px', justifyContent: 'center' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.59 3.47 2 2 0 0 1 3.56 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.72a16 16 0 0 0 6 6l.88-.88a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              Call
            </a>

            <a
              href={business.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-lg"
              aria-label="Contact us on WhatsApp"
              id="contact-whatsapp-btn"
              style={{ minWidth: '180px', justifyContent: 'center' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.552 4.118 1.522 5.855L0 24l6.304-1.506A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.37l-.36-.213-3.72.888.916-3.618-.233-.373A9.818 9.818 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
