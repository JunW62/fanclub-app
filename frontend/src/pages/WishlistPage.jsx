import React from "react";
import PageHeader from "../components/Banner";
import Wishlist from "../components/Wishlist";

const WishlistPage = () => {
  return (
    <div className="wishlist-page">
      <PageHeader title="My Wishlist" />
      <div className="wishlist-content">
        <Wishlist />
      </div>
    </div>
  );
};

export default WishlistPage;
