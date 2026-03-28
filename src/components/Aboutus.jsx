import React from 'react';

const styles = `
  .about-page {
    min-height: 100vh;
    background: #000;
    font-family: 'Segoe UI', sans-serif;
    color: #fff;
    padding: 60px 20px 80px;
  }

  /* ── Hero section ── */
  .about-hero {
    text-align: center;
    max-width: 680px;
    margin: 0 auto 80px;
  }

  .about-eyebrow {
    font-size: 0.7em;
    letter-spacing: 5px;
    text-transform: uppercase;
    color: #444;
    margin-bottom: 14px;
  }

  .about-hero h1 {
    font-size: clamp(2em, 5vw, 3.6em);
    font-weight: 800;
    color: #fff;
    letter-spacing: -1px;
    line-height: 1.1;
    margin-bottom: 20px;
  }

  .about-hero h1 span {
    color: transparent;
    -webkit-text-stroke: 1px #fff;
  }

  .about-hero p {
    font-size: 0.95em;
    color: #555;
    line-height: 1.8;
    max-width: 520px;
    margin: 0 auto;
  }

  /* ── Divider ── */
  .section-divider {
    width: 40px;
    height: 2px;
    background: #222;
    margin: 0 auto 60px;
    border-radius: 2px;
  }

  /* ── Stats row ── */
  .stats-row {
    display: flex;
    justify-content: center;
    gap: 0;
    max-width: 700px;
    margin: 0 auto 80px;
    border: 1px solid #111;
    border-radius: 18px;
    overflow: hidden;
  }

  .stat-item {
    flex: 1;
    padding: 28px 20px;
    text-align: center;
    border-right: 1px solid #111;
  }

  .stat-item:last-child { border-right: none; }

  .stat-number {
    font-size: 2.2em;
    font-weight: 800;
    color: #fff;
    display: block;
    letter-spacing: -1px;
    line-height: 1;
    margin-bottom: 6px;
  }

  .stat-label {
    font-size: 0.72em;
    color: #444;
    text-transform: uppercase;
    letter-spacing: 1.5px;
  }

  /* ── Section title ── */
  .section-title {
    font-size: 0.68em;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: #444;
    text-align: center;
    margin-bottom: 32px;
  }

  /* ── Story section ── */
  .story-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    max-width: 860px;
    margin: 0 auto 80px;
  }

  @media (max-width: 600px) {
    .story-grid { grid-template-columns: 1fr; }
    .stats-row { flex-direction: column; }
    .stat-item { border-right: none; border-bottom: 1px solid #111; }
    .stat-item:last-child { border-bottom: none; }
  }

  .story-card {
    background: rgba(10,10,10,0.95);
    border: 1px solid #111;
    border-radius: 18px;
    padding: 28px 26px;
    transition: border-color 0.3s;
  }

  .story-card:hover { border-color: #333; }

  .story-card-icon {
    font-size: 1.6em;
    margin-bottom: 14px;
    display: block;
  }

  .story-card h3 {
    font-size: 1em;
    font-weight: 700;
    color: #fff;
    margin-bottom: 10px;
    letter-spacing: 0.2px;
  }

  .story-card p {
    font-size: 0.82em;
    color: #555;
    line-height: 1.75;
  }

  /* ── CEO section ── */
  .ceo-section {
    max-width: 700px;
    margin: 0 auto 80px;
  }

  .ceo-card {
    background: rgba(10,10,10,0.95);
    border: 1px solid #111;
    border-radius: 22px;
    padding: 40px 36px;
    display: flex;
    gap: 32px;
    align-items: flex-start;
    transition: border-color 0.3s;
  }

  .ceo-card:hover { border-color: #333; }

  @media (max-width: 600px) {
    .ceo-card { flex-direction: column; gap: 20px; padding: 28px 22px; }
  }

  .ceo-avatar {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    background: #111;
    border: 2px solid #222;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.4em;
    flex-shrink: 0;
  }

  .ceo-info { flex: 1; }

  .ceo-name {
    font-size: 1.4em;
    font-weight: 800;
    color: #fff;
    margin-bottom: 2px;
    letter-spacing: -0.3px;
  }

  .ceo-title {
    font-size: 0.75em;
    color: #444;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 16px;
  }

  .ceo-divider {
    width: 30px;
    height: 1px;
    background: #222;
    margin-bottom: 16px;
  }

  .ceo-bio {
    font-size: 0.85em;
    color: #555;
    line-height: 1.8;
    margin-bottom: 12px;
  }

  .ceo-quote {
    font-size: 0.88em;
    color: #aaa;
    font-style: italic;
    border-left: 2px solid #222;
    padding-left: 14px;
    margin-top: 16px;
    line-height: 1.7;
  }

  /* ── Values row ── */
  .values-row {
    display: flex;
    justify-content: center;
    gap: 12px;
    flex-wrap: wrap;
    max-width: 700px;
    margin: 0 auto 80px;
  }

  .value-pill {
    padding: 8px 20px;
    border: 1px solid #1a1a1a;
    border-radius: 40px;
    font-size: 0.78em;
    color: #555;
    letter-spacing: 0.5px;
    transition: border-color 0.2s, color 0.2s;
  }

  .value-pill:hover { border-color: #fff; color: #fff; }

  /* ── CTA ── */
  .about-cta {
    text-align: center;
    max-width: 460px;
    margin: 0 auto;
  }

  .about-cta p {
    font-size: 0.85em;
    color: #444;
    margin-bottom: 20px;
    line-height: 1.7;
  }

  .cta-btn {
    display: inline-block;
    height: 44px;
    line-height: 44px;
    padding: 0 32px;
    background: #fff;
    border-radius: 40px;
    font-size: 0.85em;
    color: #000;
    font-weight: 700;
    text-decoration: none;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    transition: background 0.2s, transform 0.15s;
  }

  .cta-btn:hover { background: #ddd; transform: translateY(-1px); }
`;

