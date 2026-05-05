import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';

const styles = `
  .products-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    background: #000;
    font-family: 'Segoe UI', sans-serif;
    padding: 40px 20px;
  }
  .products-heading {
    font-size: 1.4em;
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 6px;
    text-align: center;
  }
  .products-subline {
    width: 40px;
    height: 2px;
    background: #333;
    border-radius: 2px;
    margin: 0 auto 24px;
  }
  .search-wrapper {
    width: 100%;
    max-width: 460px;
    position: relative;
    margin-bottom: 12px;
  }
  .search-icon {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: #555;
    font-size: 1em;
    pointer-events: none;
  }
  .search-input {
    width: 100%;
    height: 46px;
    background: rgba(255,255,255,0.04);
    border: 1.5px solid #222;
    border-radius: 40px;
    font-size: 0.9em;
    color: #fff;
    padding: 0 44px 0 44px;
    outline: none;
    box-sizing: border-box;
    transition: border-color 0.3s, box-shadow 0.3s;
    font-family: 'Segoe UI', sans-serif;
  }
  .search-input::placeholder { color: #444; }
  .search-input:focus {
    border-color: #fff;
    box-shadow: 0 0 0 3px rgba(255,255,255,0.06);
  }
  .search-clear {
    position: absolute;
    right: 14px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: #555;
    font-size: 1.1em;
    cursor: pointer;
    padding: 0;
    line-height: 1;
    transition: color 0.2s;
  }
  .search-clear:hover { color: #fff; }



  .search-count {
    text-align: center;
    font-size: 0.75em;
    color: #444;
    margin-bottom: 24px;
    letter-spacing: 0.5px;
  }
  .search-count span { color: #fff; }
  .no-results {
    text-align: center;
    padding: 40px 20px;
    color: #333;
    font-size: 0.9em;
    letter-spacing: 0.5px;
  }
  .no-results strong {
    display: block;
    font-size: 2.5em;
    margin-bottom: 8px;
  }
  .status-error {
    text-align: center;
    font-size: 0.85em;
    color: #f87171;
    background: rgba(248,113,113,0.1);
    border-radius: 30px;
    padding: 6px 16px;
    margin-bottom: 20px;
  }
  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 20px;
    width: 100%;
    max-width: 1000px;
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .product-card {
    background: rgba(10, 10, 10, 0.95);
    border: 1px solid #1a1a1a;
    border-radius: 18px;
    overflow: hidden;
    transition: border-color 0.3s, transform 0.3s;
    animation: fadeUp 0.5s ease both;
  }
  .product-card:hover {
    border-color: #fff;
    transform: translateY(-4px);
  }
  .product-card img {
    width: 100%;
    height: 160px;
    object-fit: cover;
    display: block;
    border-bottom: 1px solid #1a1a1a;
  }
  .product-card-body { padding: 14px 16px 16px; }
  .product-card-name {
    font-size: 1em;
    font-weight: 700;
    color: #fff;
    margin: 0 0 4px;
  }
  .product-card-category {
    font-size: 0.7em;
    font-weight: 600;
    color: #444;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    margin: 0 0 6px;
  }
  .product-card-desc {
    font-size: 0.78em;
    color: #555;
    margin: 0 0 10px;
    line-height: 1.55;
  }
  .product-card-cost {
    font-size: 1em;
    font-weight: 800;
    color: #fff;
    margin: 0 0 14px;
  }
  .purchase-btn {
    width: 100%;
    height: 38px;
    background: #fff;
    border: none;
    outline: none;
    border-radius: 40px;
    cursor: pointer;
    font-size: 0.82em;
    color: #000;
    font-weight: 700;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    transition: background 0.2s, transform 0.15s;
  }
  .purchase-btn:hover { background: #ddd; transform: translateY(-1px); }
  .purchase-btn:active { transform: scale(0.98); }
`;

const Getproducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const img_url = "https://telvin.alwaysdata.net/static/images/";

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://telvin.alwaysdata.net/api/get_products");
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.product_name.toLowerCase().includes(search.toLowerCase()) ||
    product.product_description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <style>{styles}</style>
      <div className="products-page">
        <h3 className="products-heading">Showroom</h3>
        <div className="products-subline" />

        {/* Search bar */}
        <div className="search-wrapper" id="showroom">
          <span className="search-icon">&#128269;</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search by name or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button className="search-clear" onClick={() => setSearch("")}>
              &#10005;
            </button>
          )}
        </div>

        {/* Result count */}
        {!loading && products.length > 0 && (
          <p className="search-count">
            Showing <span>{filteredProducts.length}</span> of <span>{products.length}</span> cars
            {search && <> for &ldquo;<span>{search}</span>&rdquo;</>}
          </p>
        )}

        {loading && <Loader />}
        {error && <p className="status-error">{error}</p>}

        {/* No results */}
        {!loading && filteredProducts.length === 0 && search && (
          <div className="no-results">
            <strong>&#9785;</strong>
            No cars found for &ldquo;{search}&rdquo;
          </div>
        )}

        <div className="products-grid">
          {filteredProducts.map((product, index) => (
            <div
              className="product-card"
              key={product.id || index}
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <img src={img_url + product.product_photo} alt={product.product_name} />
              <div className="product-card-body">
                <p className="product-card-name">{product.product_name}</p>
                {product.product_category && (
                  <p className="product-card-category">{product.product_category}</p>
                )}
                <p className="product-card-desc">
                  {product.product_description.slice(0, 100)}...
                </p>
                <p className="product-card-cost">KES {product.product_cost}</p>
                <button
                  className="purchase-btn"
                  onClick={() => navigate("/makepayment", { state: { product } })}
                >
                  Purchase Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Getproducts;
