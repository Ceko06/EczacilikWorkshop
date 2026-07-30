const CITY_STATS = [
  { city: 'Diyarbakır', pct: 14.2 },
  { city: 'Van', pct: 12.6 },
  { city: 'Erzurum', pct: 10.2 },
  { city: 'Gaziantep', pct: 9.7 },
  { city: 'Elazığ', pct: 8.5 },
  { city: 'Malatya', pct: 7.3 },
  { city: 'Ağrı', pct: 6.1 },
  { city: 'Mardin', pct: 7.1 },
  { city: 'Batman', pct: 4.2 },
  { city: 'Siirt', pct: 3.4 },
  { city: 'Şırnak', pct: 2.9 },
  { city: 'Erzincan', pct: 4.8 },
]

const TOTAL = '1.248'
const CITY_COUNT = CITY_STATS.length

const fmt = (n) => `%${n.toFixed(1).replace('.', ',')}`

function CityIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path d="M4 21V9l4-2v14M8 21V5l5-2v18M13 21V8l4 2v11M3 21h18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  )
}

function Donut() {
  const R = 58
  const STROKE = 16
  const C = 2 * Math.PI * R
  const sum = CITY_STATS.reduce((s, c) => s + c.pct, 0)
  const colorFor = (i) => (i === 0 ? '#d90429' : i === 1 ? '#16181d' : i === 2 ? '#c3c7cf' : '#e9ebee')

  let acc = 0
  const segs = CITY_STATS.map((c, i) => {
    const len = (c.pct / sum) * C
    const seg = { len, offset: acc, color: colorFor(i), city: c.city }
    acc += len
    return seg
  })

  return (
    <svg className="stats-donut" viewBox="0 0 150 150" width="170" height="170">
      <g transform="rotate(-90 75 75)">
        {segs.map((s) => {
          const dash = Math.max(s.len - 1.5, 0)
          return (
            <circle
              key={s.city}
              cx="75"
              cy="75"
              r={R}
              fill="none"
              stroke={s.color}
              strokeWidth={STROKE}
              strokeDasharray={`${dash} ${C - dash}`}
              strokeDashoffset={-s.offset}
            />
          )
        })}
      </g>
      <text className="donut-cap" x="75" y="62" textAnchor="middle">Toplam Katılım</text>
      <text className="donut-total" x="75" y="82" textAnchor="middle">{TOTAL}</text>
      <text className="donut-cap" x="75" y="97" textAnchor="middle">Eczane</text>
    </svg>
  )
}

export default function SurveyStats() {
  const maxPct = Math.max(...CITY_STATS.map((c) => c.pct))
  const legend = [
    { city: 'Diyarbakır', pct: 14.2, color: '#d90429' },
    { city: 'Van', pct: 12.6, color: '#16181d' },
    { city: 'Erzurum', pct: 10.2, color: '#c3c7cf' },
  ]

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
                    <span className="stat-icon"><CityIcon /></span>
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
