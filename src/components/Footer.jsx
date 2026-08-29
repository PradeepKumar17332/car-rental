import { business } from '../data/site';

const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'The Legender', href: '#legender' },
  { label: 'Weddings', href: '#weddings' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

function Footer() {
  const handleClick = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-inner">
          {/* Brand */}
          <div>
            <p className="footer-brand-name">Fortuner Legender</p>
            <p className="footer-brand-sub">Luxury Rentals</p>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.85rem',
                color: 'var(--color-muted)',
                marginTop: '1.5rem',
                lineHeight: 1.7,
                maxWidth: '260px',
              }}
            >
              Premium Fortuner Legender rental and wedding car service.
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer navigation">
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.65rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'var(--color-gold)',
                marginBottom: '1.5rem',
              }}
            >
              Navigation
            </p>
            <ul className="footer-links" role="list">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="footer-link"
                    onClick={(e) => handleClick(e, link.href)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.65rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'var(--color-gold)',
                marginBottom: '1.5rem',
              }}
            >
              Contact
            </p>
            <a
              href={business.phoneHref}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.5rem',
                fontWeight: 400,
                color: 'var(--color-cream)',
                display: 'block',
                marginBottom: '1rem',
                transition: 'color 0.3s ease',
              }}
              onMouseEnter={(e) => (e.target.style.color = 'var(--color-gold)')}
              onMouseLeave={(e) => (e.target.style.color = 'var(--color-cream)')}
              aria-label={`Call us at ${business.phone}`}
            >
              {business.phone}
            </a>
            <a
              href={business.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.7rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--color-gold)',
                borderBottom: '1px solid rgba(198,161,91,0.3)',
                paddingBottom: '2px',
                transition: 'border-color 0.3s ease',
              }}
              aria-label="Contact us on WhatsApp"
            >
              WhatsApp ↗
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p className="footer-copy">
            © 2026 Fortuner Legender Luxury Rentals. All rights reserved.
          </p>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.65rem',
              color: 'rgba(244,240,231,0.2)',
              letterSpacing: '0.08em',
            }}
          >
            Not affiliated with Toyota Motor Corporation.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
