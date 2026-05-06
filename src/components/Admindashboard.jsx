import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';

const styles = `
  .admin-page {
    min-height: 100vh;
    background: #000;
    font-family: 'Segoe UI', sans-serif;
    padding: 100px 40px 60px;
    box-sizing: border-box;
  }

  .admin-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
    flex-wrap: wrap;
    gap: 12px;
  }
  .admin-title {
    font-size: 1.4em;
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 3px;
    font-weight: 800;
  }
  .admin-subtitle {
    font-size: 0.75em;
    color: #333;
    letter-spacing: 1px;
    margin-top: 4px;
  }
  .admin-badge {
    background: #fff;
    color: #000;
    font-size: 0.72em;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    padding: 6px 16px;
    border-radius: 40px;
  }

  .admin-subline {
    width: 40px;
    height: 2px;
    background: #222;
    border-radius: 2px;
    margin-bottom: 32px;
  }

  /* ── Stats bar ── */
  .admin-stats {
    display: flex;
    gap: 16px;
    margin-bottom: 36px;
    flex-wrap: wrap;
  }
  .stat-card {
    flex: 1;
    min-width: 140px;
    background: rgba(255,255,255,0.03);
    border: 1px solid #1a1a1a;
    border-radius: 16px;
    padding: 18px 20px;
  }
  .stat-label {
    font-size: 0.7em;
    color: #444;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 6px;
  }
  .stat-value {
    font-size: 2em;
    font-weight: 800;
    color: #fff;
    line-height: 1;
  }

  /* ── Table ── */
  .admin-table-wrap {
    width: 100%;
    overflow-x: auto;
    border: 1px solid #1a1a1a;
    border-radius: 18px;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.85em;
  }
  thead tr {
    border-bottom: 1px solid #1a1a1a;
  }
  thead th {
    padding: 14px 18px;
    text-align: left;
    font-size: 0.72em;
    color: #444;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 600;
    white-space: nowrap;
  }
  tbody tr {
    border-bottom: 1px solid #0f0f0f;
    transition: background 0.2s;
  }
  tbody tr:last-child { border-bottom: none; }
  tbody tr:hover { background: rgba(255,255,255,0.02); }
  tbody td {
    padding: 14px 18px;
    color: #888;
    vertical-align: middle;
  }
  .td-name {
    color: #fff;
    font-weight: 600;
  }
  .td-img {
    width: 52px;
    height: 38px;
    object-fit: cover;
    border-radius: 8px;
    border: 1px solid #1a1a1a;
  }
  .td-category {
    font-size: 0.75em;
    color: #444;
    text-transform: uppercase;
    letter-spacing: 0.6px;
  }
  .td-price { color: #fff; font-weight: 700; }

  /* ── Action buttons ── */
  .action-btns { display: flex; gap: 8px; }
  .btn-edit {
    height: 32px;
    padding: 0 14px;
    border-radius: 40px;
    border: 1px solid #333;
    background: transparent;
    color: #aaa;
    font-size: 0.75em;
    font-weight: 600;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    cursor: pointer;
    font-family: 'Segoe UI', sans-serif;
    transition: border-color 0.2s, color 0.2s;
  }
  .btn-edit:hover { border-color: #fff; color: #fff; }
  .btn-delete {
    height: 32px;
    padding: 0 14px;
    border-radius: 40px;
    border: 1px solid #3a1a1a;
    background: transparent;
    color: #f87171;
    font-size: 0.75em;
    font-weight: 600;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    cursor: pointer;
    font-family: 'Segoe UI', sans-serif;
    transition: background 0.2s, color 0.2s;
  }
  .btn-delete:hover { background: #f87171; color: #000; border-color: #f87171; }

  /* ── Edit modal ── */
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.85);
    z-index: 2000;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
  }
  .modal-box {
    background: #0a0a0a;
    border: 1px solid #222;
    border-radius: 22px;
    padding: 28px 26px;
    width: 100%;
    max-width: 380px;
    animation: fadeUp 0.3s ease;
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .modal-title {
    font-size: 1.1em;
    font-weight: 800;
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 20px;
  }
  .modal-input {
    width: 100%;
    height: 42px;
    background: transparent;
    border: 1.5px solid #333;
    border-radius: 40px;
    font-size: 0.88em;
    color: #fff;
    padding: 0 16px;
    outline: none;
    box-sizing: border-box;
    font-family: 'Segoe UI', sans-serif;
    margin-bottom: 12px;
    transition: border-color 0.3s;
  }
  .modal-input:focus { border-color: #fff; }
  .modal-input::placeholder { color: #444; }
  .modal-actions { display: flex; gap: 10px; margin-top: 6px; }
  .btn-save {
    flex: 1;
    height: 40px;
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
    transition: background 0.2s;
  }
  .btn-save:hover { background: #ddd; }
  .btn-cancel {
    flex: 1;
    height: 40px;
    background: transparent;
    border: 1px solid #333;
    border-radius: 40px;
    color: #555;
    font-size: 0.85em;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    cursor: pointer;
    font-family: 'Segoe UI', sans-serif;
    transition: border-color 0.2s, color 0.2s;
  }
  .btn-cancel:hover { border-color: #fff; color: #fff; }

  .status-msg {
    text-align: center;
    font-size: 0.82em;
    border-radius: 30px;
    padding: 6px 14px;
    margin-bottom: 20px;
  }
  .status-success { color: #4ade80; background: rgba(74,222,128,0.1); }
  .status-error   { color: #f87171; background: rgba(248,113,113,0.1); }
  .no-products {
    text-align: center;
    padding: 40px;
    color: #333;
    font-size: 0.9em;
  }
`;

