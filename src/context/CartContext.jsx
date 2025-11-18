import React, { createContext, useContext, useReducer, useEffect, useState } from "react";
import { cartReducer } from "../reducers/cartReducer.jsx"; // Vite requires extension

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [initialLoad, setInitialLoad] = useState(true);

  // Safe load from localStorage
  let storedCart = [];
  try {
    const raw = localStorage.getItem("cart");
    storedCart = raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error("Failed to parse cart from localStorage:", err);
    localStorage.removeItem("cart");
  }

  const [cart, dispatch] = useReducer(cartReducer, storedCart);

  // Sync cart to localStorage BUT avoid overwriting on first render
  useEffect(() => {
    if (!initialLoad) {
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      setInitialLoad(false);
    }
  }, [cart, initialLoad]);

  // Add item (merge duplicates inside reducer)
  const addToCart = (item) => {
    dispatch({ type: "ADD_ITEM", payload: item });
  };

  // Remove item (item._id + variants)
  const removeItem = (item) => {
    dispatch({ type: "REMOVE_ITEM", payload: item });
  };

  // Update quantity (clamped)
  const updateQuantity = (item, qty) => {
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: {
        item,
        quantity: Math.max(1, qty),
      },
    });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
