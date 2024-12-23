import { Link } from 'react-router-dom';
import React from 'react';
import { useProducts } from '../context/ContentProvider';

function Shoes() {
  const { products } = useProducts();
  const shoes = products.filter((items) => items.category === 'Shoes');

  return (
    <>
      {/* Section for Shoes */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 mt-20">
        {shoes.map((items) => (
          <div
            key={items._id}
            className="border border-gray-200 rounded-lg p-4 bg-white shadow-lg hover:shadow-2xl transition-shadow transform hover:scale-105 duration-300 flex flex-col"
          >
            <Link to={`/details/${items._id}`}>
              <img
                className="rounded-t-lg w-full h-40 sm:h-48 object-cover mb-4 transition-transform duration-300 hover:scale-105"
                src={items.images[0]}
                alt={items.name}
              />
            </Link>
            <div className="px-3 sm:px-4 pb-3 sm:pb-4 flex-grow">
              <Link to={`/details/${items._id}`}>
                <h5 className="text-sm sm:text-base md:text-lg font-semibold tracking-tight text-gray-900 hover:text-blue-500 transition-colors duration-300">
                  {items.name}
                </h5>
              </Link>
              <div className="flex items-center mt-2 sm:mt-2.5 mb-4 sm:mb-5">
                <div className="flex items-center space-x-1">
                  {[...Array(4)].map((_, index) => (
                    <svg
                      key={index}
                      className="w-4 sm:w-5 h-4 sm:h-5 text-yellow-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                  ))}
                  <svg
                    className="w-4 sm:w-5 h-4 sm:h-5 text-gray-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                </div>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold md:px-2 block sm:hiiden py-o.5 rounded ml-2">
                  5.0
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg sm:text-xl font-bold text-gray-900">
                  ${items.price}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Shoes;
