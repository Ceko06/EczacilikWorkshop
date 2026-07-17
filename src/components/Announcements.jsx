import { useState } from 'react'

const NEWS = [
  {
    date: '15 MAYIS 2024',
    title: 'Erzurum’da Yapay Zeka Atölyemizi Gerçekleştirdik!',
    text: 'Yoğun katılım ve verimli oturumlarla tamamlandı. Eczacılığın geleceğini birlikte inşa etmeye devam ediyoruz.',
  },
  {
    date: '21 HAZİRAN 2024',
    title: 'Sıradaki Durak: Doğubayazıt / Ağrı',
    text: 'İshak Paşa Sarayı’nda gerçekleşecek atölye buluşmamızda tüm eczacılarımızı aramızda görmekten mutluluk duyarız.',
  },
]

export default function Announcements() {
  const [active, setActive] = useState(0)
  const item = NEWS[active]

  return (
    <section className="news-section">
      <div className="container">
        <h2 className="section-heading">DUYURULAR</h2>
        <div className="carousel">
          <button
            className="carousel-arrow left"
            aria-label="Önceki duyuru"
            onClick={() => setActive((a) => (a + NEWS.length - 1) % NEWS.length)}
          >
            ←
          </button>
          <div className="news-card">
            <div className="news-media" />
            <div className="news-body">
              <p className="news-date">{item.date}</p>
              <h3 className="news-title">{item.title}</h3>
              <p className="news-text">{item.text}</p>
              <button type="button" className="btn-outline">
                Devamını Oku
              </button>
            </div>
          </div>
          <button
            className="carousel-arrow right"
            aria-label="Sonraki duyuru"
            onClick={() => setActive((a) => (a + 1) % NEWS.length)}
          >
            →
          </button>
        </div>
        <div className="carousel-dots">
          {NEWS.map((n, i) => (
            <button
              key={n.date}
              className={`dot-btn${i === active ? ' active' : ''}`}
              onClick={() => setActive(i)}
              aria-label={`Duyuru ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
