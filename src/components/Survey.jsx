import { useState } from 'react'

const CITIES = [
  'Van', 'Mardin', 'Şırnak', 'Siirt', 'Ağrı', 'Erzurum',
  'Erzincan', 'Malatya', 'Elazığ', 'Diyarbakır', 'Gaziantep', 'Batman',
]

const STEPS = [
  'GENEL BİLGİLER VE KİMLİK',
  'FİNANSAL DURUM VE İŞLETME METRİKLERİ',
  'TEDARİK, STOK VE İLAÇ DIŞI ÜRÜNLER',
  'DANIŞMANLIK VE PERSONEL (KALFA) SÜREÇLERİ',
  'ECZANELER ARASI YASAL TAKAS VE ÜRÜN PAYLAŞIMI',
  'BÖLGESEL VE SEKTÖREL FAKTÖRLER',
  'ODADAN BEKLENTİLER VE GELECEK VİZYONU',
]

const TOTAL = STEPS.length

/* ---------- Small building blocks ---------- */

function QNumber({ n }) {
  return <span className="q-number">{n}.</span>
}

function RadioOption({ name, value, current, onChange, children }) {
  const active = current === value
  return (
    <label className={`opt-radio${active ? ' active' : ''}`}>
      <input type="radio" name={name} value={value} checked={active} onChange={() => onChange(value)} />
      <span className="dot" />
      <span className="opt-text">{children}</span>
    </label>
  )
}

function CheckOption({ checked, disabled, onToggle, children }) {
  return (
    <label className={`opt-check${checked ? ' active' : ''}${disabled ? ' disabled' : ''}`}>
      <input type="checkbox" checked={checked} disabled={disabled} onChange={onToggle} />
      <span className="box">
        <svg viewBox="0 0 24 24" width="13" height="13">
          <path d="M5 12.5l4.2 4.2L19 6.5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="opt-text">{children}</span>
    </label>
  )
}

function Segmented({ value, onChange, options }) {
  return (
    <div className="segmented">
      {options.map((o) => (
        <button
          type="button"
          key={o}
          className={`seg${value === o ? ' active' : ''}`}
          onClick={() => onChange(o)}
        >
          {o}
        </button>
      ))}
    </div>
  )
}

function ScaleRow({ label, value, onChange }) {
  return (
    <div className="scale-card">
      <span className="scale-label">{label}</span>
      <div className="scale-dots">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            type="button"
            key={n}
            className={`scale-dot${value === n ? ' active' : ''}`}
            onClick={() => onChange(n)}
          >
            {n}
          </button>
        ))}
      </div>
      <div className="scale-ends">
        <span>Yetersiz</span>
        <span>Çok Yeterli</span>
      </div>
    </div>
  )
}

/* ---------- Main component ---------- */

const initialForm = {
  // Step 1
  ad: '',
  deneyim: '',
  il: '',
  ilce: '',
  mahalle: '',
  eczaneAdi: '',
  personel: '',
  // Step 2
  karlilik: '',
  giderler: [], // max 3
  // Step 3
  guvenKaybi: [],
  guvenKaybiDiger: '',
  ilacDisi: '',
  ilacDisiDiger: '',
  tedarikAksaklik: '',
  tedarikAksaklikDiger: '',
  kontrolPaneli: '',
  // Step 4
  kalfaA: '',
  kalfaB: '',
  kalfaC: '',
  yetkinlikTeorik: 0,
  yetkinlikIletisim: 0,
  yetkinlikMevzuat: 0,
  // Step 5
  takasDurum: '',
  takasDurumDiger: '',
  takasKatki: '',
  platformSart: [], // max 2
  // Step 6
  cografiEtki: '',
  basvuru: '',
  // Step 7
  beklenti: '',
  teknolojiEtki: '',
  anaProblem: '',
}

const GIDER_OPTS = [
  'Yüksek iş yeri kirası',
  'Çalışan/personel giderleri ve SGK primleri',
  'Elektrik, doğalgaz vb. genel işletme giderleri',
  'Vergi yükü ve stopajlar',
  'İlaç Fiyat Kararnamesi (İFK) kaynaklı kâr baremi yetersizliği',
  'SGK kesintileri ve uzun geri ödeme vadeleri',
]

