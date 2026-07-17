import { Logos } from './Header.jsx'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-logos">
          <Logos />
        </div>
        <div className="footer-center">
          <nav className="footer-links">
            <a href="#kvkk">KVKK Aydınlatma Metni</a>
            <a href="#gizlilik">Gizlilik Politikası</a>
            <a href="#iletisim">İletişim</a>
          </nav>
          <p className="footer-copy">© 2024 Kolaysoft Teknoloji. Tüm hakları saklıdır.</p>
        </div>
        <div className="footer-social">
          <a href="#linkedin" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" width="14" height="14">
              <path
                d="M6.5 8.5v9M6.5 5.5v.01M10.5 17.5v-5a3 3 0 0 1 6 0v5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </a>
          <a href="#instagram" aria-label="Instagram">
            <svg viewBox="0 0 24 24" width="14" height="14">
              <rect x="4" y="4" width="16" height="16" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
              <circle cx="12" cy="12" r="3.5" fill="none" stroke="currentColor" strokeWidth="2" />
              <circle cx="17" cy="7" r="1" fill="currentColor" />
            </svg>
          </a>
          <a href="#youtube" aria-label="YouTube">
            <svg viewBox="0 0 24 24" width="14" height="14">
              <path d="M9 8l7 4-7 4V8z" fill="currentColor" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  )
}
