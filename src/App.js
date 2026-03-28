import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Addproducts from './components/Addproducts';
import Getproducts from './components/Getproducts';
import Notfound from './components/Notfound';
import Makepayment from './components/Makepayment';
import Aboutus from './components/Aboutus';

const styles = `
  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    background: #000;
    font-family: 'Segoe UI', sans-serif;
    color: #fff;
  }

  /* ── Navbar ── */
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 40px;
    background: rgba(0, 0, 0, 0.85);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid #111;
  }

  .navbar-brand {
    display: flex;
    flex-direction: column;
    text-decoration: none;
  }

  .navbar-brand-name {
    font-size: 1.2em;
    font-weight: 800;
    color: #fff;
    letter-spacing: 2px;
    text-transform: uppercase;
    line-height: 1;
  }

  .navbar-brand-tagline {
    font-size: 0.62em;
    color: #444;
    letter-spacing: 3px;
    text-transform: uppercase;
    margin-top: 3px;
  }

  .navbar-links {
    display: flex;
    align-items: center;
    gap: 6px;
    list-style: none;
  }

  .navbar-links a {
    font-size: 0.8em;
    color: #555;
    text-decoration: none;
    letter-spacing: 1px;
    text-transform: uppercase;
    padding: 7px 16px;
    border-radius: 30px;
    border: 1px solid transparent;
    transition: color 0.2s, border-color 0.2s;
  }

  .navbar-links a:hover,
  .navbar-links a.active {
    color: #fff;
    border-color: #333;
  }

  .navbar-links a.nav-cta {
    background: #fff;
    color: #000;
    font-weight: 700;
    border-color: #fff;
  }

  .navbar-links a.nav-cta:hover {
    background: #ddd;
    border-color: #ddd;
    color: #000;
  }

  /* ── Hero Carousel ── */
  .hero {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background: #000;
  }

  .hero-slide {
    position: absolute;
    inset: 0;
    opacity: 0;
    transition: opacity 1.2s ease;
  }

  .hero-slide.active {
    opacity: 1;
  }

  .hero-slide video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0.35);
  }

  .hero-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 20px;
    background: linear-gradient(to bottom, transparent 40%, #000 100%);
  }

  .hero-eyebrow {
    font-size: 0.7em;
    letter-spacing: 5px;
    text-transform: uppercase;
    color: #555;
    margin-bottom: 16px;
  }

  .hero-title {
    font-size: clamp(2em, 6vw, 4.5em);
    font-weight: 800;
    color: #fff;
    letter-spacing: -1px;
    line-height: 1.1;
    max-width: 800px;
    margin-bottom: 16px;
  }

  .hero-title span {
    color: transparent;
    -webkit-text-stroke: 1px #fff;
  }

  .hero-subtitle {
    font-size: 0.9em;
    color: #555;
    max-width: 460px;
    line-height: 1.7;
    margin-bottom: 32px;
  }

  .hero-actions {
    display: flex;
    gap: 12px;
  }

  .hero-btn-primary {
    height: 44px;
    padding: 0 28px;
    background: #fff;
    border: none;
    border-radius: 40px;
    font-size: 0.85em;
    font-weight: 700;
    color: #000;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    cursor: pointer;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    transition: background 0.2s, transform 0.15s;
  }

  .hero-btn-primary:hover { background: #ddd; transform: translateY(-1px); }

  .hero-btn-secondary {
    height: 44px;
    padding: 0 28px;
    background: transparent;
    border: 1px solid #333;
    border-radius: 40px;
    font-size: 0.85em;
    font-weight: 600;
    color: #aaa;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    cursor: pointer;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    transition: border-color 0.2s, color 0.2s;
  }

  .hero-btn-secondary:hover { border-color: #fff; color: #fff; }

  .hero-dots {
    position: absolute;
    bottom: 32px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 8px;
    z-index: 10;
  }

  .hero-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #333;
    cursor: pointer;
    transition: background 0.3s, transform 0.3s;
    border: none;
    outline: none;
  }

  .hero-dot.active {
    background: #fff;
    transform: scale(1.4);
  }

  .hero-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    background: rgba(255,255,255,0.05);
    border: 1px solid #222;
    border-radius: 50%;
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #fff;
    font-size: 1.1em;
    transition: background 0.2s, border-color 0.2s;
  }

  .hero-arrow:hover { background: rgba(255,255,255,0.12); border-color: #555; }
  .hero-arrow.left  { left: 24px; }
  .hero-arrow.right { right: 24px; }

  /* ── Page content ── */
  .page-content {
    padding-top: 72px;
  }

  /* ── Footer ── */
  .footer {
    border-top: 1px solid #111;
    padding: 24px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 60px;
  }

  .footer-copy {
    font-size: 0.75em;
    color: #333;
    letter-spacing: 0.5px;
  }

  .footer-links {
    display: flex;
    gap: 20px;
  }

  .footer-links a {
    font-size: 0.75em;
    color: #333;
    text-decoration: none;
    letter-spacing: 0.5px;
    transition: color 0.2s;
  }

  .footer-links a:hover { color: #fff; }
`;

