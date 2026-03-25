import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const styles = `
  .signin-page {
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
  .signin-box {
    position: absolute;
    z-index: 1;
    width: 82%;
    max-width: 310px;
    padding: 24px 22px 18px;
    border-radius: 22px;
    background: rgba(10, 10, 10, 0.95);
    border: 1px solid rgba(255, 255, 255, 0.15);
    box-shadow: 0 0 40px rgba(255, 255, 255, 0.05);
    animation: fadeUp 0.5s ease;
  }
  .signin-box h2 {
    font-size: 1.6em;
    color: #fff;
    text-align: center;
    margin: 0 0 10px;
    letter-spacing: 1px;
    text-transform: uppercase;
  }
  .status {
    text-align: center;
    font-size: 0.82em;
    border-radius: 30px;
    padding: 6px 12px;
    margin-bottom: 10px;
  }
  .status-loading { color: #aaa; background: rgba(255,255,255,0.07); }
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
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.08);
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
  .forgot-pass {
    margin: -4px 0 8px;
    text-align: right;
    padding-right: 4px;
  }
  .forgot-pass a {
    font-size: 0.75em;
    color: #555;
    text-decoration: none;
    transition: color 0.2s;
  }
  .forgot-pass a:hover { color: #fff; }
  .signin-btn {
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
  .signin-btn:hover { background: #ddd; transform: translateY(-1px); }
  .signin-btn:active { transform: scale(0.98); }
  .signin-btn:disabled { opacity: 0.4; cursor: not-allowed; }
  .switch-link {
    margin-top: 13px;
    text-align: center;
    font-size: 0.8em;
    color: #555;
  }
  .switch-link a {
    color: #fff;
    text-decoration: none;
    font-weight: 700;
    margin-left: 3px;
  }
  .switch-link a:hover { opacity: 0.7; }
`;

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    setLoading("Validating your account...");
    setError("");
    setSuccess("");

    try {
      const formdata = new FormData();
      formdata.append("email", email);
      formdata.append("password", password);

      const response = await axios.post("https://telvin.alwaysdata.net/api/signin", formdata);

      setLoading("");

      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setSuccess("Login successful");
        navigate("/");
      } else {
        setError("Login Failed. Please try again...");
      }
    } catch (error) {
      setLoading("");
      setError("Oops, something went wrong. Try again...");
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="signin-page">
        <div className="orb-container">
          {Array.from({ length: 50 }, (_, i) => (
            <span key={i} style={{ '--i': i }} />
          ))}
          <div className="signin-box">
            <h2>Sign In</h2>

            {loading && <p className="status status-loading">{loading}</p>}
            {success && <p className="status status-success">{success}</p>}
            {error   && <p className="status status-error">{error}</p>}

            <form onSubmit={handlesubmit}>
              <div className="input-box">
                <input type="email" placeholder=" " required
                  value={email} onChange={(e) => setEmail(e.target.value)} />
                <label>Email Address</label>
              </div>
              <div className="input-box">
                <input type="password" placeholder=" " required
                  value={password} onChange={(e) => setPassword(e.target.value)} />
                <label>Password</label>
              </div>

              <div className="forgot-pass">
                <a href="#">Forgot your password?</a>
              </div>

              <button className="signin-btn" type="submit" disabled={!!loading}>
                {loading ? "Validating..." : "Sign In"}
              </button>

              <div className="switch-link">
                Don't have an account?
                <Link to="/signup"> Register</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
