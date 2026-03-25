import React from 'react';

const styles = `
  .notfound-page {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: #000;
    font-family: 'Segoe UI', sans-serif;
  }
  .orb-container {
    position: relative;
    width: 460px;
    height: 460px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    overflow: hidden;
  }
  .orb-container span {
    position: absolute;
    left: 0;
    width: 32px;
    height: 6px;
    background: #222;
    border-radius: 80px;
    transform-origin: 230px;
    transform: rotate(calc(var(--i) * (360deg / 50)));
    animation: blink 3s linear infinite;
    animation-delay: calc(var(--i) * (3s / 50));
  }
  @keyframes blink {
    0%   { background: #fff; }
    25%  { background: #222; }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .notfound-box {
    position: absolute;
    z-index: 1;
    width: 82%;
    max-width: 310px;
    padding: 32px 22px 28px;
    border-radius: 22px;
    background: rgba(10, 10, 10, 0.95);
    border: 1px solid rgba(255, 255, 255, 0.15);
    box-shadow: 0 0 40px rgba(255, 255, 255, 0.05);
    animation: fadeUp 0.5s ease;
    text-align: center;
  }
  .notfound-code {
    font-size: 5em;
    font-weight: 800;
    color: #fff;
    letter-spacing: -2px;
    margin: 0;
    line-height: 1;
  }
  .notfound-divider {
    width: 40px;
    height: 2px;
    background: #333;
    margin: 14px auto;
    border-radius: 2px;
  }
  .notfound-message {
    font-size: 0.88em;
    color: #555;
    margin: 0 0 24px;
    line-height: 1.6;
    letter-spacing: 0.2px;
  }
  .notfound-btn {
    display: inline-block;
    width: 100%;
    height: 42px;
    line-height: 42px;
    background: #fff;
    border-radius: 40px;
    font-size: 0.9em;
    color: #000;
    font-weight: 700;
    text-decoration: none;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    transition: background 0.25s, transform 0.15s;
    box-sizing: border-box;
  }
  .notfound-btn:hover {
    background: #ddd;
    transform: translateY(-1px);
  }
  .notfound-btn:active {
    transform: scale(0.98);
  }
`;

const Notfound = () => {
  return (
    <>
      <style>{styles}</style>
      <div className="notfound-page">
        <div className="orb-container">
          {Array.from({ length: 50 }, (_, i) => (
            <span key={i} style={{ '--i': i }} />
          ))}
          <div className="notfound-box">
            <h1 className="notfound-code">404</h1>
            <div className="notfound-divider" />
            <p className="notfound-message">
              Sorry, the page you are looking for does not exist.
            </p>
            <a className="notfound-btn" href="/">Back to Home</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notfound;