const img_url = "https://telvin.alwaysdata.net/static/images/";
const API = "https://telvin.alwaysdata.net/api";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });
  const [editProduct, setEditProduct] = useState(null);

  // Auth guard
  useEffect(() => {
    const user = localStorage.getItem("user");
    const role = localStorage.getItem("role");
    if (!user || role !== "admin") navigate("/signin", { replace: true });
  }, [navigate]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/get_products`);
      setProducts(res.data);
    } catch {
      setMsg({ type: "error", text: "Failed to load products." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this car?")) return;
    try {
      await axios.delete(`${API}/delete_product/${id}`);
      setProducts(products.filter(p => p.id !== id));
      setMsg({ type: "success", text: "Car deleted successfully." });
      setTimeout(() => setMsg({ type: "", text: "" }), 4000);
    } catch {
      setMsg({ type: "error", text: "Failed to delete. Try again." });
    }
  };

  const handleEditSave = async () => {
    try {
      const formdata = new FormData();
      formdata.append("product_name", editProduct.product_name);
      formdata.append("product_description", editProduct.product_description);
      formdata.append("product_cost", editProduct.product_cost);
      formdata.append("product_category", editProduct.product_category || "");

      await axios.put(`${API}/update_product/${editProduct.id}`, formdata);
      setProducts(products.map(p => p.id === editProduct.id ? editProduct : p));
      setEditProduct(null);
      setMsg({ type: "success", text: "Car updated successfully." });
      setTimeout(() => setMsg({ type: "", text: "" }), 4000);
    } catch {
      setMsg({ type: "error", text: "Failed to update. Try again." });
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="admin-page">

        {/* Header */}
        <div className="admin-header">
          <div>
            <div className="admin-title">Admin Dashboard</div>
            <div className="admin-subtitle">Colti Group — Vehicle Management</div>
          </div>
          <span className="admin-badge">Admin</span>
        </div>
        <div className="admin-subline" />

        {/* Stats */}
        <div className="admin-stats">
          <div className="stat-card">
            <div className="stat-label">Total Cars</div>
            <div className="stat-value">{products.length}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Categories</div>
            <div className="stat-value">
              {new Set(products.map(p => p.product_category).filter(Boolean)).size}
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Avg Price</div>
            <div className="stat-value">
              {products.length > 0
                ? `${Math.round(products.reduce((s, p) => s + Number(p.product_cost), 0) / products.length).toLocaleString()}`
                : "—"}
            </div>
          </div>
        </div>

        {/* Status messages */}
        {msg.text && (
          <p className={`status-msg status-${msg.type}`}>{msg.text}</p>
        )}

        {/* Products table */}
        {loading ? <Loader /> : (
          <div className="admin-table-wrap">
            {products.length === 0 ? (
              <div className="no-products">No cars found. Add some from the Add Car page.</div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Photo</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price (KES)</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td>
                        <img
                          className="td-img"
                          src={img_url + product.product_photo}
                          alt={product.product_name}
                        />
                      </td>
                      <td className="td-name">{product.product_name}</td>
                      <td className="td-category">{product.product_category || "—"}</td>
                      <td className="td-price">{Number(product.product_cost).toLocaleString()}</td>
                      <td>
                        <div className="action-btns">
                          <button className="btn-edit" onClick={() => setEditProduct({ ...product })}>
                            Edit
                          </button>
                          <button className="btn-delete" onClick={() => handleDelete(product.id)}>
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Edit modal */}
        {editProduct && (
          <div className="modal-overlay" onClick={() => setEditProduct(null)}>
            <div className="modal-box" onClick={(e) => e.stopPropagation()}>
              <div className="modal-title">Edit Car</div>
              <input
                className="modal-input"
                placeholder="Car Name"
                value={editProduct.product_name}
                onChange={(e) => setEditProduct({ ...editProduct, product_name: e.target.value })}
              />
              <input
                className="modal-input"
                placeholder="Description"
                value={editProduct.product_description}
                onChange={(e) => setEditProduct({ ...editProduct, product_description: e.target.value })}
              />
              <input
                className="modal-input"
                placeholder="Price (KES)"
                type="number"
                value={editProduct.product_cost}
                onChange={(e) => setEditProduct({ ...editProduct, product_cost: e.target.value })}
              />
              <input
                className="modal-input"
                placeholder="Category"
                value={editProduct.product_category || ""}
                onChange={(e) => setEditProduct({ ...editProduct, product_category: e.target.value })}
              />
              <div className="modal-actions">
                <button className="btn-save" onClick={handleEditSave}>Save</button>
                <button className="btn-cancel" onClick={() => setEditProduct(null)}>Cancel</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
};

export default AdminDashboard;
