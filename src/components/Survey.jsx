import { useState } from 'react'

const CITIES = [
  'Ağrı', 'Bitlis', 'Diyarbakır', 'Elazığ', 'Erzincan', 'Erzurum', 'Gaziantep',
  'Hakkari', 'Iğdır', 'Kars', 'Malatya', 'Mardin', 'Muş', 'Siirt', 'Şanlıurfa', 'Van',
]

function Star({ filled, ...props }) {
  return (
    <button type="button" className={`star${filled ? ' filled' : ''}`} {...props}>
      <svg viewBox="0 0 24 24" width="22" height="22">
        <path
          d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.5L12 17.3l-5.9 3.2 1.3-6.5-4.9-4.6 6.6-.8L12 2.5z"
          fill={filled ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}

export default function Survey() {
  const [rating, setRating] = useState(0)
  const [form, setForm] = useState({ eczane: '', sehir: '', ad: '', tel: '' })

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()
    alert('Anketiniz gönderildi. Teşekkür ederiz!')
  }

  return (
    <section className="survey-section" id="anket">
      <div className="container">
        <form className="survey-card" onSubmit={onSubmit}>
          <h2 className="survey-title">ATÖLYE ANKETİ</h2>
          <p className="survey-sub">
            Görüşleriniz bizim için çok değerli. Lütfen aşağıdaki formu doldurunuz.
          </p>

          <div className="survey-grid">
            <div className="field">
              <label htmlFor="eczane">Eczane Adı</label>
              <input
                id="eczane"
                name="eczane"
                type="text"
                placeholder="Eczanenizin adı"
                value={form.eczane}
                onChange={onChange}
              />
            </div>
            <div className="field">
              <label htmlFor="sehir">Şehir</label>
              <select id="sehir" name="sehir" value={form.sehir} onChange={onChange}>
                <option value="">Şehrinizi seçin</option>
                {CITIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="ad">Eczacı Adı Soyadı</label>
              <input
                id="ad"
                name="ad"
                type="text"
                placeholder="Adınız Soyadınız"
                value={form.ad}
                onChange={onChange}
              />
            </div>
            <div className="field field-phone">
              <label htmlFor="tel">İletişim Numarası</label>
              <input
                id="tel"
                name="tel"
                type="tel"
                placeholder="Telefon numaranız"
                value={form.tel}
                onChange={onChange}
              />
            </div>
            <div className="field field-rating">
              <span className="rating-label">Atölyemizi nasıl değerlendirirsiniz?</span>
              <div className="stars">
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star
                    key={n}
                    filled={n <= rating}
                    onClick={() => setRating(n)}
                    aria-label={`${n} yıldız`}
                  />
                ))}
              </div>
            </div>
          </div>

          <button type="submit" className="btn-submit">
            ANKETİ GÖNDER
            <svg viewBox="0 0 24 24" width="16" height="16" className="send-icon">
              <path
                d="M21.5 3.5 2.8 10.4a.6.6 0 0 0 .05 1.14l6.6 1.9 1.9 6.6a.6.6 0 0 0 1.14.05L19.4 3.4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <path d="M21.5 3.5 9.5 13.4" fill="none" stroke="currentColor" strokeWidth="1.8" />
            </svg>
          </button>

          <p className="survey-privacy">
            <svg viewBox="0 0 24 24" width="13" height="13" className="lock-icon">
              <rect x="5" y="10" width="14" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M8 10V7a4 4 0 0 1 8 0v3" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
            Verileriniz gizli tutulur ve yalnızca bu atölye kapsamında kullanılacaktır.
          </p>
        </form>
      </div>
    </section>
  )
}
