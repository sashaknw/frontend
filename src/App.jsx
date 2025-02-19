import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import AllRecordsPage from "./pages/AllRecordsPage";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import CartPage from "./pages/CartPage";

function App() {
  // Load cart from local storage on initial render
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add to cart function
  const addToCart = (record) => {
    // Validate record before adding
    if (!record || !record.id) {
      console.error("Invalid record", record);
      return;
    }

    setCart((prevCart) => {
      // Check if item already exists in cart
      const existingItem = prevCart.find((item) => item.id === record.id);

      if (existingItem) {
        // If exists, increase quantity
        return prevCart.map((item) =>
          item.id === record.id
            ? {
                ...item,
                quantity: Math.min((item.quantity || 1) + 1, 10), // Limit to 10 items
              }
            : item
        );
      }

      // If new item, add with quantity 1
      return [...prevCart, { ...record, quantity: 1 }];
    });
  };

  // Remove from cart function
  const removeFromCart = (recordId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== recordId));
  };

  // Update quantity function
  const updateCartItemQuantity = (recordId, newQuantity) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === recordId
            ? {
                ...item,
                quantity: Math.min(newQuantity, 10), // Limit to 10 items
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Clear entire cart
  const clearCart = () => {
    setCart([]);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <NavBar
          cartItemCount={cart.reduce(
            (total, item) => total + (item.quantity || 1),
            0
          )}
        />

        <main className="container mx-auto px-4 flex-grow">
          <Routes>
            <Route path="/about" element={<AboutPage />} />
            <Route
              path="/records"
              element={<AllRecordsPage addToCart={addToCart} />}
            />
            <Route path="/" element={<HomePage />} />
            <Route
              path="/cart"
              element={
                <CartPage
                  cart={cart}
                  removeFromCart={removeFromCart}
                  updateCartItemQuantity={updateCartItemQuantity}
                  clearCart={clearCart}
                />
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
