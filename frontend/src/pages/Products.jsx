import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productsAPI } from '../api/api';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    type: '',
    page: 1,
    limit: 12
  });
  const [pagination, setPagination] = useState({
    total: 0,
    pages: 0,
    currentPage: 1
  });

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await productsAPI.getProducts(filters);
      setProducts(response.products || []);
      setPagination(response.pagination || {});
      setError(null);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError(error.response?.data?.error || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

useEffect(() => {
  fetchProducts();
}, [fetchProducts]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value,
      page: 1 // Reset to first page when filters change
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProducts();
  };

  const handlePageChange = (newPage) => {
    setFilters(prev => ({
      ...prev,
      page: newPage
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      type: '',
      page: 1,
      limit: 12
    });
  };

  if (loading && products.length === 0) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div className="products-container">
      <div className="products-header">
        <h1>Product Inventory</h1>
        <Link to="/add-product" className="add-product-btn">
          + Add New Product
        </Link>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <form onSubmit={handleSearch} className="search-form">
          <div className="filter-group">
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="Search products..."
              className="search-input"
            />
            <input
              type="text"
              name="type"
              value={filters.type}
              onChange={handleFilterChange}
              placeholder="Filter by type..."
              className="type-filter"
            />
            <button type="submit" className="search-btn" disabled={loading}>
              Search
            </button>
            <button type="button" onClick={clearFilters} className="clear-btn">
              Clear
            </button>
          </div>
        </form>
      </div>

      {/* Results Info */}
      {!loading && (
        <div className="results-info">
          <span>
            Showing {products.length} of {pagination.total} products
            {filters.search && ` for "${filters.search}"`}
            {filters.type && ` in "${filters.type}"`}
          </span>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="error-container">
          <p className="error-message">{error}</p>
          <button onClick={fetchProducts} className="retry-btn">
            Try Again
          </button>
        </div>
      )}

      {/* Products Grid */}
      {!error && (
        <>
          {products.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📦</div>
              <h3>No products found</h3>
              <p>
                {filters.search || filters.type
                  ? 'Try adjusting your search filters'
                  : 'Start by adding your first product'
                }
              </p>
              {!filters.search && !filters.type && (
                <Link to="/add-product" className="add-first-product-btn">
                  Add Your First Product
                </Link>
              )}
            </div>
          ) : (
            <div className="products-grid">
              {products.map(product => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onUpdate={fetchProducts}
                  onDelete={fetchProducts}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="pagination">
              <button
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                disabled={pagination.currentPage === 1 || loading}
                className="pagination-btn"
              >
                Previous
              </button>
              
              <div className="pagination-info">
                <span>
                  Page {pagination.currentPage} of {pagination.pages}
                </span>
              </div>
              
              <button
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                disabled={pagination.currentPage === pagination.pages || loading}
                className="pagination-btn"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {loading && products.length > 0 && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}
    </div>
  );
};

export default Products;