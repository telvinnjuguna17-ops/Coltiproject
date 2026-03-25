import React, { useState } from 'react';
import Loader from './Loader';
import axios from 'axios';

const styles = `
  .addproduct-page {
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
  .addproduct-box {
    position: absolute;
    z-index: 1;
    width: 84%;
    max-width: 360px;
    padding: 24px 22px 20px;
    border-radius: 22px;
    background: rgba(10, 10, 10, 0.95);
    border: 1px solid rgba(255, 255, 255, 0.15);
    box-shadow: 0 0 40px rgba(255, 255, 255, 0.05);
    animation: fadeUp 0.5s ease;
  }
  .addproduct-box h2 {
    font-size: 1.4em;
    color: #fff;
    text-align: center;
    margin: 0 0 4px;
    letter-spacing: 1px;
    text-transform: uppercase;
  }
  .addproduct-subtitle {
    font-size: 0.75em;
    color: #555;
    text-align: center;
    margin: 0 0 18px;
    letter-spacing: 0.3px;
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

  /* ── Text inputs ── */
  .input-box {
    position: relative;
    margin: 12px 0;
  }
  .input-box input[type="text"],
  .input-box input[type="number"] {
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
  .input-box input[type="text"]:focus,
  .input-box input[type="number"]:focus {
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
  .input-box input[type="text"]:not(:placeholder-shown) ~ label,
  .input-box input[type="text"]:focus ~ label,
  .input-box input[type="number"]:not(:placeholder-shown) ~ label,
  .input-box input[type="number"]:focus ~ label {
    top: -9px;
    font-size: 0.7em;
    background: #0a0a0a;
    padding: 0 6px;
    color: #fff;
  }

  /* ── File input ── */
  .file-box {
    margin: 12px 0;
  }
  .file-label {
    display: block;
    font-size: 0.72em;
    color: #555;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    margin-bottom: 6px;
    padding-left: 4px;
  }
  .file-input {
    width: 100%;
    background: transparent;
    border: 1.5px solid #333;
    border-radius: 14px;
    font-size: 0.82em;
    color: #555;
    padding: 8px 14px;
    box-sizing: border-box;
    cursor: pointer;
    transition: border-color 0.3s;
  }
  .file-input:focus,
  .file-input:hover {
    border-color: #fff;
    outline: none;
    color: #fff;
  }

  /* ── Submit button ── */
  .add-btn {
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
    margin-top: 8px;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    transition: background 0.25s, transform 0.15s;
  }
  .add-btn:hover { background: #ddd; transform: translateY(-1px); }
  .add-btn:active { transform: scale(0.98); }
  .add-btn:disabled { opacity: 0.4; cursor: not-allowed; }
`;

const Addproducts = () => {
  const [product_name, setProductName] = useState("");
  const [product_description, setProductDescription] = useState("");
  const [product_cost, setProductCost] = useState("");
  const [product_photo, setProductPhoto] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const formdata = new FormData();
      formdata.append("product_name", product_name);
      formdata.append("product_description", product_description);
      formdata.append("product_cost", product_cost);
      formdata.append("product_photo", product_photo);

      const response = await axios.post("https://telvin.alwaysdata.net/api/add_product", formdata);

      setLoading(false);
      setSuccess(response.data.message);
      setProductName("");
      setProductDescription("");
      setProductCost("");
      setProductPhoto("");
      e.target.reset();

      setTimeout(() => setSuccess(""), 5000);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="addproduct-page">
        <div className="orb-container">
          {Array.from({ length: 50 }, (_, i) => (
            <span key={i} style={{ '--i': i }} />
          ))}

          <div className="addproduct-box">
            <h2>Add Product</h2>
            <p className="addproduct-subtitle">Fill in the details below</p>

            {loading && <Loader />}
            {success && <p className="status status-success">{success}</p>}
            {error   && <p className="status status-error">{error}</p>}

            <form onSubmit={handleSubmit}>
              <div className="input-box">
                <input
                  type="text"
                  placeholder=" "
                  required
                  value={product_name}
                  onChange={(e) => setProductName(e.target.value)}
                />
                <label>Car Name</label>
              </div>

              <div className="input-box">
                <input
                  type="text"
                  placeholder=" "
                  required
                  value={product_description}
                  onChange={(e) => setProductDescription(e.target.value)}
                />
                <label>Car Description</label>
              </div>

              <div className="input-box">
                <input
                  type="number"
                  placeholder=" "
                  required
                  value={product_cost}
                  onChange={(e) => setProductCost(e.target.value)}
                />
                <label>Price (KES)</label>
              </div>

              <div className="file-box">
                <span className="file-label">Product Photo</span>
                <input
                  type="file"
                  className="file-input"
                  required
                  accept="image/*"
                  onChange={(e) => setProductPhoto(e.target.files[0])}
                />
              </div>

              <button className="add-btn" type="submit" disabled={loading}>
                {loading ? "Uploading..." : "Add Product"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Addproducts;
