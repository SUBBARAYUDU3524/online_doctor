"use client";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../UserContext";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { auth, db } from "../FirebaseConfig"; // Ensure you have Firebase initialized in a firebase.js file

const Cart = () => {
  const { cartItems, removeItemFromCart } = useContext(UserContext);
  const [selectedItems, setSelectedItems] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => {
      console.log("Razorpay script loaded successfully");
    };
    document.body.appendChild(script);
  }, []);

  const handleSelectItem = (item) => {
    const newSelectedItems = { ...selectedItems };
    if (newSelectedItems[item.id]) {
      newSelectedItems[item.id].quantity += 1;
    } else {
      newSelectedItems[item.id] = { ...item, quantity: 1 };
    }
    setSelectedItems(newSelectedItems);
    calculateTotal(newSelectedItems);
  };

  const handleRemoveItem = (itemId) => {
    const newSelectedItems = { ...selectedItems };
    if (newSelectedItems[itemId].quantity > 1) {
      newSelectedItems[itemId].quantity -= 1;
    } else {
      delete newSelectedItems[itemId];
    }
    setSelectedItems(newSelectedItems);
    calculateTotal(newSelectedItems);
  };

  const calculateTotal = (items) => {
    const total = Object.values(items).reduce((acc, item) => {
      const price = parseFloat(item.price); // Ensure the price is a number
      return acc + price * item.quantity;
    }, 0);
    setTotalAmount(total);
  };

  const handlePayment = async () => {
    const user = auth.currentUser;

    if (!user) {
      alert("Please log in to proceed with the payment.");
      return;
    }

    const orderRef = collection(db, "orders");
    const orderData = {
      userId: user.uid,
      items: selectedItems,
      totalAmount,
      createdAt: new Date(),
    };

    try {
      await addDoc(orderRef, orderData);
      initiateRazorpayPayment(totalAmount);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const initiateRazorpayPayment = (amount) => {
    const user = auth.currentUser;
    const options = {
      key: "rzp_test_KStLt14203VFVn", // Enter your Razorpay key here
      amount: amount * 100, // Razorpay accepts amount in paise
      currency: "INR",
      name: "Online doctor company",
      description: "Test Transaction",
      handler: function (response) {
        alert(
          "Payment successful. Payment ID: " + response.razorpay_payment_id
        );
      },
      prefill: {
        name: "user",
        email: user.email,
        contact: "+91 9343803480 ",
      },
      notes: {
        address: "online doctor company, bengaluru ",
      },
      theme: {
        color: "#F37254",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

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
                  src={item.image.src}
                  alt={item.name}
                  className="mx-auto h-32 w-32 object-cover rounded-md"
                />
                <h3 className="text-lg font-semibold mt-2">{item.name}</h3>
                <p className="text-green-400 font-bold">₹{item.price}</p>
                <button
                  className="mt-3 bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600"
                  onClick={() => handleSelectItem(item)}
                >
                  Select
                </button>
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
        {Object.keys(selectedItems).length > 0 && (
          <div className="mt-10">
            <h3 className="text-2xl font-bold mb-4">Selected Items</h3>
            <ul>
              {Object.values(selectedItems).map((item) => (
                <li key={item.id} className="mb-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-lg font-semibold">{item.name}</h4>
                      <p className="text-green-400 font-bold">
                        {item.price} x {item.quantity}
                      </p>
                    </div>
                    <div>
                      <button
                        className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-600"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        -
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6 text-xl font-semibold">
              Total Amount: ₹{totalAmount}
            </div>
            <button
              className="mt-6 bg-green-500 px-6 py-3 rounded-md hover:bg-green-600"
              onClick={handlePayment}
            >
              Pay Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
