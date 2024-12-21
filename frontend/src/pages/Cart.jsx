import React, { useState } from "react";
import { useProducts } from "../context/ContentProvider";
import axios from "axios"; // Assuming you're using axios for API calls
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { TiDelete } from "react-icons/ti";
function Cart() {
  const navigate = useNavigate();
  const { removeFromCart, cartItems } = useProducts();
  const [quantities, setQuantities] = useState(
    cartItems.reduce((acc, item) => {
      acc[item._id] = 1; // Initial quantity = 1 for each item
      return acc;
    }, {})
  );

  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    nameOnCard: "",
    expiration: "",
    cvv: "",
  });

  const handleQuantityChange = (id, increment) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: Math.max(1, (prevQuantities[id] || 1) + increment), // Minimum quantity = 1
    }));
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * (quantities[item._id] || 1),
      0
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleButtonClick = async () => {
    // Check if token exists in local storage
    const token = localStorage.getItem("authToken");

    if (!token) {
      navigate('/login');

      return;
    }

    // Check if all payment details are filled
    if (
      !paymentDetails.cardNumber ||
      !paymentDetails.nameOnCard ||
      !paymentDetails.expiration ||
      !paymentDetails.cvv
    ) {
      toast.error("Please fill in all payment details.");
      return;
    }

    const userId = localStorage.getItem("userId");
    const orderData = {
      userId: userId,  // Replace with actual user ID
      items: cartItems.map((item) => ({
        productId: item._id,
        quantity: quantities[item._id] || 1,
        price: item.price,
      })),
      totalAmount: calculateTotal(),
      paymentStatus: "Pending",  // You can update based on actual payment status
    };

    // Send the order data to the backend
    try {
      const response = await axios.post("http://localhost:4001/api/orders/place", orderData, {
        headers: {
          Authorization: `Bearer ${token}`,  // Send token with the request
        },
      });
      toast.success("Order placed successfully!");
      console.log(response.data.message)
    } catch (error) {
      toast.error("Error: " + error.response.data.message);
      console.log("Error: " + error.response.data.message);
    }
  };


  return (
    <>
      <section className="h-screen sm: mt-10">
        <div className="container mx-auto py-10">
          <div className="flex justify-center items-center h-full">
            <div className="w-full">
              <div className="bg-white shadow rounded-lg p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left Column - Products */}
                  <div className="space-y-6">
                    <h3 className="text-center text-2xl font-bold uppercase">Your products</h3>
                    {cartItems.map((product) => (
                      <div
                        key={product._id}
                        className="relative flex flex-wrap items-center border-b pb-4 border md:flex-nowrap sm:justify-between sm:gap-4"
                      >
                        {/* Remove Button */}
                        <button
                          className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xl"
                          onClick={() => removeFromCart(product._id)}
                        >
                          <TiDelete />

                        </button>

                        {/* Product Image */}
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-24 h-24 object-cover rounded-lg sm:w-20 sm:h-20 md:w-36 md:h-36"
                        />

                        {/* Product Details */}
                        <div className="ml-4 flex-1 md:ml-6">
                          <h5 className="text-sm font-semibold text-blue-600 md:text-lg">{product.name}</h5>
                          <div className="flex items-center mt-2">
                            {/* Price */}
                            <p className="text-sm font-bold text-gray-800 mr-4 md:text-lg md:mr-6">
                              ${(
                                product.price *
                                (quantities[product._id] || 1)
                              ).toFixed(2)}
                            </p>

                            {/* Quantity Controls */}
                            <div className="flex items-center">
                              <button
                                className="px-2 py-1 bg-gray-300 hover:bg-gray-400 rounded-l text-sm md:text-base"
                                onClick={() => handleQuantityChange(product._id, -1)}
                              >
                                -
                              </button>
                              <input
                                type="number"
                                className="w-10 text-center border border-gray-300 outline-none text-sm md:w-12"
                                value={quantities[product._id] || 1}
                                readOnly
                              />
                              <button
                                className="px-2 py-1 bg-gray-300 hover:bg-gray-400 rounded-r text-sm md:text-base"
                                onClick={() => handleQuantityChange(product._id, 1)}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}



                    <div className="border-t pt-4">
                      <div className="flex justify-between">
                        <p className="font-semibold">Discount:</p>
                        <p className="font-semibold">$95.00</p>
                      </div>
                      <div className="flex justify-between bg-blue-500 text-white px-4 py-2 rounded mt-2">
                        <h5 className="font-bold">Total:</h5>
                        <h5 className="font-bold">${calculateTotal().toFixed(2)}</h5>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Payment */}
                  <div>
                    <h3 className="text-center text-2xl font-bold uppercase mb-6">Payment</h3>
                    <form className="space-y-6">
                      <div>
                        <label htmlFor="cardNumber" className="block font-semibold">
                          Card Number
                        </label>
                        <input
                          type="text"
                          id="cardNumber"
                          name="cardNumber"
                          className="w-full px-4 py-2 border rounded-lg"
                          value={paymentDetails.cardNumber}
                          onChange={handleInputChange}
                          maxLength={19}
                        />
                      </div>
                      <div>
                        <label htmlFor="nameOnCard" className="block font-semibold">
                          Name on card
                        </label>
                        <input
                          type="text"
                          id="nameOnCard"
                          name="nameOnCard"
                          className="w-full px-4 py-2 border rounded-lg"
                          value={paymentDetails.nameOnCard}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="expiration" className="block font-semibold">
                            Expiration
                          </label>
                          <input
                            type="text"
                            id="expiration"
                            name="expiration"
                            className="w-full px-4 py-2 border rounded-lg"
                            value={paymentDetails.expiration}
                            onChange={handleInputChange}
                            maxLength={7}
                          />
                        </div>
                        <div>
                          <label htmlFor="cvv" className="block font-semibold">
                            CVV
                          </label>
                          <input
                            type="password"
                            id="cvv"
                            name="cvv"
                            className="w-full px-4 py-2 border rounded-lg"
                            value={paymentDetails.cvv}
                            onChange={handleInputChange}
                            maxLength={3}
                          />
                        </div>
                      </div>

                      <button
                        type="button"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg font-bold hover:bg-blue-600"
                        onClick={handleButtonClick}
                      >
                        Buy now
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Cart;
