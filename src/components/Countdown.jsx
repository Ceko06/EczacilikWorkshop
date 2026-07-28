import { useEffect, useState } from 'react'

const TARGET = new Date('2026-08-15T09:00:00+03:00')

function diff() {
  const ms = Math.max(0, TARGET - new Date())
  return {
    gun: Math.floor(ms / 86400000),
    saat: Math.floor((ms / 3600000) % 24),
    dakika: Math.floor((ms / 60000) % 60),
    saniye: Math.floor((ms / 1000) % 60),
  }
}

export default function Countdown() {
  const [t, setT] = useState(diff())

  useEffect(() => {
    const id = setInterval(() => setT(diff()), 1000)
    return () => clearInterval(id)
  }, [])

  const items = [
    { value: t.gun, label: 'GÜN' },
    { value: t.saat, label: 'SAAT' },
    { value: t.dakika, label: 'DAKİKA' },
    { value: t.saniye, label: 'SANİYE' },
  ]

  return (
    <section className="countdown-section">
      <div className="container countdown-wrap">
      <div className="countdown-card">
        <div className="countdown-left">
          <p className="countdown-title">ATÖLYEYE KALAN SÜRE</p>
          <div className="countdown-items">
            {items.map((it, i) => (
              <div className="countdown-item" key={it.label}>
                <div className="cd-block">
                  <span className="cd-value">{String(it.value).padStart(2, '0')}</span>
                  <span className="cd-label">{it.label}</span>
                </div>
                {i < items.length - 1 && <span className="cd-sep" />}
              </div>
            ))}
          </div>
        </div>
        <div className="countdown-divider" />
        <div className="countdown-right">
          <p className="event-date">
            <strong>15 Ağustos 2026</strong> <span className="mid-dot">·</span> Cumartesi
          </p>
          <p className="event-place">
            İshak Paşa Sarayı <span className="mid-dot">·</span> Doğubayazıt / Ağrı
          </p>
          <p className="event-time">
            09:00 – 17:00 <span className="muted">Etkinlik saatleri arasında</span>
          </p>
        </div>
        </div>
      </div>
    </section>
  )
}