const Aboutus = () => {
  return (
    <>
      <style>{styles}</style>
      <div className="about-page">

        {/* ── Hero ── */}
        <div className="about-hero">
          <p className="about-eyebrow">Est. 2018 &mdash; Nairobi, Kenya</p>
          <h1>We Don't Just Sell Cars.<br />We <span>Restore</span> Legends.</h1>
          <p>
            Colti Group is East Africa's premier vintage car restoration and sales company.
            From rusted shells to showroom-ready classics, we breathe life back into
            automotive history — one bolt at a time.
          </p>
        </div>

        <div className="section-divider" />

        {/* ── Stats ── */}
        <div className="stats-row">
          <div className="stat-item">
            <span className="stat-number">200+</span>
            <span className="stat-label">Cars Restored</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">7+</span>
            <span className="stat-label">Years Experience</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">98%</span>
            <span className="stat-label">Client Satisfaction</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">15+</span>
            <span className="stat-label">Expert Mechanics</span>
          </div>
        </div>

        {/* ── Our Story ── */}
        <p className="section-title">Our Story</p>
        <div className="story-grid">
          <div className="story-card">
            <span className="story-card-icon">&#9881;</span>
            <h3>Born from Passion</h3>
            <p>
              Colti Group was founded in 2018 out of a deep love for vintage automobiles.
              What began as a small garage operation in Nairobi quickly grew into
              East Africa's most trusted name in classic car restoration.
            </p>
          </div>
          <div className="story-card">
            <span className="story-card-icon">&#128295;</span>
            <h3>Crafted by Hand</h3>
            <p>
              Every vehicle that enters our workshop is treated as a work of art.
              Our team of master mechanics and restoration specialists uses a blend
              of traditional techniques and modern precision tools to deliver
              perfection in every detail.
            </p>
          </div>
          <div className="story-card">
            <span className="story-card-icon">&#127758;</span>
            <h3>East Africa's Finest</h3>
            <p>
              From Kenya to Tanzania, Uganda to Rwanda — Colti Group's restored
              classics have found homes across the region. We are proud to be
              putting African craftsmanship on the map of global automotive history.
            </p>
          </div>
          <div className="story-card">
            <span className="story-card-icon">&#128176;</span>
            <h3>Fair &amp; Transparent</h3>
            <p>
              We believe world-class restoration shouldn't cost a fortune. Our
              M-Pesa integrated payment system and transparent pricing ensure
              every client gets honest value for their investment, with zero
              hidden fees.
            </p>
          </div>
        </div>

        {/* ── CEO ── */}
        <p className="section-title">Leadership</p>
        <div className="ceo-section">
          <div className="ceo-card">
            <div className="ceo-avatar">&#128104;&#8205;&#128295;</div>
            <div className="ceo-info">
              <p className="ceo-name">Telvin</p>
              <p className="ceo-title">Founder &amp; Chief Executive Officer</p>
              <div className="ceo-divider" />
              <p className="ceo-bio">
                Telvin is the visionary founder behind Colti Group. With a background
                in mechanical engineering and a lifelong obsession with vintage automobiles,
                he turned a passion project into one of East Africa's fastest-growing
                automotive businesses.
              </p>
              <p className="ceo-bio">
                Under his leadership, Colti Group has restored over 200 classic vehicles,
                built a team of 15 specialist mechanics, and pioneered the use of
                digital payments in the regional automotive market. Telvin personally
                oversees every major restoration project, ensuring the Colti standard
                is never compromised.
              </p>
              <p className="ceo-quote">
                "Every car has a story. Our job is to make sure that story
                continues — louder, prouder, and better than ever."
              </p>
            </div>
          </div>
        </div>

        {/* ── Values ── */}
        <p className="section-title">What We Stand For</p>
        <div className="values-row">
          {[
            "Craftsmanship", "Integrity", "Precision",
            "Innovation", "Heritage", "Community",
            "Transparency", "Excellence"
          ].map((v) => (
            <span className="value-pill" key={v}>{v}</span>
          ))}
        </div>

        {/* ── CTA ── */}
        <div className="about-cta">
          <p>
            Ready to find your dream classic? Browse our showroom or get in touch
            with the Colti team today.
          </p>
          <a className="cta-btn" href="/">Browse the Showroom</a>
        </div>

      </div>
    </>
  );
};

export default Aboutus;
