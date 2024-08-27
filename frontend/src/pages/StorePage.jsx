import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../slices/productsSlice";
import ProductList from "../components/ProductList";
import PageHeader from "../components/Banner";

const StorePage = () => {
  const dispatch = useDispatch();
  const { items: allProducts, status, error } = useSelector(
    (state) => state.products
  );
  const [newInProducts, setNewInProducts] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);

  const newInIds = [
    "66c7792b8bc8c95f42992511",
    "66cb8f41db3640b593ed114c",
    "66cb8f41db3640b593ed1150",
    "66cb8f42db3640b593ed1164",
  ];

  const bestSellerIds = [
    "66cb8f41db3640b593ed1148",
    "66cb8f42db3640b593ed115c",
    "66cb8f42db3640b593ed1160",
    "66cb8f42db3640b593ed1194",
  ];

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (status === "succeeded") {
      const newIn = allProducts.filter((product) =>
        newInIds.includes(product._id)
      );
      const bestSellers = allProducts.filter((product) =>
        bestSellerIds.includes(product._id)
      );
      setNewInProducts(newIn);
      setBestSellers(bestSellers);
    }
  }, [allProducts, status]);

  if (status === "loading") {
    return <p>Loading products...</p>;
  }

  if (status === "failed") {
    return <p>{error}</p>;
  }

  return (
    <div className="store-page">
      <div className="store-content">
        <PageHeader title="New In" className="store-header" />
        <ProductList products={newInProducts} className="new-in-product-list" />
        <PageHeader title="Best Sellers" className="store-header" />
        <ProductList
          products={bestSellers}
          className="best-sellers-product-list"
        />
        <PageHeader title="All Products" className="store-header" />
        <ProductList products={allProducts} />
      </div>
    </div>
  );
};

export default StorePage;
