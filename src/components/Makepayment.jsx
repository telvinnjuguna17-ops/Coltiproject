import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from './Loader';

const styles = `
  .payment-page {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: #000;
    font-family: 'Segoe UI', sans-serif;
    padding: 20px;
  }
  .orb-container {
    position: relative;
    width: 520px;
    height: 520px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    overflow: hidden;
    flex-shrink: 0;
  }
  .orb-container span {
    position: absolute;
    left: 0;
    width: 32px;
    height: 6px;
    background: #222;
    border-radius: 80px;
    transform-origin: 260px;
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
  .payment-box {
    position: absolute;
    z-index: 1;
    width: 84%;
    max-width: 360px;
    padding: 22px 22px 18px;
    border-radius: 22px;
    background: rgba(10, 10, 10, 0.95);
    border: 1px solid rgba(255, 255, 255, 0.15);
    box-shadow: 0 0 40px rgba(255, 255, 255, 0.05);
    animation: fadeUp 0.5s ease;
  }
  .back-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: transparent;
    border: 1.5px solid #333;
    border-radius: 30px;
    color: #aaa;
    font-size: 0.8em;
    padding: 5px 14px;
    cursor: pointer;
    margin-bottom: 14px;
    transition: border-color 0.2s, color 0.2s;
  }
  .back-btn:hover { border-color: #fff; color: #fff; }
  .product-img {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 14px;
    border: 1px solid #222;
    margin-bottom: 14px;
  }
  .product-name {
    font-size: 1.1em;
    color: #fff;
    font-weight: 700;
    margin: 0 0 5px;
  }
  .product-desc {
    font-size: 0.82em;
    color: #555;
    margin: 0 0 8px;
    line-height: 1.5;
  }
  .product-cost {
    font-size: 1.15em;
    color: #fff;
    font-weight: 800;
    margin: 0 0 16px;
  }
  .divider {
    width: 100%;
    height: 1px;
    background: #1a1a1a;
    margin-bottom: 16px;
  }
  .payment-title {
    font-size: 0.78em;
    color: #555;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin: 0 0 12px;
    text-align: center;
  }
  .status {
    text-align: center;
    font-size: 0.82em;
    border-radius: 30px;
    padding: 6px 12px;
    margin-bottom: 10px;
  }
  .status-success { color: #4ade80; background: rgba(74,222,128,0.1); }
  .status-error   { color: #f87171; background: rgba(248,113,113,0.1); }
  .input-box {
    position: relative;
    margin: 12px 0;
  }
  .input-box input {
    width: 100%;
    height: 42px;
    background: transparent;
    border: 1.5px solid #333;
    outline: none;
    border-radius: 40px;
    font-size: 0.9em;
    color: #fff;
    padding: 0 15px;
    transition: border-color 0.35s, box-shadow 0.35s;
    box-sizing: border-box;
  }
  .input-box input:focus {
    border-color: #fff;
    box-shadow: 0 0 0 3px rgba(255,255,255,0.08);
  }
  .input-box label {
    position: absolute;
    top: 50%;
    left: 15px;
    transform: translateY(-50%);
    font-size: 0.88em;
    pointer-events: none;
    transition: all 0.3s ease;
    color: #555;
  }
  .input-box input:not(:placeholder-shown) ~ label,
  .input-box input:focus ~ label {
    top: -9px;
    font-size: 0.7em;
    background: #0a0a0a;
    padding: 0 6px;
    color: #fff;
  }
  .pay-btn {
    width: 100%;
    height: 42px;
    background: #fff;
    border: none;
    outline: none;
    border-radius: 40px;
    cursor: pointer;
    font-size: 0.95em;
    color: #000;
    font-weight: 700;
    margin-top: 6px;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    transition: background 0.25s, transform 0.15s;
  }
  .pay-btn:hover { background: #ddd; transform: translateY(-1px); }
  .pay-btn:active { transform: scale(0.98); }
  .pay-btn:disabled { opacity: 0.4; cursor: not-allowed; }

  /* ── No product fallback ── */
  .no-product {
    text-align: center;
  }
  .no-product-code {
    font-size: 3em;
    font-weight: 800;
    color: #fff;
    margin: 0 0 8px;
  }
  .no-product-msg {
    font-size: 0.85em;
    color: #555;
    margin: 0 0 20px;
    line-height: 1.6;
  }
  .no-product-btn {
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
    cursor: pointer;
    border: none;
    outline: none;
  }
  .no-product-btn:hover { background: #ddd; transform: translateY(-1px); }
`;

const Makepayment = () => {
  const { product } = useLocation().state || {};
  const navigate = useNavigate();

  const img_url = "https://telvin.alwaysdata.net/static/images/";

  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handlesubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const formdata = new FormData();
      formdata.append("phone", number);
      formdata.append("amount", product.product_cost);

      const response = await axios.post("https://telvin.alwaysdata.net/api/mpesa_payment", formdata);

      setLoading(false);
      setSuccess(response.data.message);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  // ── Guard: no product in state (e.g. page refreshed or navigated directly) ──
  if (!product) {
    return (
      <>
        <style>{styles}</style>
        <div className="payment-page">
          <div className="orb-container">
            {Array.from({ length: 50 }, (_, i) => (
              <span key={i} style={{ '--i': i }} />
            ))}
            <div className="payment-box">
              <div className="no-product">
                <p className="no-product-code">Oops!</p>
                <p className="no-product-msg">
                  No product selected. Please go back and choose a product to purchase.
                </p>
                <button className="no-product-btn" onClick={() => navigate("/")}>
                  ← Back to Products
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <div className="payment-page">
        <div className="orb-container">
          {Array.from({ length: 50 }, (_, i) => (
            <span key={i} style={{ '--i': i }} />
          ))}

          <div className="payment-box">
            <button className="back-btn" onClick={() => navigate("/")}>
              ← Back
            </button>

            <img
              src={img_url + product.product_photo}
              alt={product.product_name}
              className="product-img"
            />

            <p className="product-name">{product.product_name}</p>
            <p className="product-desc">{product.product_description}</p>
            <p className="product-cost">KES {product.product_cost}</p>

            <div className="divider" />

            <p className="payment-title">Lipa na M-Pesa</p>

            {loading && <Loader />}
            {success && <p className="status status-success">{success}</p>}
            {error   && <p className="status status-error">{error}</p>}

            <form onSubmit={handlesubmit}>
              <div className="input-box">
                <input
                  type="number"
                  placeholder=" "
                  required
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                />
                <label>Phone Number 254XXXXXXX</label>
              </div>

              <button className="pay-btn" type="submit" disabled={loading}>
                {loading ? "Processing..." : "Make Payment"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Makepayment;
