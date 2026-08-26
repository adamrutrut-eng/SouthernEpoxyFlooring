import business from '@/content/business.json';

const isTodo = (v: unknown) =>
  typeof v !== 'string' || v.length === 0 || v.toUpperCase().includes('TODO');

const cities = (business.serviceCities as string[]).filter((c) => !isTodo(c));

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid rgba(255,255,255,0.07)',
        padding: '2.5rem 1.5rem 3rem',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem 3rem',
          alignItems: 'baseline',
          justifyContent: 'space-between',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-fraunces), serif',
            color: '#F2EFEA',
            fontSize: '1rem',
            fontWeight: 400,
          }}
        >
          {business.name}
        </p>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem 2rem',
            color: '#8B8B8B',
            fontSize: '0.82rem',
            fontWeight: 300,
          }}
        >
          {!isTodo(business.phone) && (
            <a
              href={`tel:${business.phone.replace(/[^+\d]/g, '')}`}
              style={{
                color: '#DDD8D2',
                textDecoration: 'none',
                padding: '0.6rem 0',
                display: 'inline-block',
              }}
            >
              {business.phone}
            </a>
          )}
          <a
            href={`mailto:${business.email}`}
            style={{
              color: '#DDD8D2',
              textDecoration: 'none',
              padding: '0.6rem 0',
              display: 'inline-block',
            }}
          >
            {business.email}
          </a>
          <span>
            Serving {cities.length > 0 ? `${cities.join(', ')} — ` : ''}
            {business.state}
          </span>
        </div>
      </div>
    </footer>
  );
}