const GUVEN_OPTS = [
  'İlacın üretici/depo seviyesinde hiç olmaması',
  'Bölgedeki/yakındaki eczanelerde ilaç olmasına rağmen anlık stok bilgisine erişilememesi',
  'Eczaneler arası yasal ürün takası ve faturalandırma süreçlerinin karmaşık olması',
  'Hastaların ilaca ulaşamadığı için eczacıyı sorumlu tutması',
]

const ILAC_DISI_OPTS = [
  'Halk sağlığı açısından büyük bir tehdit oluşturmaktadır ve satış yetkisi tamamen eczanelere verilmelidir.',
  'Eczanelerin ekonomik sürdürülebilirliğini ve mesleki danışmanlık rolünü doğrudan baltalamaktadır.',
  'Denetimsiz ürünlerin piyasada dolaşmasına yol açmakta ve hasta güvenliğini tehlikeye atmaktadır.',
]

const TEDARIK_OPTS = [
  'Sahte/usulsüz reçete tespiti ve yönlendirme (reçete taşınması) riskleri',
  'Komisyonlar ve kurumlar arası iletişim/koordinasyon eksikliği',
  'Dağıtım kotalarının bölgesel ihtiyaçları karşılamaması',
  'Dağıtım süreçlerindeki şeffaflık eksikliği',
  'Süreçlerde herhangi bir sorun yaşamıyorum',
]

const TAKAS_DURUM_OPTS = [
  'Sık sık takas yapıyorum ancak manuel takip ve faturalandırma çok zamanımı alıyor.',
  'Takas yapmak istiyorum fakat İTS entegrasyonu ve yasal mevzuata uygunluk kaygıları yüzünden çekiniyorum.',
  'Takas yapacak yakındaki eczanelerle hızlı ve güvenli bir iletişim kanalım (platformum) yok.',
  'Eczaneler arası takas ihtiyacı duymuyorum.',
]

const TAKAS_KATKI_OPTS = [
  'Olmayan ilaca/ürüne hızlı ulaşmamı sağlar, hasta memnuniyetini artırır.',
  'Atıl/ölü stoklarımı eritmeme ve nakit akışımı düzeltmeme yardımcı olur.',
  'Faturalandırma ve muhasebe süreçlerindeki hataları ve hukuki riskleri ortadan kaldırır.',
  'Hepsi.',
]

const PLATFORM_OPTS = [
  'Uygulamanın İl Sağlık Müdürlüğü / Oda onaylı ve mevzuata %100 uyumlu olması',
  'İTS bildirimlerinin tek tıkla otomatik yapılması',
  'Kargo/Kurye entegrasyonu ile ürünün kapıdan alınıp kapıya teslim edilmesi',
  'Yakındaki eczanelerle anlık mesajlaşma/iletişim imkânı sunması',
  'Kullanımının son derece basit ve ücretsiz/uygun fiyatlı olması',
]

const BASVURU_OPTS = [
  'Bağlı olduğum Eczacı Odası',
  'İl/İlçe Sağlık Müdürlüğü',
  'Yakın meslektaşlarım / Sosyal medya-WhatsApp grupları',
  'Kimseye başvurmuyorum, kendi imkânlarımla çözüyorum',
]

const TEKNOLOJI_OPTS = [
  'Eczacının iş yükünü azaltacak ve mesleki rolünü güçlendirecektir.',
  'Doğru adapte olunmazsa geleneksel eczacılık modelini tehdit edecektir.',
  'Süreçlerin daha şeffaf ve denetlenebilir olmasını sağlayacaktır.',
  'Kararsızım.',
]

