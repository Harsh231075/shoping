import React, { useState } from "react";
import { useProducts } from "../context/ContentProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { TiDelete } from "react-icons/ti";

function Cart() {
  const navigate = useNavigate();
  const { removeFromCart, cartItems } = useProducts();
  const [quantities, setQuantities] = useState(
    cartItems.reduce((acc, item) => {
      acc[item._id] = 1;
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
      [id]: Math.max(1, (prevQuantities[id] || 1) + increment),
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
    const token = localStorage.getItem("authToken");

    if (!token) {
      navigate("/login");
      return;
    }

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
      userId: userId,
      items: cartItems.map((item) => ({
        productId: item._id,
        quantity: quantities[item._id] || 1,
        price: item.price,
      })),
      totalAmount: calculateTotal(),
      paymentStatus: "Pending",
    };

    try {
      const response = await axios.post(
        "http://localhost:4001/api/orders/place",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Order placed successfully!");
      console.log(response.data.message);

      setQuantities({});
      setPaymentDetails({
        cardNumber: "",
        nameOnCard: "",
        expiration: "",
        cvv: "",
      });
      cartItems.forEach((item) => removeFromCart(item._id));
    } catch (error) {
      toast.error("Error: " + error.response.data.message);
      console.log("Error: " + error.response.data.message);
    }
  };

  return (
    <>
      <section className="sm:mt-20">
        <div className="container mx-auto py-10">
          <div className="flex justify-center items-center h-full">
            <div className="w-full max-w-7xl">
              <div className="bg-white shadow-xl rounded-lg p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column - Products */}
                  <div className="space-y-6">
                    <h3 className="text-center text-2xl font-semibold uppercase text-gray-800">
                      Your Products
                    </h3>
                    {cartItems.map((product) => (
                      <div
                        key={product._id}
                        className="relative flex items-center border-b pb-4 md:flex-nowrap sm:justify-between sm:gap-4"
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
                          <h5 className="text-sm font-semibold text-blue-600 md:text-lg">
                            {product.name}
                          </h5>
                          <div className="flex items-center mt-2">
                            {/* Price */}
                            <p className="text-sm font-bold text-gray-800 mr-4 md:text-lg md:mr-6">
                              ${(
                                product.price *
                                (quantities[product._id] || 1)
                              ).toFixed(2)}
                            </p>

                            {/* Quantity Controls */}
                            <div className="flex items-center space-x-2">
                              <button
                                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-l text-sm md:text-base"
                                onClick={() => handleQuantityChange(product._id, -1)}
                              >
                                -
                              </button>
                              <input
                                type="number"
                                className="w-12 text-center border border-gray-300 outline-none text-sm"
                                value={quantities[product._id] || 1}
                                readOnly
                              />
                              <button
                                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-r text-sm md:text-base"
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
                      <div className="flex justify-between text-lg font-semibold">
                        <p>Discount:</p>
                        <p className="text-green-600">- $95.00</p>
                      </div>
                      <div className="flex justify-between bg-blue-600 text-white px-6 py-2 rounded-lg mt-4">
                        <h5>Total:</h5>
                        <h5>${calculateTotal().toFixed(2)}</h5>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Payment */}
                  <div>
                    <h3 className="text-center text-2xl font-semibold uppercase mb-6 text-gray-800">
                      Payment Details
                    </h3>
                    <form className="space-y-6">
                      <div>
                        <label htmlFor="cardNumber" className="block text-sm font-semibold">
                          Card Number
                        </label>
                        <input
                          type="text"
                          id="cardNumber"
                          name="cardNumber"
                          className="w-full px-4 py-3 border rounded-lg"
                          value={paymentDetails.cardNumber}
                          onChange={handleInputChange}
                          maxLength={19}
                          placeholder="1234 5678 1234 5678"
                        />
                      </div>
                      <div>
                        <label htmlFor="nameOnCard" className="block text-sm font-semibold">
                          Name on Card
                        </label>
                        <input
                          type="text"
                          id="nameOnCard"
                          name="nameOnCard"
                          className="w-full px-4 py-3 border rounded-lg"
                          value={paymentDetails.nameOnCard}
                          onChange={handleInputChange}
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="expiration" className="block text-sm font-semibold">
                            Expiration
                          </label>
                          <input
                            type="text"
                            id="expiration"
                            name="expiration"
                            className="w-full px-4 py-3 border rounded-lg"
                            value={paymentDetails.expiration}
                            onChange={handleInputChange}
                            placeholder="MM/YYYY"
                            maxLength={7}
                          />
                        </div>
                        <div>
                          <label htmlFor="cvv" className="block text-sm font-semibold">
                            CVV
                          </label>
                          <input
                            type="password"
                            id="cvv"
                            name="cvv"
                            className="w-full px-4 py-3 border rounded-lg"
                            value={paymentDetails.cvv}
                            onChange={handleInputChange}
                            maxLength={3}
                          />
                        </div>
                      </div>

                      <button
                        type="button"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
                        onClick={handleButtonClick}
                      >
                        Buy Now
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
