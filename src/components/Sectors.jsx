import { useState, useEffect, useRef } from 'react'

const SECTORS = [
  {
    label: 'SAĞLIK SEKTÖRÜ',
    image: '/sektörler/saglik.png',
    icon: (
      <svg viewBox="0 0 24 24" width="14" height="14">
        <path
          d="M12 20s-7-4.5-9-9c-1.3-3 1-7 4.5-7C10 4 12 6.5 12 6.5S14 4 16.5 4C20 4 22.3 8 21 11c-2 4.5-9 9-9 9z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: 'PERAKENDE SEKTÖRÜ',
    image: '/sektörler/perakende.png',
    icon: (
      <svg viewBox="0 0 24 24" width="14" height="14">
        <path
          d="M4 6h2l2.4 10.4a1 1 0 0 0 1 .6h7.9a1 1 0 0 0 1-.7L20 9H7"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <circle cx="10" cy="20" r="1.4" fill="currentColor" />
        <circle cx="17" cy="20" r="1.4" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'FİNANS SEKTÖRÜ',
    image: '/sektörler/finans.png',
    icon: (
      <svg viewBox="0 0 24 24" width="14" height="14">
        <path d="M5 20V10M10 20V4M15 20v-8M20 20V7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'İNSAN KAYNAKLARI',
    image: '/sektörler/ik.png',
    icon: (
      <svg viewBox="0 0 24 24" width="14" height="14">
        <circle cx="9" cy="8" r="3" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M3.5 20c.8-3.2 3-5 5.5-5s4.7 1.8 5.5 5" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="17" cy="9" r="2.4" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M16 15.4c2.3.2 4 1.8 4.6 4.6" fill="none" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
  },
]

function getVisible(w) {
  if (w <= 640) return 1
  if (w <= 900) return 2
  return 3
}

export default function Sectors() {
  const [active, setActive] = useState(0)
  const [visible, setVisible] = useState(3)
  const [offset, setOffset] = useState(0)
  const trackRef = useRef(null)

  const gap = visible === 1 ? 16 : 22
  const max = Math.max(0, SECTORS.length - visible)

  // Update visible count on resize
  useEffect(() => {
    const onResize = () => setVisible(getVisible(window.innerWidth))
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Keep active index within bounds when layout changes
  useEffect(() => {
    setActive((a) => Math.min(a, Math.max(0, SECTORS.length - visible)))
  }, [visible])

  // Measure real card width and compute pixel offset
  useEffect(() => {
    const compute = () => {
      const track = trackRef.current
      if (!track || !track.children[0]) return
      const cardW = track.children[0].getBoundingClientRect().width
      setOffset(active * (cardW + gap))
    }
    compute()
    window.addEventListener('resize', compute)
    return () => window.removeEventListener('resize', compute)
  }, [active, visible, gap])

  return (
    <section className="sectors-section">
      <div className="container">
        <h2 className="section-heading">
          FARKLI SEKTÖRLERDE GERÇEKLEŞTİRDİĞİMİZ YAPAY ZEKA ATÖLYELERİ
        </h2>
        <div className="carousel">
          <button
            className="carousel-arrow left"
            aria-label="Önceki"
            disabled={active === 0}
            onClick={() => setActive((a) => Math.max(0, a - 1))}
          >
            ←
          </button>
          <div className="sector-viewport">
            <div
              className="sector-track"
              ref={trackRef}
              style={{ '--visible': visible, '--gap': `${gap}px`, transform: `translateX(${-offset}px)` }}
            >
              {SECTORS.map((s) => (
                <div className="sector-card" key={s.label}>
                  <img className="sector-img" src={s.image} alt={s.label} />
                  <div className="sector-label">
                    <span className="sector-icon">{s.icon}</span>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            className="carousel-arrow right"
            aria-label="Sonraki"
            disabled={active === max}
            onClick={() => setActive((a) => Math.min(max, a + 1))}
          >
            →
          </button>
        </div>
        <div className="carousel-dots">
          {Array.from({ length: max + 1 }).map((_, i) => (
            <button
              key={i}
              className={`dot-btn${i === active ? ' active' : ''}`}
              onClick={() => setActive(i)}
              aria-label={`Slayt ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