const slides = [
  {
    src: "/videos/vintage-car-1.mp4",
    label: "Crafted by Hand",
    title: <>The Art of <span>Restoration</span></>,
    sub: "Watch master engineers breathe life into vintage machines, one bolt at a time.",
  },
  {
    src: "/videos/vintage-car-2.mp4",
    label: "Precision Engineering",
    title: <>Built for <span>Eternity</span></>,
    sub: "Every engine assembled with surgical precision and decades of expertise.",
  },
  {
    src: "/videos/vintage-car-3.mp4",
    label: "Colti Group",
    title: <>The Best <span>Around Town</span></>,
    sub: "Premium vintage vehicles, sourced, restored, and delivered to perfection.",
  },
  {
    src: "/videos/vintage-car-4.mp4",
    label: "Elite Luxury",
    title: <>The Art of <span>Perfection</span></>,
    sub: "Watch master engineers breathe life into elegant road monsters",
  },
  {
    src: "/videos/vintage-car-5.mp4",
    label: "Latest Tech",
    title: <>Listen to the <span>Story</span></>,
    sub: "Each car has a story watch as we make it louder,prouder and bolder",
  },
];

function Navbar() {
  const location = useLocation();
  return (
    <nav className="navbar">
      <Link className="navbar-brand" to="/">
        <span className="navbar-brand-name">Colti Group</span>
        <span className="navbar-brand-tagline">The Best Around Town</span>
      </Link>
      <ul className="navbar-links">
        <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>Showroom</Link></li>
        <li><Link to="/addproducts" className={location.pathname === '/addproducts' ? 'active' : ''}>Add Car</Link></li>
        <li><Link to="/signup" className={location.pathname === '/signup' ? 'active' : ''}>Register</Link></li>
        <li><Link to="/signin" className={`nav-cta ${location.pathname === '/signin' ? 'active' : ''}`}>Sign In</Link></li>
      </ul>
    </nav>
  );
}

function Hero() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);

  const goTo = (idx) => setCurrent((idx + slides.length) % slides.length);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div className="hero">
      {slides.map((slide, i) => (
        <div className={`hero-slide ${i === current ? 'active' : ''}`} key={i}>
          <video autoPlay muted loop playsInline src={slide.src} />
        </div>
      ))}

      <div className="hero-overlay">
        <p className="hero-eyebrow">{slides[current].label}</p>
        <h1 className="hero-title">{slides[current].title}</h1>
        <p className="hero-subtitle">{slides[current].sub}</p>
        <div className="hero-actions">
          <Link to="/" className="hero-btn-primary">Browse Cars</Link>
          <Link to="/signup" className="hero-btn-secondary">Join Us</Link>
        </div>
      </div>

      <button className="hero-arrow left" onClick={() => goTo(current - 1)}>&#8592;</button>
      <button className="hero-arrow right" onClick={() => goTo(current + 1)}>&#8594;</button>

      <div className="hero-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`hero-dot ${i === current ? 'active' : ''}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  );
}

function Layout({ children, showHero }) {
  return (
    <>
      <Navbar />
      {showHero && <Hero />}
      <div className={showHero ? '' : 'page-content'}>
        {children}
      </div>
      <footer className="footer">
        <span className="footer-copy">© {new Date().getFullYear()} Colti Group. All rights reserved.</span>
        <div className="footer-links">
          <Link to="/">Showroom</Link>
          <Link to="/addproducts">Add Car</Link>
          <Link to="/signin">Sign In</Link>
          <Link to="/signup">Register</Link>
          <Link to="/aboutus">Aboutus</Link>
        </div>
      </footer>
    </>
  );
}

function AppRoutes() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <Layout showHero={isHome}>
      <Routes>
        <Route path="/" element={<Getproducts />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/addproducts" element={<Addproducts />} />
        <Route path="/makepayment" element={<Makepayment />} />
        <Route path="/aboutus" element={<Aboutus/>} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </Layout>
  );
}

function App() {
  return (
    <Router>
      <style>{styles}</style>
      <AppRoutes />
    </Router>
  );
}

export default App;
