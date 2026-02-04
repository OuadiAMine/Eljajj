import { useState, useEffect, useRef } from 'react'
import './App.css'

import logoImg from './assets/media/Eljajj-logo.png'
// Hero: chicken platter – main theme
import heroImg from './assets/media/img62.jpg'
// Hero card: feast / chicken centrepiece
import heroCardImg from './assets/media/img102.jpg'
// Signature chicken (feature card 1)
import imgChicken from './assets/media/img198.jpg'
// Bowls, wraps & salads (feature card 2)
import imgSalads from './assets/media/img220.jpg'
// Mum's garlic & sides (feature card 3)
import imgSides from './assets/media/img232.jpg'
// Ethically sourced / fresh produce (feature card 4)
import imgProduce from './assets/media/img261.jpg'
// Story panel – emotional, “memory”, family/food
import storyImg from './assets/media/img289.jpg'
// Menu gallery – four varied shots (dishes, vibe, spread across catalog)
import galleryImg1 from './assets/media/img102.jpg'
import galleryImg2 from './assets/media/img156.jpg'
import galleryImg3 from './assets/media/img200.jpg'
import galleryImg4 from './assets/media/img244.jpg'

const MEDIA = {
  logo: logoImg,
  heroImg,
  heroCardImg,
  chicken: imgChicken,
  salads: imgSalads,
  sides: imgSides,
  produce: imgProduce,
  storyImg,
  gallery: [galleryImg1, galleryImg2, galleryImg3, galleryImg4],
}

