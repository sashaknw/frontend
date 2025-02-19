import React from "react";
import { Link } from "react-router-dom";

const CartIcon = () => {
  const { cart } = useCart();

  return (
    <Link to="/cart" className="cart-icon">
      🛒 Cart ({cart.length})
    </Link>
  );
};

export default CartIcon;
