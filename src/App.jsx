import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import AllRecordsPage from "./pages/AllRecordsPage";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import CartPage from "./pages/CartPage";
import NotFound from "./pages/PageNotFound.jsx"; 

function App() {
  
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  
  const addToCart = (record) => {
  
    if (!record || !record.id) {
      console.error("Invalid record", record);
      return;
    }

    setCart((prevCart) => {
      
      const existingItem = prevCart.find((item) => item.id === record.id);

      if (existingItem) {
       
        return prevCart.map((item) =>
          item.id === record.id
            ? {
                ...item,
                quantity: Math.min((item.quantity || 1) + 1, 10), 
              }
            : item
        );
      }

      
      return [...prevCart, { ...record, quantity: 1 }];
    });
  };

  const removeFromCart = (recordId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== recordId));
  };

  const updateCartItemQuantity = (recordId, newQuantity) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === recordId
            ? {
                ...item,
                quantity: Math.min(newQuantity, 10), 
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  
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

        <main className="  flex-grow bg-[#1a1a1a]">
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
