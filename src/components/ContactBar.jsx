export default function ContactBar() {
  return (
    <section className="contact-bar" id="iletisim">
      <div className="container contact-inner">
        <div className="contact-item">
          <span className="contact-icon">
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path
                d="M5 4h4l2 5-2.5 1.5a12 12 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <div>
            <p className="contact-main">0850 250 40 10</p>
            <p className="contact-sub">Hafta içi 09:00 - 17:00</p>
          </div>
        </div>
        <div className="contact-item">
          <span className="contact-icon">
            <svg viewBox="0 0 24 24" width="18" height="18">
              <rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
              <path d="M3 7l9 6 9-6" fill="none" stroke="currentColor" strokeWidth="1.8" />
            </svg>
          </span>
          <div>
            <p className="contact-main">eczaciatolyesi@kolaysoft.com.tr</p>
            <p className="contact-sub">E-posta ile bize ulaşın</p>
          </div>
        </div>
        <div className="contact-item">
          <span className="contact-icon">
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path
                d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <circle cx="12" cy="10" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
            </svg>
          </span>
          <div>
            <p className="contact-main">Kolaysoft Teknoloji</p>
            <p className="contact-sub">Bilkent Cyberpark, Ankara</p>
          </div>
        </div>
      </div>
    </section>
  )
}
