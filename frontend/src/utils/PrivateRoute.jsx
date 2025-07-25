import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { productsAPI } from '../api/api';

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    sku: '',
    image_url: '',
    description: '',
    quantity: '',
    price: ''
  });
  const [originalData, setOriginalData] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await productsAPI.getProduct(id);
      const product = response.product;
      const productData = {
        name: product.name,
        type: product.type,
        sku: product.sku,
        image_url: product.image_url,
        description: product.description,
        quantity: product.quantity.toString(),
        price: product.price.toString()
      };
      setFormData(productData);
      setOriginalData(productData);
    } catch (error) {
      console.error('Error fetching product:', error);
      alert('Product not found');
      navigate('/products');
    } finally {
      setFetchLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Product name must be at least 2 characters long';
    }

    // Type validation
    if (!formData.type.trim()) {
      newErrors.type = 'Product type is required';
    }

    // SKU validation
    if (!formData.sku.trim()) {
      newErrors.sku = 'SKU is required';
    } else if (!/^[A-Z0-9-_]+$/.test(formData.sku.toUpperCase())) {
      newErrors.sku = 'SKU can only contain uppercase letters, numbers, hyphens, and underscores';
    }

    // Image URL validation
    if (!formData.image_url.trim()) {
      newErrors.image_url = 'Image URL is required';
    } else if (!/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(formData.image_url)) {
      newErrors.image_url = 'Please provide a valid image URL (jpg, jpeg, png, gif, webp)';
    }

    // Description validation
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters long';
    }

    // Quantity validation
    if (!formData.quantity) {
      newErrors.quantity = 'Quantity is required';
    } else if (isNaN(formData.quantity) || parseInt(formData.quantity) < 0) {
      newErrors.quantity = 'Quantity must be a non-negative number';
    }

    // Price validation
    if (!formData.price) {
      newErrors.price = 'Price is required';
    } else if (isNaN(formData.price) || parseFloat(formData.price) < 0) {
      newErrors.price = 'Price must be a non-negative number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const hasChanges = () => {
    if (!originalData) return false;
    return Object.keys(formData).some(key => formData[key] !== originalData[key]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    if (!hasChanges()) {
      alert('No changes made to update');
      return;
    }

    setLoading(true);
    try {
      const productData = {
        ...formData,
        sku: formData.sku.toUpperCase(),
        quantity: parseInt(formData.quantity),
        price: parseFloat(formData.price)
      };

      await productsAPI.updateProduct(id, productData);
      alert('Product updated successfully!');
      navigate('/products');
    } catch (error) {
      console.error('Error updating product:', error);
      
      // Handle validation errors from backend
      if (error.response?.data?.details) {
        const validationErrors = {};
        error.response.data.details.forEach(detail => {
          validationErrors[detail.field] = detail.message;
        });
        setErrors(validationErrors);
      } else {
        setErrors({
          submit: error.response?.data?.error || 'Failed to update product. Please try again.'
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/products');
  };

  const handleReset = () => {
    if (originalData) {
      setFormData(originalData);
      setErrors({});
    }
  };

  if (fetchLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading product...</p>
      </div>
    );
  }

  return (
    <div className="form-container">
      <div className="form-card">
        <div className="form-header">
          <h1>Update Product</h1>
          <p>Modify the product details below</p>
        </div>

        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Product Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'error' : ''}
                placeholder="Enter product name"
                disabled={loading}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="type">Product Type *</label>
              <input
                type="text"
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className={errors.type ? 'error' : ''}
                placeholder="e.g., Electronics, Clothing, Books"
                disabled={loading}
              />
              {errors.type && <span className="error-message">{errors.type}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="sku">SKU *</label>
              <input
                type="text"
                id="sku"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                className={errors.sku ? 'error' : ''}
                placeholder="e.g., PROD-001"
                disabled={loading}
              />
              {errors.sku && <span className="error-message">{errors.sku}</span>}
              <small className="form-hint">
                Uppercase letters, numbers, hyphens, and underscores only
              </small>
            </div>

            <div className="form-group">
              <label htmlFor="image_url">Image URL *</label>
              <input
                type="url"
                id="image_url"
                name="image_url"
                value={formData.image_url}
                onChange={handleChange}
                className={errors.image_url ? 'error' : ''}
                placeholder="https://example.com/image.jpg"
                disabled={loading}
              />
              {errors.image_url && <span className="error-message">{errors.image_url}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={errors.description ? 'error' : ''}
              placeholder="Describe your product..."
              rows="4"
              disabled={loading}
            />
            {errors.description && <span className="error-message">{errors.description}</span>}
            <small className="form-hint">
              At least 10 characters
            </small>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="quantity">Quantity *</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className={errors.quantity ? 'error' : ''}
                placeholder="0"
                min="0"
                disabled={loading}
              />
              {errors.quantity && <span className="error-message">{errors.quantity}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="price">Price ($) *</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className={errors.price ? 'error' : ''}
                placeholder="0.00"
                min="0"
                step="0.01"
                disabled={loading}
              />
              {errors.price && <span className="error-message">{errors.price}</span>}
            </div>
          </div>

          {/* Image Preview */}
          {formData.image_url && !errors.image_url && (
            <div className="image-preview">
              <label>Image Preview:</label>
              <img
                src={formData.image_url}
                alt="Product preview"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
                style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'cover' }}
              />
            </div>
          )}

          {errors.submit && (
            <div className="error-message submit-error">
              {errors.submit}
            </div>
          )}

          <div className="form-actions">
            <button
              type="button"
              onClick={handleCancel}
              className="cancel-btn"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="reset-btn"
              disabled={loading || !hasChanges()}
            >
              Reset
            </button>
            <button
              type="submit"
              className="submit-btn"
              disabled={loading || !hasChanges()}
            >
              {loading ? 'Updating...' : 'Update Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;