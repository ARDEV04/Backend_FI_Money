import React, { useState } from 'react';
import { productsAPI } from '../api/api';

const ProductCard = ({ product, onUpdate, onDelete }) => {
  const [isUpdatingQuantity, setIsUpdatingQuantity] = useState(false);
  const [newQuantity, setNewQuantity] = useState(product.quantity);
  const [showQuantityInput, setShowQuantityInput] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleQuantityUpdate = async () => {
    if (newQuantity < 0) {
      alert('Quantity cannot be negative');
      return;
    }

    setLoading(true);
    try {
      await productsAPI.updateProductQuantity(product._id, parseInt(newQuantity));
      onUpdate();
      setShowQuantityInput(false);
      alert('Quantity updated successfully!');
    } catch (error) {
      console.error('Error updating quantity:', error);
      alert(error.response?.data?.error || 'Failed to update quantity');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setLoading(true);
      try {
        await productsAPI.deleteProduct(product._id);
        onDelete();
        alert('Product deleted successfully!');
      } catch (error) {
        console.error('Error deleting product:', error);
        alert(error.response?.data?.error || 'Failed to delete product');
      } finally {
        setLoading(false);
      }
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const getStockStatus = (quantity) => {
    if (quantity === 0) return { status: 'out-of-stock', text: 'Out of Stock' };
    if (quantity < 10) return { status: 'low-stock', text: 'Low Stock' };
    return { status: 'in-stock', text: 'In Stock' };
  };

  const stockInfo = getStockStatus(product.quantity);

  return (
    <div className="product-card">
      <div className="product-image">
        <img 
          src={product.image_url} 
          alt={product.name}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
          }}
        />
        <div className={`stock-badge ${stockInfo.status}`}>
          {stockInfo.text}
        </div>
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-type">{product.type}</p>
        <p className="product-sku">SKU: {product.sku}</p>
        <p className="product-description">{product.description}</p>
        
        <div className="product-details">
          <div className="price-quantity">
            <span className="product-price">{formatPrice(product.price)}</span>
            
            <div className="quantity-section">
              {!showQuantityInput ? (
                <div className="quantity-display">
                  <span className="quantity-label">Qty: </span>
                  <span className="quantity-value">{product.quantity}</span>
                  <button 
                    className="edit-quantity-btn"
                    onClick={() => setShowQuantityInput(true)}
                    disabled={loading}
                  >
                    ✏️
                  </button>
                </div>
              ) : (
                <div className="quantity-edit">
                  <input
                    type="number"
                    min="0"
                    value={newQuantity}
                    onChange={(e) => setNewQuantity(e.target.value)}
                    className="quantity-input"
                    disabled={loading}
                  />
                  <button 
                    className="save-btn"
                    onClick={handleQuantityUpdate}
                    disabled={loading}
                  >
                    {loading ? '...' : '✓'}
                  </button>
                  <button 
                    className="cancel-btn"
                    onClick={() => {
                      setShowQuantityInput(false);
                      setNewQuantity(product.quantity);
                    }}
                    disabled={loading}
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="product-actions">
          <button 
            className="delete-btn"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? 'Deleting...' : 'Delete Product'}
          </button>
        </div>

        <div className="product-meta">
          <small>Added: {new Date(product.createdAt).toLocaleDateString()}</small>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;