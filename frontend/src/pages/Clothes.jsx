import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useProducts } from '../context/ContentProvider';

function Clothes() {
  const { products } = useProducts();
  const { addToCart } = useProducts();
  const [cart, setCart] = useState([]);
  const clothes = products.filter((items) => items.category === 'Clothing');

  const toggleCart = (items) => {
    if (cart.includes(items._id)) {
      setCart(cart.filter((id) => id !== items._id));
    } else {
      setCart([...cart, items._id]);
      addToCart(items);
    }
  };

  return (
    <>
      <span className="block underline mt-20 ml-5 font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-800 py-2">
        Clothes
      </span>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
        {clothes.map((items) => (
          <div
            key={items._id}
            className="border rounded-lg p-2 sm:p-3 md:mx-2 bg-white shadow hover:shadow-lg transition-shadow"
          >
            <Link to={`/details/${items._id}`}>
              <img
                className="rounded-t-lg w-full h-40 sm:h-48 md:h-60 object-cover"
                src={items.images[0]}
                alt={items.name}
              />
            </Link>
            <div className="px-3 sm:px-5 pb-3 sm:pb-5">
              <Link to={`/details/${items._id}`}>
                <h5 className="text-sm sm:text-base md:text-lg font-semibold tracking-tight text-gray-900">
                  {items.name}
                </h5>
              </Link>
              <div className="flex items-center mt-2 sm:mt-2.5 mb-4 sm:mb-5">
                <div className="flex items-center space-x-1">
                  {[...Array(4)].map((_, index) => (
                    <svg
                      key={index}
                      className="w-3 sm:w-4 h-3 sm:h-4 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                  ))}
                  <svg
                    className="w-3 sm:w-4 h-3 sm:h-4 text-gray-200"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                </div>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded ms-3">
                  5.0
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg sm:text-xl font-bold text-gray-900">
                  ${items.price}
                </span>
                <button
                  onClick={() => toggleCart(items)}
                  className="w-16 sm:w-20 py-2 text-xs sm:text-sm text-white rounded-lg bg-blue-500 hover:bg-blue-600 transition-colors"
                >
                  {cart.includes(items._id) ? "Remove" : "Buy"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Clothes;
