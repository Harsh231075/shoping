import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProducts } from '../context/ContentProvider';

function Details() {
  const { addToCart, cartItems } = useProducts();
  const { _id } = useParams();
  const [item, setItem] = useState(null);
  const [selectedImage, setSelectedImage] = useState(''); // State for the top image

  useEffect(() => {
    fetch(`http://localhost:4001/api/product/${_id}`)
      .then((response) => response.json())
      .then((data) => {
        setItem(data.product);
        setSelectedImage(data.product.images[0]); // Initialize with the first image
      })
      .catch((err) => console.error(err));
  }, [_id]);

  if (!item) return <div>Loading...</div>; // Loader
  const isInCart = cartItems.some((cartItem) => cartItem._id === item._id);

  return (
    <>
      <div className="md:flex items-start mt-20 justify-center py-12 2xl:px-20 md:px-6 px-4">
        {/* Left Section: Product Images for Mobile */}
        <div className="w-80 md:hidden block">
          <img
            className="w-full h-48 object-fill rounded-lg"
            alt="Selected product"
            src={selectedImage} // Dynamic top image
          />
        </div>

        {/* Thumbnail Images */}
        <div className="md:hidden flex flex-wrap mt-4 gap-2 justify-center">
          {item.images.map((image, index) => (
            <img
              key={index}
              alt={`Thumbnail ${index + 1}`}
              className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${selectedImage === image ? 'border-blue-500' : 'border-gray-300'
                }`}
              src={image}
              onClick={() => setSelectedImage(image)} // Update top image on click
            />
          ))}
        </div>

        {/* Desktop Layout */}
        <div className="xl:w-2/6 lg:w-2/5 w-80 md:block hidden">
          <img
            className="w-full h-80 object-fill rounded-lg"
            alt="Main product"
            src={item.images[0]}
          />
          <img
            className="mt-6 w-full h-80 object-fill rounded-lg"
            alt="Secondary product"
            src={item.images[1]}
          />
        </div>

        {/* Right Section: Product Details */}
        <div className="md:ml-10 xl:w-2/5 lg:w-2/5 mt-8 md:mt-0">
          <h1 className="text-3xl font-semibold text-gray-800">{item.name}</h1>
          <p className="text-gray-500 mt-2">Brand: {item.brand}</p>

          {/* Rating */}
          <div className="flex items-center space-x-1 rtl:space-x-reverse mt-2">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                className={`w-4 h-4 ${index < 4 ? 'text-yellow-300' : 'text-gray-200'}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
            ))}
          </div>

          {/* Price */}
          <p className="text-2xl font-bold text-gray-800 mt-6">${item.price.toFixed(2)}</p>

          {/* Description */}
          <p className="text-gray-600 mt-4">
            {item.description ||
              'This is a beautiful product with amazing features and high quality.'}
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <button
              className={`w-full md:w-auto px-6 py-3 ${isInCart ? 'bg-red-600' : 'bg-blue-600'
                } text-white rounded-lg hover:bg-blue-500 focus:outline-none`}
              onClick={() => addToCart(item)}
            >
              {isInCart ? 'Remove from Cart' : 'Add to Cart'}
            </button>
            <button className="w-full md:w-auto px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-500 focus:outline-none">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Details;
