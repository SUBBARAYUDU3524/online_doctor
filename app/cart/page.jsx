"use client";
import React, { useContext } from "react";
import UserContext from "../UserContext";

const Cart = () => {
  const { cartItems, removeItemFromCart } = useContext(UserContext);

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <div className="container mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold mb-6">Your Cart</h2>
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-gray-800 p-4 rounded-lg text-center"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="mx-auto h-32 w-32 object-cover rounded-md"
                />
                <h3 className="text-lg font-semibold mt-2">{item.name}</h3>
                <p className="text-green-400 font-bold">{item.price}</p>
                <button
                  className="mt-3 bg-red-500 px-4 py-2 rounded-md hover:bg-red-600"
                  onClick={() => removeItemFromCart(item.id)}
                >
                  Remove from Cart
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">Your cart is empty</p>
        )}
      </div>
    </div>
  );
};

export default Cart;
