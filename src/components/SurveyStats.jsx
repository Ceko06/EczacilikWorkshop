const CITY_STATS = [
  { city: 'Diyarbakır', pct: 14.2, icon: 'diyarbakır.png' },
  { city: 'Van', pct: 12.6, icon: 'van.png' },
  { city: 'Erzurum', pct: 10.2, icon: 'erzurum.png' },
  { city: 'Gaziantep', pct: 9.7, icon: 'gaziantep.png' },
  { city: 'Elazığ', pct: 8.5, icon: 'elazığ.png' },
  { city: 'Malatya', pct: 7.3, icon: 'Malatya.png' },
  { city: 'Ağrı', pct: 6.1, icon: 'ağrı.png' },
  { city: 'Mardin', pct: 7.1, icon: 'mardin.png' },
  { city: 'Batman', pct: 4.2, icon: 'batman.png' },
  { city: 'Siirt', pct: 3.4, icon: 'siirt.png' },
  { city: 'Şırnak', pct: 2.9, icon: 'şırnak.png' },
  { city: 'Erzincan', pct: 4.8, icon: 'erzincan.png' },
]

const TOTAL = '1.248'
const CITY_COUNT = CITY_STATS.length

const fmt = (n) => `%${n.toFixed(1).replace('.', ',')}`

const DONUT_DATA = [
  { city: 'Diyarbakır', pct: 14.2, color: '#d90429' },
  { city: 'Van', pct: 12.6, color: '#131826' },
  { city: 'Erzurum', pct: 10.2, color: '#d7dbe2' },
]

function Donut() {
  return (
    <div className="donut-figure">
      <img className="donut-svg" src="/segmented%20donut.svg" alt="" aria-hidden="true" />
      <div className="donut-center">
        <span className="donut-cap">Toplam Katılım</span>
        <span className="donut-total">{TOTAL}</span>
        <span className="donut-cap">Eczane</span>
      </div>
    </div>
  )
}

export default function SurveyStats() {
  const legend = DONUT_DATA
  const maxPct = Math.max(...CITY_STATS.map((c) => c.pct))

  return (
    <section className="stats-section">
      <div className="container">
        <div className="stats-card">
          <div className="stats-head">
            <span className="stats-head-icon">
              <svg viewBox="0 0 24 24" width="18" height="18">
                <path d="M4 20V10M9.5 20V6M15 20v-8M20.5 20V4M3 20h18" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
              </svg>
            </span>
            <div>
              <h2 className="stats-title">Ankete Katılım – İllere Göre Dağılım</h2>
              <p className="stats-sub">Katılım sağlayan eczanelerin illere göre oranları</p>
            </div>
          </div>

          <div className="stats-body">
            <div className="stats-left">
              <div className="donut-wrap">
                <Donut />
                <ul className="donut-legend">
                  {legend.map((l) => (
                    <li key={l.city}>
                      <span className="legend-dot" style={{ background: l.color }} />
                      {l.city} · {fmt(l.pct)}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="stats-pill">
                <svg viewBox="0 0 24 24" width="16" height="16">
                  <circle cx="9" cy="8" r="3" fill="none" stroke="currentColor" strokeWidth="1.7" />
                  <path d="M3.5 19c.7-3 2.8-4.6 5.5-4.6S13.8 16 14.5 19" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                  <circle cx="17" cy="9" r="2.3" fill="none" stroke="currentColor" strokeWidth="1.7" />
                  <path d="M16 14.5c2.2.2 3.8 1.7 4.4 4.3" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                </svg>
                {CITY_COUNT} İl Katılım Sağladı
              </div>
            </div>

            <div className="stats-grid">
              {CITY_STATS.map((c) => (
                <div className="stat-item" key={c.city}>
                  <div className="stat-top">
                    <img className="stat-icon" src={`/il-ikonlar/${encodeURIComponent(c.icon)}`} alt="" aria-hidden="true" />
                    <span className="stat-city">{c.city}</span>
                    <span className="stat-pct">{fmt(c.pct)}</span>
                  </div>
                  <div className="stat-bar">
                    <span style={{ width: `${(c.pct / maxPct) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
