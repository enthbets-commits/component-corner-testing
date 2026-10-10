import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";

import "./App.css";

// AI Attribution: ChatGPT was used to assist with React Router setup,
// page component structure, product details routing, and localStorage
// cart persistence.

function App() {
  // Load the cart from localStorage when the app starts
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("componentCornerCart");

      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Could not load cart from localStorage:", error);
      return [];
    }
  });

  // Product information
  const products = [
    {
      id: 1,
      name: "Mechanical Keyboard",
      price: 89.99,
      image:
        "https://placehold.co/600x400/111827/ffffff?text=Mechanical+Keyboard",
      description:
        "A responsive mechanical keyboard designed for gaming, work, and everyday use.",
    },
    {
      id: 2,
      name: "Gaming Mouse",
      price: 49.99,
      image:
        "https://placehold.co/600x400/374151/ffffff?text=Gaming+Mouse",
      description:
        "A lightweight gaming mouse with precise tracking and customizable controls.",
    },
    {
      id: 3,
      name: "Wireless Headset",
      price: 79.99,
      image:
        "https://placehold.co/600x400/4b5563/ffffff?text=Wireless+Headset",
      description:
        "Comfortable wireless headphones with clear audio for gaming and entertainment.",
    },
  ];

  // Save cart to localStorage whenever the cart changes
  useEffect(() => {
    localStorage.setItem("componentCornerCart", JSON.stringify(cart));
  }, [cart]);

  // Add a product to the shopping cart
  const addToCart = (product) => {
    setCart((currentCart) => [...currentCart, product]);
  };

  // Remove a product from the shopping cart
  const removeFromCart = (id) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== id)
    );
  };

  return (
    <BrowserRouter>
      <div className="app">
        <Header
          storeName="TechCorner"
          cartCount={cart.length}
        />

        <Routes>
          <Route
            path="/"
            element={<HomePage />}
          />

          <Route
            path="/products"
            element={
              <ProductsPage
                products={products}
                addToCart={addToCart}
              />
            }
          />

          <Route
            path="/products/:productId"
            element={
              <ProductDetailsPage
                products={products}
                addToCart={addToCart}
              />
            }
          />

          <Route
            path="/cart"
            element={
              <CartPage
                cart={cart}
                removeFromCart={removeFromCart}
              />
            }
          />
        </Routes>

        <Footer
          storeName="TechCorner"
          email="support@techcorner.com"
          phone="(555) 123-4567"
        />
      </div>
    </BrowserRouter>
  );
}

export default App;