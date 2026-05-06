import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const styles = `
  .user-dash-page {
    min-height: 100vh;
    background: #000;
    font-family: 'Segoe UI', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 100px 20px 60px;
    box-sizing: border-box;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .user-dash-card {
    width: 100%;
    max-width: 420px;
    background: rgba(10,10,10,0.95);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 26px;
    padding: 36px 32px;
    box-shadow: 0 0 60px rgba(255,255,255,0.03);
    animation: fadeUp 0.5s ease;
  }

  /* ── Avatar ── */
  .user-avatar {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 16px;
  }
  .user-avatar svg {
    width: 36px;
    height: 36px;
  }

  .user-dash-name {
    font-size: 1.3em;
    font-weight: 800;
    color: #fff;
    text-align: center;
    letter-spacing: 0.5px;
    margin-bottom: 4px;
    text-transform: uppercase;
  }
  .user-dash-role {
    text-align: center;
    font-size: 0.72em;
    color: #444;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 28px;
  }

  .user-subline {
    width: 40px;
    height: 2px;
    background: #1a1a1a;
    border-radius: 2px;
    margin: 0 auto 28px;
  }

  /* ── Info rows ── */
  .user-info-list {
    display: flex;
    flex-direction: column;
    gap: 14px;
    margin-bottom: 28px;
  }
  .user-info-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 16px;
    background: rgba(255,255,255,0.02);
    border: 1px solid #111;
    border-radius: 14px;
  }
  .user-info-label {
    font-size: 0.72em;
    color: #444;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 600;
  }
  .user-info-value {
    font-size: 0.88em;
    color: #fff;
    font-weight: 500;
    max-width: 60%;
    text-align: right;
    word-break: break-all;
  }

  /* ── Logout btn ── */
  .user-logout-btn {
    width: 100%;
    height: 42px;
    background: transparent;
    border: 1px solid #2a1a1a;
    border-radius: 40px;
    color: #f87171;
    font-size: 0.85em;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    cursor: pointer;
    font-family: 'Segoe UI', sans-serif;
    transition: background 0.2s, color 0.2s, border-color 0.2s;
  }
  .user-logout-btn:hover {
    background: #f87171;
    color: #000;
    border-color: #f87171;
  }

  .user-browse-btn {
    width: 100%;
    height: 42px;
    background: #fff;
    border: none;
    border-radius: 40px;
    color: #000;
    font-size: 0.85em;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    cursor: pointer;
    font-family: 'Segoe UI', sans-serif;
    margin-bottom: 10px;
    transition: background 0.2s, transform 0.15s;
  }
  .user-browse-btn:hover { background: #ddd; transform: translateY(-1px); }
`;

const UserDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    const role = localStorage.getItem("role");
    if (!stored || role !== "user") {
      navigate("/signin", { replace: true });
      return;
    }
    try {
      setUser(JSON.parse(stored));
    } catch {
      navigate("/signin", { replace: true });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    navigate("/signin", { replace: true });
  };

  if (!user) return null;

  return (
    <>
      <style>{styles}</style>
      <div className="user-dash-page">
        <div className="user-dash-card">

          {/* Avatar */}
          <div className="user-avatar">
            <svg viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
          </div>

          <div className="user-dash-name">
            {user.username || user.name || "Member"}
          </div>
          <div className="user-dash-role">Colti Group Member</div>
          <div className="user-subline" />

          {/* Profile info */}
          <div className="user-info-list">
            {user.username && (
              <div className="user-info-row">
                <span className="user-info-label">Username</span>
                <span className="user-info-value">{user.username}</span>
              </div>
            )}
            {user.name && (
              <div className="user-info-row">
                <span className="user-info-label">Full Name</span>
                <span className="user-info-value">{user.name}</span>
              </div>
            )}
            {user.email && (
              <div className="user-info-row">
                <span className="user-info-label">Email</span>
                <span className="user-info-value">{user.email}</span>
              </div>
            )}
            {user.phone && (
              <div className="user-info-row">
                <span className="user-info-label">Phone</span>
                <span className="user-info-value">{user.phone}</span>
              </div>
            )}
            <div className="user-info-row">
              <span className="user-info-label">Member Since</span>
              <span className="user-info-value">
                {user.created_at
                  ? new Date(user.created_at).toLocaleDateString()
                  : new Date().getFullYear()}
              </span>
            </div>
          </div>

          <button className="user-browse-btn" onClick={() => navigate("/")}>
            Browse Showroom
          </button>
          <button className="user-logout-btn" onClick={handleLogout}>
            Sign Out
          </button>

        </div>
      </div>
    </>
  );
};

export default UserDashboard;
