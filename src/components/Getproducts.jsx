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
    margin: 0 auto 32px;
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

  .product-card-body {
    padding: 14px 16px 16px;
  }

  .product-card-name {
    font-size: 1em;
    font-weight: 700;
    color: #fff;
    margin: 0 0 6px;
    letter-spacing: 0.2px;
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

  .purchase-btn:hover {
    background: #ddd;
    transform: translateY(-1px);
  }

  .purchase-btn:active {
    transform: scale(0.98);
  }
`;

const Getproducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  return (
    <>
      <style>{styles}</style>
      <div className="products-page">
        <h3 className="products-heading">Available Products</h3>
        <div className="products-subline" />

        {loading && <Loader />}
        {error && <p className="status-error">{error}</p>}

        <div className="products-grid">
          {products.map((product, index) => (
            <div
              className="product-card"
              key={product.id || index}
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <img
                src={img_url + product.product_photo}
                alt={product.product_name}
              />
              <div className="product-card-body">
                <p className="product-card-name">{product.product_name}</p>
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
