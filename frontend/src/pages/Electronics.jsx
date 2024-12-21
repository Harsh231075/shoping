import { Link } from 'react-router-dom';
import React from 'react';
import { useProducts } from '../context/ContentProvider';

function Electronic() {
  const { products } = useProducts();
  const Electronics = products.filter((items) => items.category === 'Electronics');

  return (
    <>
      <span
        className="block underline mt-5 ml-5 font-semibold text-base sm:text-lg md:text-xl lg:text-2xl text-gray-800 py-2"
      >
        Electronics
      </span>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 p-5">
        {Electronics.slice(0, 8).map((items) => (
          <div key={items._id} className="border rounded-md shadow-sm p-2 sm:p-3 bg-white hover:shadow-md transition-shadow">
            <Link to={`/details/${items._id}`}>
              <img
                className="rounded-lg w-full  sm:h-36 md:h-48 object-cover"
                src={items.images[0]}
                alt="product"
              />
            </Link>
            <div className="px-2 sm:px-4 pb-2 sm:pb-4">
              <Link to="#">
                <h5 className="text-xs sm:text-sm md:text-base font-medium tracking-tight text-gray-900 truncate">
                  {items.name}
                </h5>
              </Link>
              <div className="flex items-center mt-2 sm:mt-3 mb-2 sm:mb-3">
                <div className="flex items-center space-x-1">
                  {[...Array(4)].map((_, index) => (
                    <svg
                      key={index}
                      className="sm:w-1/2 md:w-3 h-3 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                  ))}
                  <svg
                    className="w-3 h-3 text-gray-200 sm:order-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                </div>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded ms-2 sm:order-2">
                  5.0
                </span>
              </div>
              <div className="flex items-center  justify-between ">
                <span className="text-sm sm:text-left md:text-lg font-semibold text-gray-900">
                  ${items.price}
                </span>
                <button className="text-sm md:text-base py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none">
                  Buy
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Electronic;
