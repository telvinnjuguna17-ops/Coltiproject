import React from "react";

const styles = `
  .loader {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
    margin: 10px 0;
  }

  .slider {
    width: 6px;
    height: 24px;
    background: #fff;
    border-radius: 30px;
    animation: slide 1s ease-in-out infinite;
    animation-delay: calc(var(--i) * 0.15s);
  }

  @keyframes slide {
    0%, 100% {
      transform: scaleY(0.4);
      background: #222;
    }
    50% {
      transform: scaleY(1);
      background: #fff;
    }
  }
`;

const Loader = () => {
  return (
    <>
      <style>{styles}</style>
      <section className="loader">
        <div className="slider" style={{ "--i": 0 }}></div>
        <div className="slider" style={{ "--i": 1 }}></div>
        <div className="slider" style={{ "--i": 2 }}></div>
        <div className="slider" style={{ "--i": 3 }}></div>
        <div className="slider" style={{ "--i": 4 }}></div>
      </section>
    </>
  );
};

export default Loader;
