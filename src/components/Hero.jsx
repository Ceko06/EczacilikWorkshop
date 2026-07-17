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
        birlikte konuşacağ