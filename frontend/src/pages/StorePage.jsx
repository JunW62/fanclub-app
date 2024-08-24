import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../slices/productsSlice";
import { addToCart } from "../slices/cartSlice";
import { addToWishlist } from "../slices/wishlistSlice";

const StorePage = () => {
  const dispatch = useDispatch();
  const { items: products, status, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleAddToWishlist = (productId) => {
    dispatch(addToWishlist(productId));
  };

  let content;

  if (status === "loading") {
    content = <p>Loading products...</p>;
  } else if (status === "succeeded") {
    content = (
      <div className="product-list">
        {products.map((product) => {
          return (
            <div key={product._id} className="product-item">
              <img
                src={product.imgUrls[0]?.url}
                alt={product.name}
                style={{ width: "200px", height: "200px" }}
              />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <p>Stock: {product.stock}</p>
              <p>Material: {product.material}</p>
              <p>
                Release Date:{" "}
                {new Date(product.releaseDate).toLocaleDateString()}
              </p>
              <button onClick={() => handleAddToCart(product)}>
                Add to Cart
              </button>
              <button onClick={() => handleAddToWishlist(product._id)}>
                Add to Wishlist
              </button>
            </div>
          );
        })}
      </div>
    );
  } else if (status === "failed") {
    content = <p>{error}</p>;
  }

  return (
    <div className="store-page">
      <h2>Store</h2>
      {content}
    </div>
  );
};

export default StorePage;
