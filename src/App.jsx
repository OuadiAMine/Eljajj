import { useState, useEffect, useRef } from 'react'
import './App.css'

import logoImg from './assets/media/Eljajj-logo.png'
// Hero: main background - full spread with chicken and sides
import heroImg from './assets/media/img132.jpg'
// Hero accent: grilled chicken pieces
import heroAccentImg from './assets/media/img114.jpg'
// Signature chicken (feature card 1)
import imgChicken from './assets/media/img102.jpg'
// Bowls, wraps & salads (feature card 2) - watermelon feta salad
import imgSalads from './assets/media/img143.jpg'
// Mum's garlic & sides (feature card 3) - sauce jar
import imgSides from './assets/media/img69.jpg'
// Ethically sourced / fresh produce (feature card 4) - fresh lettuce
import imgProduce from './assets/media/img244.jpg'
// Story panel – emotional, “memory”, family/food
import storyImg from './assets/media/img289.jpg'
// Menu gallery – food dishes only
import galleryImg1 from './assets/media/img62.jpg'
import galleryImg2 from './assets/media/img102.jpg'
import galleryImg3 from './assets/media/img114.jpg'
import galleryImg4 from './assets/media/img132.jpg'

const MEDIA = {
  logo: logoImg,
  heroImg,
  heroAccentImg,
  chicken: imgChicken,
  salads: imgSalads,
  sides: imgSides,
  produce: imgProduce,
  storyImg,
  gallery: [galleryImg1, galleryImg2, galleryImg3, galleryImg4],
}

