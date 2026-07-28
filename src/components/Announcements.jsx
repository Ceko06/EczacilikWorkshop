import { useState } from 'react'

const NEWS = [
  {
    category: 'Teknoloji ve İnovasyon',
    title: 'Üretken Yapay Zekâ Yeni Çalışma Modelleri Oluşturuyor',
    text: 'Üretken yapay zekâ araçları; içerik üretiminden kurumsal bilgi yönetimine kadar farklı süreçlerde daha hızlı, kişiselleştirilmiş ve ölçeklenebilir çalışma modelleri geliştiriyor.',
    image: '/duyurular/48e2ea9548530f3bb207086fe9ad866bee377f21.png',
  },
  {
    category: 'Yapay Zekâ Atölyesi',
    title: 'Eczacılıkta Yapay Zekânın Geleceğini Birlikte Konuşuyoruz',
    text: 'Eczacılık sektöründe yapay zekâ kullanım alanlarını, sahadaki ihtiyaçları ve geleceğin dijital çözümlerini değerlendireceğimiz atölye çalışmamız için hazırlıklarımız devam ediyor.',
    image: '/duyurular/d91e240db75e274ce9b5a9f35e279375fe9f88bd.png',
  },
  {
    category: 'Yapay Zekâ Gündemi',
    title: 'Yapay Zekâ, Sağlık Sektöründeki İş Süreçlerini Dönüştürüyor',
    text: 'Yapay zekâ destekli sistemler; veri analizi, karar desteği, stok yönetimi ve kullanıcı deneyimi gibi birçok alanda sağlık profesyonellerine yeni imkânlar sunuyor.',
    image: '/duyurular/bcd3c56e09a95283b79afda7f7ad27acb42fab00.png',
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
            <div className="news-media">
              <img className="news-img" src={item.image} alt={item.title} />
            </div>
            <div className="news-body">
              <p className="news-date">{item.category}</p>
              <h3 className="news-title">{item.title}</h3>
              <p className="news-text">{item.text}</p>
              <button type="button" className="btn-outline">
                Devamını Oku →
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
              key={n.title}
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