function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark'
    return localStorage.getItem('eljejj-theme') || 'dark'
  })
  const [heroReveal, setHeroReveal] = useState(false)
  const [headerScrolled, setHeaderScrolled] = useState(false)
  const mainRef = useRef(null)
  const sectionRefs = useRef([])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('eljejj-theme', theme)
  }, [theme])

  useEffect(() => {
    const onScroll = () => setHeaderScrolled(window.scrollY > 48)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const t = setTimeout(() => setHeroReveal(true), 80)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('in-view')
        })
      },
      { rootMargin: '-8% 0px -8% 0px', threshold: 0 }
    )
    sectionRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const setSectionRef = (el, i) => {
    sectionRefs.current[i] = el
  }

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  return (
    <div className="page">
      <header className={`site-header ${headerScrolled ? 'is-scrolled' : ''}`}>
        <nav className="nav">
          <a href="#" className="logo-link" aria-label="El Jejj – Home">
            <img src={MEDIA.logo} alt="El Jejj" className="logo-img" />
          </a>
          <div className="nav-links">
            <a href="#story">Our Story</a>
            <a href="#menu">Menu</a>
            <a href="#experience">Experience</a>
            <a href="#visit">Visit</a>
          </div>
          <div className="nav-cta">
            <button
              type="button"
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
              title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
            >
              <span className="theme-toggle-icon" aria-hidden>{theme === 'dark' ? '☀️' : '🌙'}</span>
            </button>
            <a href="#visit" className="btn btn-ghost">
              Book a table
            </a>
            <a href="#menu" className="btn btn-primary">
              Order now
            </a>
          </div>
        </nav>
      </header>

      <main ref={mainRef}>
        <section className="hero" aria-label="El Jejj hero">
          <div className={`hero-container ${heroReveal ? 'is-visible' : ''}`}>
            <div className="hero-content">
              <div className="hero-text">
                <h1 className="hero-title">
                  Charcoal chicken.<br />
                  Made with love.
                </h1>
                <p className="hero-subtitle">
                  Middle Eastern charcoal chicken, Mum's recipes, and that garlic sauce everyone asks for.
                </p>
                <div className="hero-cta">
                  <a href="#menu" className="btn btn-primary btn-lg">
                    Order now
                  </a>
                </div>
              </div>
              
              <div className="hero-visual">
                <div className="hero-image-main">
                  <img src={MEDIA.heroCardImg} alt="El Jejj charcoal chicken feast" />
                </div>
                <div className="hero-image-accent">
                  <img src={MEDIA.heroImg} alt="Charcoal chicken platter" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="menu"
          ref={(el) => setSectionRef(el, 0)}
          className="section section-alt reveal"
          aria-labelledby="menu-heading"
        >
          <div className="section-inner">
            <header className="section-header">
              <p className="eyebrow">The Menu</p>
              <h2 id="menu-heading">Charcoal favourites & vibrant salads</h2>
              <p className="section-lead">
                Whole ingredients, honest flavours. The kind of food that brings
                people back.
              </p>
            </header>

            <div className="menu-gallery">
              {MEDIA.gallery.map((src, i) => (
                <div key={i} className="menu-gallery-item" style={{ transitionDelay: `${0.1 + i * 0.05}s` }}>
                  <img src={src} alt="" className="menu-gallery-img" />
                </div>
              ))}
            </div>

            <div className="menu-highlights">
              <article className="menu-highlight">
                <div className="menu-highlight-media">
                  <img src={MEDIA.salads} alt="Bowls, wraps & salads" />
                </div>
                <div className="menu-highlight-text">
                  <h3>Bowls, Wraps &amp; Salads</h3>
                  <p>
                    Fresh, colourful plates built around crisp veg, herbs and our
                    house-made dressings.
                  </p>
                </div>
              </article>

              <article className="menu-highlight">
                <div className="menu-highlight-media">
                  <img src={MEDIA.sides} alt="Mum's garlic and sides" />
                </div>
                <div className="menu-highlight-text">
                  <h3>Mum&apos;s Garlic &amp; Sides</h3>
                  <p>
                    The garlic sauce everyone talks about, served with hot chips,
                    Lebanese bread and crunchy pickles.
                  </p>
                </div>
              </article>

              <article className="menu-highlight">
                <div className="menu-highlight-media">
                  <img src={MEDIA.produce} alt="Ethically sourced produce" />
                </div>
                <div className="menu-highlight-text">
                  <h3>Ethically Sourced Produce</h3>
                  <p>
                    From trusted local suppliers to in-store prep, every plate
                    respects the ingredients and the people behind them.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section
          id="experience"
          ref={(el) => setSectionRef(el, 1)}
          className="section reveal"
          aria-labelledby="experience-heading"
        >
          <div className="section-inner">
            <header className="section-header">
              <p className="eyebrow">Who it&apos;s for</p>
              <h2 id="experience-heading">Every occasion</h2>
              <p className="section-lead">
                Date night, family dinner, post-game feed or a quick solo lunch.
                Same great taste, any time.
              </p>
            </header>

            <div className="audience-grid">
              <article className="audience-card">
                <h3>Family &amp; Friends</h3>
                <p>
                  Long-table dinners, weekend catch-ups and celebrations with
                  whole charcoal chickens at the centre.
                </p>
                <p className="audience-tagline">Dine in or takeaway.</p>
              </article>

              <article className="audience-card">
                <h3>School Kids</h3>
                <p>
                  After-school bites, weekend hangs and post-sport feeds that
                  are comforting and satisfying.
                </p>
                <p className="audience-tagline">Fast, hot and flavourful.</p>
              </article>

              <article className="audience-card">
                <h3>Local Workers</h3>
                <p>
                  Lunch breaks, meeting platters and group orders that keep the
                  whole team fuelled and focused.
                </p>
                <p className="audience-tagline">Perfect for sharing.</p>
              </article>

              <article className="audience-card">
                <h3>Shoppers</h3>
                <p>
                  A comforting stop between errands, or an easy answer to
                  &ldquo;What&apos;s for dinner tonight?&rdquo;
                </p>
                <p className="audience-tagline">Grab &amp; go made better.</p>
              </article>
            </div>
          </div>
        </section>

        <section
          id="story"
          ref={(el) => setSectionRef(el, 2)}
          className="section section-alt reveal"
          aria-labelledby="story-heading"
        >
          <div className="section-inner story-layout">
            <div className="story-copy">
              <p className="eyebrow">Our story</p>
              <h2 id="story-heading">A memory that could never be forgotten</h2>
              <p>
                Weekends around the charcoal. Mum&apos;s marinade, the whole family
                taking turns at the grill. Tabouli, fattoush and that garlic sauce
                that made every plate feel like home.
              </p>
              <p>
                We brought that same love into every dish we serve. Fresh chicken,
                real charcoal, and the flavours that bring people together.
              </p>
            </div>
            <aside className="story-panel" aria-label="Charcoal chicken made fresh">
              <div className="story-panel-img-wrap">
                <img src={MEDIA.storyImg} alt="El Jejj charcoal chicken" className="story-panel-img" />
              </div>
              <div className="story-badge">
                <span className="pill pill-soft small">
                  Charcoal chicken &nbsp;•&nbsp; Made fresh
                </span>
              </div>
              <div className="story-panel-main">
                <p className="story-line">Charcoal chicken made fresh.</p>
                <p className="story-line">Always on the menu.</p>
                <p className="story-line subtle">Lunch, dinner, dine in or takeaway.</p>
              </div>
            </aside>
          </div>
        </section>

        <section
          id="visit"
          ref={(el) => setSectionRef(el, 3)}
          className="section section-cta reveal"
          aria-labelledby="visit-heading"
        >
          <div className="section-inner cta-inner">
            <div>
              <p className="eyebrow">Visit us</p>
              <h2 id="visit-heading">Ready when you are</h2>
              <p className="section-lead">
                Dine in or take away. Lunch, dinner, and every moment in between.
              </p>
            </div>
            <div className="cta-actions">
              <a href="tel:" className="btn btn-primary btn-lg">
                Call to order
              </a>
              <a href="#menu" className="btn btn-secondary btn-lg">
                Full menu
              </a>
              <p className="cta-hours">
                <span className="dot" /> Lunch &amp; dinner — takeaway &amp; dine in
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-inner">
          <a href="#" className="footer-logo-link" aria-label="El Jejj">
            <img src={MEDIA.logo} alt="" className="footer-logo-img" />
          </a>
          <p className="footer-note">
            Charcoal chicken, vibrant salads and Mum&apos;s garlic sauce. Made with love.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
