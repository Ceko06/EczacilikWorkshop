const FEATURES = [
  {
    title: 'Güncel Trendler',
    desc: 'Yapay zekadaki son gelişmeler',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20">
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="4" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: 'Deneyimli Eğitmen',
    desc: 'Gerçek hayat senaryoları',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20">
        <circle cx="12" cy="8" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M5 21c1-4 4-6 7-6s6 2 7 6" fill="none" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    title: 'İçgörü',
    desc: 'Deneyim alışverişi',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20">
        <rect x="5" y="4" width="14" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M9 4v16M15 4v16" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    title: 'Geleceğe Hazırlık',
    desc: 'Dijital dönüşüme uyum',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20">
        <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
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
