import { Link } from 'react-router-dom';
import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useProducts } from '../context/ContentProvider';

function Cards() {
  const { products } = useProducts();
  const Shoes = products.filter((items) => items.category === 'Shoes');

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <>
      <h2 className="block mt-5 ml-5 font-extrabold text-transparent text-lg sm:text-xl md:text-2xl lg:text-3xl bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 py-2">
        Shoes
      </h2>

      <Carousel responsive={responsive} className="mt-5">
        {Shoes.map((items) => (
          <div
            key={items._id}
            className="bg-white rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl mx-2"
          >
            <Link to={`/details/${items._id}`}>
              <img
                src={items.images[0]}
                alt={items.name}
                className="rounded-t-lg w-full h-60 object-cover transition-transform duration-300 hover:scale-105"
              />
            </Link>
            <div className="p-4">
              <Link to={`/details/${items._id}`}>
                <h5 className="text-lg font-semibold text-gray-900 truncate hover:text-blue-600">
                  {items.name}
                </h5>
              </Link>
              <div className="flex items-center mt-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      className={`w-5 h-5 ${index < 4 ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      fill="currentColor"
                      viewBox="0 0 22 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                  ))}
                </div>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded ml-2">
                  5.0
                </span>
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className="text-xl font-bold text-gray-900">
                  ${items.price}
                </span>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </>
  );
}

export default Cards;