export default function Survey() {
  const [step, setStep] = useState(1)
  const [done, setDone] = useState(false)
  const [showErrors, setShowErrors] = useState(false)
  const [form, setForm] = useState(initialForm)

  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }))

  const toggleInArray = (key, value, max) => {
    setForm((f) => {
      const arr = f[key]
      if (arr.includes(value)) return { ...f, [key]: arr.filter((v) => v !== value) }
      if (max && arr.length >= max) return f
      return { ...f, [key]: [...arr, value] }
    })
  }

  // Required-field checks per step
  const step1Valid = form.deneyim && form.il && form.ilce.trim() && form.mahalle.trim()
  const step2Valid = form.karlilik
  const stepValid = step === 1 ? step1Valid : step === 2 ? step2Valid : true

  const goNext = () => {
    if (!stepValid) {
      setShowErrors(true)
      return
    }
    setShowErrors(false)
    const scrollToTop = () => {
      const el = document.getElementById('anket')
      const top = el ? el.getBoundingClientRect().top + window.scrollY - 20 : 0
      window.scrollTo({ top, behavior: 'smooth' })
    }
    if (step < TOTAL) {
      setStep(step + 1)
      scrollToTop()
    } else {
      setDone(true)
      requestAnimationFrame(scrollToTop)
    }
  }

  const goBack = () => {
    setShowErrors(false)
    if (step > 1) setStep(step - 1)
  }

  const err = (cond) => showErrors && cond

  if (done) {
    return (
      <section className="survey-section" id="anket">
        <div className="container">
          <div className="survey-success">
            <div className="success-icon">
              <svg viewBox="0 0 24 24" width="26" height="26">
                <path d="M5 12.5l4.3 4.3L19 6.5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 className="success-title">Katkılarınız için teşekkür ederiz.</h2>
            <p className="success-sub">
              Vermiş olduğunuz yanıtlar, bölgesel eczacılık vizyonumuzu şekillendirecek ve Atölye
              Çalıştayı'nda ortak akıl raporu olarak sunulacaktır.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="survey-section" id="anket">
      <div className="container">
        <div className="survey-card">
          <span className="survey-eyebrow">ATÖLYE ANKETİ</span>
          <h2 className="survey-title">
            ECZACILIK MESLEKİ MEVCUT DURUM, SORUNLAR VE BEKLENTİLER ANKETİ
          </h2>

          {step === 1 && (
            <>
              <p className="survey-sub">
                Bu anket, eczacılık mesleğinin mevcut durumunu, sahadaki sorunları ve gelecek
                beklentilerini anlamak için hazırlanmıştır. Yanıtlar yalnızca bölgesel ihtiyaçları
                değerlendirmek ve Atölye Çalıştayı içeriğini şekillendirmek amacıyla kullanılacaktır.
              </p>
              <div className="survey-notice">
                <svg viewBox="0 0 24 24" width="14" height="14" className="lock-icon">
                  <rect x="5" y="10" width="14" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
                  <path d="M8 10V7a4 4 0 0 1 8 0v3" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
                Kişisel bilgileriniz yalnızca bu araştırma kapsamında güvenli biçimde kullanılacaktır.
              </div>
            </>
          )}

          {/* Step meta + progress */}
          <div className="survey-stepmeta">
            <span className="step-index">Adım {step} / {TOTAL}</span>
            <span className="step-time">Tahmini süre: 3–4 dakika</span>
          </div>
          <h3 className="survey-section-title">{STEPS[step - 1]}</h3>
          <div className="survey-progress">
            <span style={{ width: `${(step / TOTAL) * 100}%` }} />
          </div>

          {/* ---------------- STEP 1 ---------------- */}
          {step === 1 && (
            <div className="q-list">
              <div className="q-block">
                <QNumber n={1} />
                <p className="q-title">Adınız - Soyadınız:</p>
                <input
                  className="q-input"
                  type="text"
                  placeholder="Adınızı ve soyadınızı yazınız"
                  value={form.ad}
                  onChange={(e) => set('ad', e.target.value)}
                />
              </div>

              <div className="q-block">
                <QNumber n={2} />
                <p className="q-title">Mesleki Deneyim Süreniz: <span className="req">*</span></p>
                <div className="opt-group">
                  {['0 - 5 yıl', '6 - 15 yıl', '16 - 25 yıl', '26 yıl ve üzeri'].map((o) => (
                    <RadioOption key={o} name="deneyim" value={o} current={form.deneyim} onChange={(v) => set('deneyim', v)}>
                      {o}
                    </RadioOption>
                  ))}
                </div>
              </div>

              <div className="q-block">
                <QNumber n={3} />
                <p className="q-title">Eczanenize Ait Lokasyon ve İsim Bilgileri: <span className="req">*</span></p>
                <div className="loc-grid">
                  <div className="loc-field">
                    <label>İl</label>
                    <select
                      className={`sel${err(!form.il) ? ' invalid' : ''}`}
                      value={form.il}
                      onChange={(e) => set('il', e.target.value)}
                    >
                      <option value="">İl seçiniz</option>
                      {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="loc-field">
                    <label>İlçe</label>
                    <input
                      className={`q-input${err(!form.ilce.trim()) ? ' invalid' : ''}`}
                      type="text"
                      placeholder="İlçe seçiniz"
                      value={form.ilce}
                      onChange={(e) => set('ilce', e.target.value)}
                    />
                  </div>
                  <div className="loc-field">
                    <label>Mahalle</label>
                    <input
                      className={`q-input${err(!form.mahalle.trim()) ? ' invalid' : ''}`}
                      type="text"
                      placeholder="Mahalle yazınız"
                      value={form.mahalle}
                      onChange={(e) => set('mahalle', e.target.value)}
                    />
                  </div>
                </div>
                <div className="loc-field loc-full">
                  <label>Eczane Adı (Opsiyonel)</label>
                  <input
                    className="q-input"
                    type="text"
                    placeholder="Eczane adını yazınız"
                    value={form.eczaneAdi}
                    onChange={(e) => set('eczaneAdi', e.target.value)}
                  />
                </div>
              </div>

              <div className="q-block">
                <QNumber n={4} />
                <p className="q-title">Eczanenizde çalışan toplam personel sayısı (Siz dâhil) kaçtır?</p>
                <div className="opt-group">
                  {['1 - 2 kişi', '3 - 4 kişi', '5 - 6 kişi', '7 kişi ve üzeri'].map((o) => (
                    <RadioOption key={o} name="personel" value={o} current={form.personel} onChange={(v) => set('personel', v)}>
                      {o}
                    </RadioOption>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ---------------- STEP 2 ---------------- */}
          {step === 2 && (
            <div className="q-list">
              <div className="q-block">
                <QNumber n={5} />
                <p className="q-title">Eczanenizin mevcut kârlılık oranından memnun musunuz? <span className="req">*</span></p>
                <div className="opt-group">
                  {['Evet, memnunum', 'Kararsızım', 'Hayır, memnun değilim'].map((o) => (
                    <RadioOption key={o} name="karlilik" value={o} current={form.karlilik} onChange={(v) => set('karlilik', v)}>
                      {o}
                    </RadioOption>
                  ))}
                </div>
              </div>

              {form.karlilik === 'Hayır, memnun değilim' && (
                <div className="q-conditional">
                  <span className="q-number">5.1</span>
                  <p className="q-title">
                    Alt Kırılım: Kârlılığınızı ve finansal yapınızı en çok zorlayan maliyet/gider
                    kalemleri nelerdir? (Çoklu Seçim - En fazla 3 seçenek)
                  </p>
                  <p className="q-hint">Yalnızca 5. soruda "Hayır, memnun değilim" seçildiğinde gösterilir. En fazla 3 seçenek seçin.</p>
                  <div className="opt-group">
                    {GIDER_OPTS.map((o) => {
                      const checked = form.giderler.includes(o)
                      return (
                        <CheckOption
                          key={o}
                          checked={checked}
                          disabled={!checked && form.giderler.length >= 3}
                          onToggle={() => toggleInArray('giderler', o, 3)}
                        >
                          {o}
                        </CheckOption>
                      )
                    })}
                  </div>
                  <p className="q-footnote"><InfoDot /> En fazla 3 seçenek belirleyebilirsiniz.</p>
                </div>
              )}
            </div>
          )}

          {/* ---------------- STEP 3 ---------------- */}
          {step === 3 && (
            <div className="q-list">
              <div className="q-block">
                <QNumber n={6} />
                <p className="q-title">
                  Aranılan ilacın bulunamadığı süreçlerde hastalarla yaşadığınız güven kaybı ve
                  iletişim sorunlarının temel sebepleri sizce nelerdir? (Soru kurgusu Takas/Eczaneler
                  arası ürün paylaşım ihtiyacına yönlendirecek şekilde hazırlanmıştır)
                </p>
                <div className="opt-group">
                  {GUVEN_OPTS.map((o) => (
                    <CheckOption key={o} checked={form.guvenKaybi.includes(o)} onToggle={() => toggleInArray('guvenKaybi', o)}>
                      {o}
                    </CheckOption>
                  ))}
                  <CheckOption checked={form.guvenKaybi.includes('Diğer')} onToggle={() => toggleInArray('guvenKaybi', 'Diğer')}>
                    Diğer:
                  </CheckOption>
                </div>
                <div className="loc-field loc-full">
                  <label>Diğer</label>
                  <input className="q-input" type="text" placeholder="Belirtiniz" value={form.guvenKaybiDiger} onChange={(e) => set('guvenKaybiDiger', e.target.value)} />
                </div>
              </div>

              <div className="q-block">
                <QNumber n={7} />
                <p className="q-title">
                  İlaç dışı ürünlerin (gıda takviyeleri, dermokozmetik vb.) eczaneler dışındaki
                  kanallardan (internet, zincir marketler) satılmasına yönelik bakış açınız nedir?
                  (Sorunun amacı: Problemin derinliğini belirlemek)
                </p>
                <div className="opt-group">
                  {ILAC_DISI_OPTS.map((o) => (
                    <RadioOption key={o} name="ilacDisi" value={o} current={form.ilacDisi} onChange={(v) => set('ilacDisi', v)}>
                      {o}
                    </RadioOption>
                  ))}
                  <RadioOption name="ilacDisi" value="Diğer" current={form.ilacDisi} onChange={(v) => set('ilacDisi', v)}>Diğer:</RadioOption>
                </div>
                <div className="loc-field loc-full">
                  <label>Diğer</label>
                  <input className="q-input" type="text" placeholder="Belirtiniz" value={form.ilacDisiDiger} onChange={(e) => set('ilacDisiDiger', e.target.value)} />
                </div>
              </div>

              <div className="q-block">
                <QNumber n={8} />
                <p className="q-title">Tedarik, sıralı dağıtım ve operasyonel süreçlerde en çok karşılaştığınız aksaklık nedir?</p>
                <div className="opt-group">
                  {TEDARIK_OPTS.map((o) => (
                    <RadioOption key={o} name="tedarik" value={o} current={form.tedarikAksaklik} onChange={(v) => set('tedarikAksaklik', v)}>
                      {o}
                    </RadioOption>
                  ))}
                  <RadioOption name="tedarik" value="Diğer" current={form.tedarikAksaklik} onChange={(v) => set('tedarikAksaklik', v)}>Diğer:</RadioOption>
                </div>
                <div className="loc-field loc-full">
                  <label>Diğer</label>
                  <input className="q-input" type="text" placeholder="Belirtiniz" value={form.tedarikAksaklikDiger} onChange={(e) => set('tedarikAksaklikDiger', e.target.value)} />
                </div>
              </div>

              <div className="q-block">
                <QNumber n={9} />
                <p className="q-title">
                  Bölgenizde kotalı/sıralı ilaç dağıtımında ve reçete yönlendirmelerinde şeffaflık
                  sağlayan dijital bir kontrol paneline ihtiyaç duyuyor musunuz?
                </p>
                <div className="opt-group">
                  {['Kesinlikle evet, odanın tüm süreci şeffafça izlemesi şart.', 'Kararsızım, mevcut sistem kısmen iş görüyor.', 'Hayır, ihtiyaç duymuyorum.'].map((o) => (
                    <RadioOption key={o} name="kontrol" value={o} current={form.kontrolPaneli} onChange={(v) => set('kontrolPaneli', v)}>
                      {o}
                    </RadioOption>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ---------------- STEP 4 ---------------- */}
          {step === 4 && (
            <div className="q-list">
              <div className="q-block">
                <QNumber n={10} />
                <p className="q-title">Eczane kalfaları ve teknisyenleriyle ilgili aşağıdaki ifadelere katılım durumunuzu belirtiniz:</p>
                {[
                  ['kalfaA', 'a) Eczanede bulunamadığım durumlarda işlerin kalfa/teknisyen tarafından yürütülmesi bende ciddi hukuki sorumluluk kaygısı yaratıyor.'],
                  ['kalfaB', 'b) Kalfaların/teknisyenlerin mevzuat, İTS/Medula ve hasta iletişimi konularında düzenli eğitimlere ihtiyaçları var.'],
                  ['kalfaC', 'c) Şüpheli reçeteler veya muadil ilaç yönlendirmelerinde kalfaların inisiyatif alması operasyonel risk oluşturmaktadır.'],
                ].map(([key, text]) => (
                  <div className="statement-card" key={key}>
                    <p className="statement-text">{text}</p>
                    <Segmented value={form[key]} onChange={(v) => set(key, v)} options={['Katılıyorum', 'Kararsızım', 'Katılmıyorum']} />
                  </div>
                ))}
              </div>

              <div className="q-block">
                <QNumber n={11} />
                <p className="q-title">
                  Son yıllarda mezun olup sahaya çıkan (yardımcı eczacı veya stajyer olarak
                  eczanenizde çalışan) genç meslektaşlarımızın yetkinliklerini aşağıdaki alanlarda
                  nasıl değerlendiriyorsunuz?
                </p>
                <ScaleRow label="Teorik/Medikal Bilgi Düzeyi" value={form.yetkinlikTeorik} onChange={(v) => set('yetkinlikTeorik', v)} />
                <ScaleRow label="İletişim ve Hasta Danışmanlığı" value={form.yetkinlikIletisim} onChange={(v) => set('yetkinlikIletisim', v)} />
                <ScaleRow label="Mevzuat ve Medula/İTS Hâkimiyeti" value={form.yetkinlikMevzuat} onChange={(v) => set('yetkinlikMevzuat', v)} />
              </div>
            </div>
          )}

          {/* ---------------- STEP 5 ---------------- */}
          {step === 5 && (
            <div className="q-list">
              <div className="q-block">
                <QNumber n={12} />
                <p className="q-title">Eczaneler arası yasal ürün takası ve paylaşımı süreçlerindeki mevcut durumunuzu nasıl tanımlarsınız?</p>
                <div className="opt-group">
                  {TAKAS_DURUM_OPTS.map((o) => (
                    <RadioOption key={o} name="takas" value={o} current={form.takasDurum} onChange={(v) => set('takasDurum', v)}>
                      {o}
                    </RadioOption>
                  ))}
                  <RadioOption name="takas" value="Diğer" current={form.takasDurum} onChange={(v) => set('takasDurum', v)}>Diğer:</RadioOption>
                </div>
                <div className="loc-field loc-full">
                  <label>Diğer</label>
                  <input className="q-input" type="text" placeholder="Belirtiniz" value={form.takasDurumDiger} onChange={(e) => set('takasDurumDiger', e.target.value)} />
                </div>
              </div>

              <div className="q-block">
                <QNumber n={13} />
                <p className="q-title">
                  Eczaneler arası ürün takas süreçlerinin tamamen yasal, İTS ile entegre ve dijital
                  bir platform üzerinden yürütülmesi eczanenize nasıl bir katkı sağlar?
                </p>
                <div className="opt-group">
                  {TAKAS_KATKI_OPTS.map((o) => (
                    <RadioOption key={o} name="takasKatki" value={o} current={form.takasKatki} onChange={(v) => set('takasKatki', v)}>
                      {o}
                    </RadioOption>
                  ))}
                </div>
              </div>

              <div className="q-block">
                <span className="q-number">14</span>
                <p className="q-title">
                  Eczaneler arası dijital bir takas platformunu aktif olarak kullanmanız için sizin
                  için en kritik şart nedir? 
                </p>
                <p className="q-hint">En fazla 2 seçenek seçin.</p>
                <div className="opt-group">
                  {PLATFORM_OPTS.map((o) => {
                    const checked = form.platformSart.includes(o)
                    return (
                      <CheckOption
                        key={o}
                        checked={checked}
                        disabled={!checked && form.platformSart.length >= 2}
                        onToggle={() => toggleInArray('platformSart', o, 2)}
                      >
                        {o}
                      </CheckOption>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ---------------- STEP 6 ---------------- */}
          {step === 6 && (
            <div className="q-list">
              <div className="q-block">
                <QNumber n={15} />
                <p className="q-title">Coğrafi ve bölgesel konumunuzun mesleğinizi icra ederken yarattığı en belirgin etkiler/faktörler nelerdir?</p>
                <div className="loc-field loc-full">
                  <label>Yanıtınız</label>
                  <textarea className="q-textarea" rows={4} placeholder="Yanıtınızı yazınız" value={form.cografiEtki} onChange={(e) => set('cografiEtki', e.target.value)} />
                </div>
              </div>

              <div className="q-block">
                <QNumber n={16} />
                <p className="q-title">Eczanenizde operasyonel veya mevzuatsal sorunla karşılaştığınızda öncelikli olarak nereye/kime başvurursunuz?</p>
                <div className="opt-group">
                  {BASVURU_OPTS.map((o) => (
                    <RadioOption key={o} name="basvuru" value={o} current={form.basvuru} onChange={(v) => set('basvuru', v)}>
                      {o}
                    </RadioOption>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ---------------- STEP 7 ---------------- */}
          {step === 7 && (
            <div className="q-list">
              <div className="q-block">
                <QNumber n={17} />
                <p className="q-title">
                  Eczacılar Odası'ndan ve üst kurumlardan en öncelikli beklentileriniz nelerdir?
                  (Örn: Dijital onay, uzaktan kontrol mekanizmaları için teknolojik altyapı
                  çözümlerinin üretilmesi, hukuki destek vb.)
                </p>
                <div className="loc-field loc-full">
                  <label>Yanıtınız</label>
                  <textarea className="q-textarea" rows={4} placeholder="Yanıtınızı yazınız" value={form.beklenti} onChange={(e) => set('beklenti', e.target.value)} />
                </div>
              </div>

              <div className="q-block">
                <QNumber n={18} />
                <p className="q-title">
                  Geleceğe yönelik teknolojik gelişmelerin (Eczane otomasyonları, yapay zekâ, dijital
                  danışmanlık) mesleğinizin geleceğini nasıl etkileyeceğini düşünüyorsunuz?
                </p>
                <div className="opt-group">
                  {TEKNOLOJI_OPTS.map((o) => (
                    <RadioOption key={o} name="teknoloji" value={o} current={form.teknolojiEtki} onChange={(v) => set('teknolojiEtki', v)}>
                      {o}
                    </RadioOption>
                  ))}
                </div>
              </div>

              <div className="q-block">
                <QNumber n={19} />
                <p className="q-title">
                  Bölge eczacı odaları ve Kolaysoft olarak atölye günü odaklanmamızı istediğiniz,
                  sahadaki operasyonel iş yükünüzü hafifletecek 1 ana problemi belirtiniz.
                </p>
                <div className="loc-field loc-full">
                  <label>Yanıtınız</label>
                  <textarea className="q-textarea" rows={4} placeholder='(Örn: "Eczaneler arası yasal takas ve İTS süreçlerinin zaman alması / Kalfa/teknisyen işlemlerinin uzaktan kontrol ve onay mekanizmasının olmaması...")' value={form.anaProblem} onChange={(e) => set('anaProblem', e.target.value)} />
                </div>
              </div>
            </div>
          )}

          {/* Persistence note */}
          <div className="survey-persist"><InfoDot /> Yanıtlarınız adımlar arasında korunur.</div>

          {/* Navigation */}
          <div className="survey-nav">
            {step > 1 ? (
              <button type="button" className="btn-back" onClick={goBack}>← Geri</button>
            ) : (
              <span />
            )}
            <button
              type="button"
              className={`btn-submit${!stepValid ? ' is-disabled' : ''}`}
              onClick={goNext}
            >
              {step === TOTAL ? 'Anketi Gönder' : 'Kaydet ve İlerle →'}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function InfoDot() {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" className="info-dot">
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="8" r="1.1" fill="currentColor" />
      <path d="M12 11v6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}
