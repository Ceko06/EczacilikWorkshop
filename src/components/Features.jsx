const FEATURES = [
  {
    title: 'Güncel Trendler',
    desc: 'Yapay zekadaki son gelişmeler',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22">
        <path
          d="M12 3.5c-1.8 0-3 1.2-3.2 2.6-1.5.2-2.6 1.4-2.6 2.9 0 .5.1 1 .4 1.4-.9.5-1.6 1.5-1.6 2.7 0 1.3.8 2.4 1.9 2.8 0 1.7 1.4 3.1 3.1 3.1.8 0 1.5-.3 2-.8V4.2c0-.4-.3-.7 0-.7z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M12 3.5c1.8 0 3 1.2 3.2 2.6 1.5.2 2.6 1.4 2.6 2.9 0 .5-.1 1-.4 1.4.9.5 1.6 1.5 1.6 2.7 0 1.3-.8 2.4-1.9 2.8 0 1.7-1.4 3.1-3.1 3.1-.8 0-1.5-.3-2-.8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path d="M12 3.8v16" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    title: 'Deneyimli Eğitmen',
    desc: 'Gerçek hayat senaryoları',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22">
        <circle cx="12" cy="6" r="2.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="6" cy="9" r="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="18" cy="9" r="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M8.5 19c.4-2.6 1.8-4.2 3.5-4.2s3.1 1.6 3.5 4.2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path d="M2.8 17.5c.4-2.2 1.6-3.6 3.2-3.6.6 0 1.2.2 1.7.6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M21.2 17.5c-.4-2.2-1.6-3.6-3.2-3.6-.6 0-1.2.2-1.7.6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'İçgörü',
    desc: 'Deneyim alışverişi',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22">
        <path d="M4 20h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <rect x="6" y="12" width="3" height="8" rx="0.8" fill="currentColor" />
        <rect x="10.5" y="8" width="3" height="12" rx="0.8" fill="currentColor" />
        <rect x="15" y="4" width="3" height="16" rx="0.8" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: 'Geleceğe Hazırlık',
    desc: 'Dijital dönüşüme uyum',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22">
        <path
          d="M20 12a8 8 0 1 1-4.5-7.2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M16.5 12a4.5 4.5 0 1 1-2.6-4.1"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <circle cx="12" cy="12" r="1.3" fill="currentColor" />
        <path d="M12 12l6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M18 6h2.5M18 6V3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
]

export default function Features() {
  return (
    <section className="features-section">
      <div className="container features-grid">
        {FEATURES.map((f) => (
          <div className="feature" key={f.title}>
            <span className="feature-icon">{f.icon}</span>
            <h3 className="feature-title">{f.title}</h3>
            <p className="feature-desc">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
