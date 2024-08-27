import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, deleteProduct } from "../slices/productsSlice";
import { Link } from "react-router-dom";
import PageHeader from "../components/Banner";
import "../styles/ManageProducts.css";

const ManageProductsPage = () => {
  const dispatch = useDispatch();
  const { items: products, status, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(productId));
    }
  };

  if (status === "loading") return <div>Loading products...</div>;
  if (status === "failed") return <div>Error: {error}</div>;

  return (
    <div className="manage-products-page">
      <PageHeader title="Manage Products" />

      <div className="manage-products-content">
        <table className="products-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>
                  <img
                    src={product.imgUrls[0]?.url}
                    alt={product.name}
                    className="product-thumbnail"
                  />
                </td>
                <td>{product.name}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>{product.stock}</td>
                <td>
                  <Link
                    to={`/edit-product/${product._id}`}
                    className="edit-btn"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                  <Link to="/add-product" className="add-product-btn">
                    Add
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProductsPage;