function App() {
  const [heroReveal, setHeroReveal] = useState(false)
  const [headerScrolled, setHeaderScrolled] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)
  const mainRef = useRef(null)
  const sectionRefs = useRef([])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark')
  }, [])

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

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const faqs = [
    {
      question: "What makes El Jejj's chicken special?",
      answer: "Every chicken is soaked overnight in Mum's special brine recipe—the same one from our family gatherings. Then it's grilled over real charcoal for that perfect crispy skin and juicy, tender inside. It's a flavor experience you won't forget."
    },
    {
      question: "Do you offer vegetarian options?",
      answer: "Yes! We have a vibrant selection of Middle Eastern salads and sides including Tabouli, Fattoush, Hummus, Baba Ganoush, and Falafel. Our Lebanese bread is made fresh daily, and we offer various bowls and wraps that can be customized."
    },
    {
      question: "Can I order for a large group or event?",
      answer: "Absolutely! We cater for families, celebrations, corporate meetings, and group orders. Contact us in advance for large orders and we'll make sure everything is fresh and ready when you need it."
    },
    {
      question: "Is your chicken ethically sourced?",
      answer: "Yes, we're committed to ethical sourcing. We work with trusted local suppliers we've partnered with for years, ensuring our chicken is responsibly sourced and meets our high standards for quality and sustainability."
    },
    {
      question: "Do you offer dine-in and takeaway?",
      answer: "Yes, both! Whether you want to dine in with family and friends or grab takeaway for a quick meal, we've got you covered. Perfect for lunch, dinner, date nights, or celebrations."
    },
    {
      question: "What's included with the charcoal chicken?",
      answer: "Our signature charcoal chicken comes with hot chips, Lebanese bread (made fresh daily), and Mum's famous creamy garlic sauce. You can also add any of our fresh salads and sides to complete your meal."
    }
  ]

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
          <div className="hero-bg-wrapper">
            <img src={MEDIA.heroImg} alt="" className="hero-bg-image" />
            <div className="hero-overlay"></div>
          </div>
          
          <div className={`hero-container ${heroReveal ? 'is-visible' : ''}`}>
            <div className="hero-content">
              <div className="hero-badge">
                <span>Est. 2024</span>
                <span className="badge-dot">•</span>
                <span>Middle Eastern</span>
              </div>
              
              <h1 className="hero-title">
                Flame-grilled.<br />
                <span className="hero-title-accent">Made with heart.</span>
              </h1>
              
              <p className="hero-subtitle">
                Charcoal chicken that brings family to the table. Mum's garlic sauce included.
              </p>
              
              <div className="hero-actions">
                <a href="#menu" className="btn btn-primary btn-lg">
                  View menu
                </a>
                <a href="#story" className="btn btn-outline btn-lg">
                  Our story
                </a>
              </div>
              
              <div className="hero-accent-card">
                <img src={MEDIA.heroAccentImg} alt="Charcoal chicken" />
                <div className="hero-accent-text">
                  <span className="accent-label">Signature dish</span>
                  <span className="accent-title">Charcoal Chicken</span>
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
          ref={(el) => setSectionRef(el, 1)}
          className="section reveal"
          aria-labelledby="secret-heading"
        >
          <div className="section-inner">
            <header className="section-header centered">
              <p className="eyebrow">The Secret</p>
              <h2 id="secret-heading">Soaked overnight in Mum&apos;s special brine</h2>
              <p className="section-lead">
                At the heart of our family&apos;s culinary philosophy lies a simple truth: the best food is always uncomplicated. Every chicken is lovingly soaked overnight in our special brine, guaranteeing a flavor experience that will stay with you long after the last bite.
              </p>
            </header>

            <div className="process-grid">
              <div className="process-step">
                <span className="process-number">01</span>
                <h3>Select & Source</h3>
                <p>Fresh, ethically sourced chicken from trusted local suppliers we&apos;ve worked with for years.</p>
              </div>
              <div className="process-step">
                <span className="process-number">02</span>
                <h3>Marinate Overnight</h3>
                <p>Each chicken soaked in Mum&apos;s special brine blend—the same recipe from our family gatherings.</p>
              </div>
              <div className="process-step">
                <span className="process-number">03</span>
                <h3>Charcoal Grilled</h3>
                <p>Cooked over real charcoal to achieve that perfect crispy skin and juicy, tender inside.</p>
              </div>
              <div className="process-step">
                <span className="process-number">04</span>
                <h3>Served Fresh</h3>
                <p>Hot chips, Lebanese bread made fresh daily, and Mum&apos;s famous creamy garlic sauce.</p>
              </div>
            </div>
          </div>
        </section>

        <section
          ref={(el) => setSectionRef(el, 2)}
          className="section section-alt reveal"
          aria-labelledby="fresh-heading"
        >
          <div className="section-inner">
            <div className="split-content">
              <div className="split-text">
                <p className="eyebrow">Made Fresh Daily</p>
                <h2 id="fresh-heading">A vibrant selection of salads & fresh bread</h2>
                <p>
                  Indulge in vibrant, wholesome salads crafted from the finest whole foods. Our commitment to quality shines through in every bite, as we source only the best ingredients for our signature salads.
                </p>
                <p>
                  Discover a fresh selection of salads daily, each store offering its own favorites. Lebanese bread made fresh every morning. With a diverse range to choose from, every visit promises a delightful opportunity to try something new and exciting.
                </p>
                <ul className="fresh-list">
                  <li>Tabouli, Fattoush, Hummus</li>
                  <li>Baba Ganoush, Falafel</li>
                  <li>Mum&apos;s pickled vegetables</li>
                  <li>Lebanese bread (baked daily)</li>
                </ul>
              </div>
              <div className="split-visual">
                <div className="fresh-badge">Fresh Daily</div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="experience"
          ref={(el) => setSectionRef(el, 3)}
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
          ref={(el) => setSectionRef(el, 4)}
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
          ref={(el) => setSectionRef(el, 5)}
          className="section reveal"
          aria-labelledby="values-heading"
        >
          <div className="section-inner">
            <header className="section-header centered">
              <p className="eyebrow">Our Values</p>
              <h2 id="values-heading">Operating with integrity</h2>
              <p className="section-lead">
                We deeply value our team, our customers, and our planet. Every decision we make reflects our commitment to quality, respect, and responsibility.
              </p>
            </header>

            <div className="values-grid">
              <div className="value-card">
                <h3>Health & Safety</h3>
                <p>
                  Health and safety are paramount at El Jejj. We uphold rigorous standards to ensure every dish meets high protocols, prioritizing the well-being of customers and staff.
                </p>
              </div>
              <div className="value-card">
                <h3>Ethical Sourcing</h3>
                <p>
                  From responsibly sourced ingredients to sustainable practices, we ensure every bite reflects our dedication to quality and respect for the environment.
                </p>
              </div>
              <div className="value-card">
                <h3>Team First</h3>
                <p>
                  We provide a safe, supportive work environment. El Jejj invests in training, promotes respect, and listens to feedback to ensure every member feels valued.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="visit"
          ref={(el) => setSectionRef(el, 6)}
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

        <section
          ref={(el) => setSectionRef(el, 7)}
          className="section section-alt reveal"
          aria-labelledby="faq-heading"
        >
          <div className="section-inner">
            <header className="section-header centered">
              <p className="eyebrow">FAQs</p>
              <h2 id="faq-heading">Questions? We've got answers</h2>
              <p className="section-lead">
                Everything you need to know about El Jejj charcoal chicken.
              </p>
            </header>

            <div className="faq-list">
              {faqs.map((faq, index) => (
                <div key={index} className={`faq-item ${openFaq === index ? 'is-open' : ''}`}>
                  <button
                    className="faq-question"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={openFaq === index}
                  >
                    <span>{faq.question}</span>
                    <span className="faq-icon" aria-hidden="true">
                      {openFaq === index ? '−' : '+'}
                    </span>
                  </button>
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))}
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
