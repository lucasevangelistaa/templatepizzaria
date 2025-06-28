import { useState } from "react";
import Home from "./pages/Home";
import { pizzaMenu } from "./data/menu.js";
import { AnimatePresence } from "framer-motion";
import Cart from "./components/Cart";
import FloatingCartButton from "./components/FloatingCartButton";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (pizza) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === pizza.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === pizza.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...pizza, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(id);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    // <div className="min-h-screen bg-gray-50">
    <div className="min-h-screen text-white">
      <AnimatePresence>
        {isCartOpen && (
          <Cart
            cartItems={cartItems}
            onClose={() => setIsCartOpen(false)}
            removeFromCart={removeFromCart}
            updateQuantity={updateQuantity}
            clearCart={clearCart}
          />
        )}
      </AnimatePresence>

      <FloatingCartButton
        itemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onClick={() => setIsCartOpen(true)}
      />

      <Home pizzaMenu={pizzaMenu} addToCart={addToCart} />
    </div>
  );
}

export default App;
