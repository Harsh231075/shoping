import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useProducts } from '../context/ContentProvider';

function Electronic() {
  const { products } = useProducts();
  const Electronics = products.filter((items) => items.category === 'Electronics');

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  return (
    <>
      <span className="block mt-5 ml-5 font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-purple-500 to-pink-500 py-2">
        Electronics
      </span>
      <Carousel responsive={responsive}>
        {Electronics.slice(0, 5).map((items) => (
          <div className="border p-2 sm:p-3 md:mx-2 mt-5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
            <React.Fragment key={items._id}>
              <Link to={`/details/${items._id}`}>
                <img
                  className="rounded-t-lg w-full h-40 sm:h-48 md:h-60 object-cover transition-transform duration-300 hover:scale-105"
                  src={items.images[0]}
                  alt="product image"
                />
              </Link>
              <div className="px-3 sm:px-5 pb-3 sm:pb-5">
                <Link to="#">
                  <h5 className="text-sm sm:text-base md:text-lg font-semibold tracking-tight text-gray-900 dark:text-black">
                    {items.name}
                  </h5>
                </Link>
                <div className="flex items-center mt-2 sm:mt-2.5 mb-4 sm:mb-5">
                  <div className="flex items-center space-x-1 rtl:space-x-reverse">
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
                      className="w-3 sm:w-4 h-3 sm:h-4 text-gray-200 dark:text-gray-600"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                  </div>
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
                    5.0
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-black">
                    ${items.price}
                  </span>
                </div>
              </div>
            </React.Fragment>
          </div>
        ))}
      </Carousel>
    </>
  );
}

export default Electronic;
