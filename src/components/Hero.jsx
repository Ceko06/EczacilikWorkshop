import { useEffect, useState } from 'react'

const SLIDES = [
  {
    image: '/hero-img.png',
    eyebrow: 'DOĞU VE GÜNEYDOĞU ECZACILARI',
    title: (
      <>
        Eczacılıkta
        <br />
        Yapay Zeka
        <br />
        <span className="accent">Atölye Buluşmaları</span>
      </>
    ),
    desc: (
      <>
        Yapay zekanın gücüyle bilgiye, deneyime ve geleceğe
        <br />
        dokunacağımız özel bir buluşmaya davetlisiniz.
      </>
    ),
  },
  {
    image: '/hero-img2.png',
    eyebrow: 'DOĞU VE GÜNEYDOĞU ECZACILARI',
    title: (
      <>
        Eczacılığın
        <br />
        Geleceğini
        <br />
        <span className="accent">Birlikte Tasarlıyoruz</span>
      </>
    ),
    desc: (
      <>
        Doğu ve Güneydoğu Eczacı Odaları&rsquo;nın görüşleriyle
        <br />
        şekillenecek yapay zeka atölyesinde, mesleğin geleceğini
        <br />
        birlikte konuşacağız.
      </>
    ),
  },
]

export default function Hero() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setActive((a) => (a + 1) % SLIDES.length)
    }, 7000)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="hero">
      {SLIDES.map((s, i) => (
        <div key={s.image} className={`hero-slide${i === active ? ' active' : ''}`}>
          <div className="hero-bg" style={{ backgroundImage: `url('${s.image}')` }} />
          <div className="hero-overlay" />
          <div className="container hero-content">
            <p className="hero-eyebrow">{s.eyebrow}</p>
            <h1 className="hero-title">{s.title}</h1>
            <p className="hero-desc">{s.desc}</p>
            <a href="#anket" className="btn-primary hero-btn">
              Ankete Başla <span className="btn-arrow">→</span>
            </a>
          </div>
        </div>
      ))}
      <div className="hero-dots">
        {SLIDES.map((s, i) => (
          <button
            key={s.image}
            className={`dot-btn${i === active ? ' active' : ''}`}
            onClick={() => setActive(i)}
            aria-label={`Slayt ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
