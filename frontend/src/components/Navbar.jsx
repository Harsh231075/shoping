import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isAccountMenuOpen, setAccountMenuOpen] = useState(false);
  const [isCartMenuOpen, setCartMenuOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleAccountMenu = () => {
    setAccountMenuOpen((prev) => !prev);
  };

  const toggleCartMenu = () => {
    setCartMenuOpen((prev) => !prev);

  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    alert("You have been logged out.");
  };


  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };
  return (
    <nav className="bg-zinc-500 text-white antialiased fixed top-0 h- right-0 left-0 z-20">
      <div className="max-w-screen-xl px-2 mx-auto 2xl:px-0 py-4">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center space-x-8">
            <div className="shrink-0 w-20">
              <Link to="/" className="">
                <img
                  className="block w-auto h-8 dark:hidden"
                  src="logo.jpg"
                  alt="Logo"
                />
                <img
                  className="hidden w-auto h-8 dark:block"
                  src="/logo.jpg"
                  alt="Dark Logo"
                />
              </Link>
            </div>

            {/* Navbar Links */}
            <ul className="hidden lg:flex items-center gap-6 md:gap-8 py-3">
              <li className="shrink-0">
                <Link
                  to="/"
                  className="text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500"
                >
                  Home
                </Link>
              </li>
              <li className="shrink-0">
                <Link
                  to="/electronics"
                  className="text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500"
                >
                  Electronics
                </Link>
              </li>
              <li className="shrink-0">
                <Link
                  to="/shoes"
                  className="text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500"
                >
                  Shoes
                </Link>
              </li>
              <li className="shrink-0">
                <Link
                  to="/clothes"
                  className="text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500"
                >
                  Clothes
                </Link>
              </li>
              <li className="shrink-0">
                <Link
                  to="/about"
                  className="text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500"
                >
                  About
                </Link>
              </li>
            </ul>

          </div>

          {/* Action Buttons */}
          <div className="flex items-center lg:space-x-2">
            {/* My Cart Dropdown */}
            <div className="relative">
              <button
                onClick={toggleCartMenu}
                className="inline-flex items-center rounded-lg justify-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium text-gray-900 dark:text-white"
              >
                <svg
                  className="w-5 h-5 lg:mr-1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
                  />
                </svg>
                <Link
                  to="/cart"
                  className="block px-4 py-2 text-sm  dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  View Cart
                </Link>

              </button>

              {isCartMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-lg shadow-lg">

                </div>
              )}
            </div>

            {/* User Account Dropdown */}
            <div className="relative">
              <button
                onClick={toggleAccountMenu}
                className="inline-flex items-center rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium text-gray-900 dark:text-white"
              >
                <svg
                  className="w-5 h-5 mr-1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeWidth="2"
                    d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
                Account
              </button>

              {isAccountMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-lg shadow-lg">
                  <ul className="py-2">
                    <li>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        My Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/history"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        My Orders
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMobileMenu}
              type="button"
              className="inline-flex lg:hidden items-center justify-center p-2 hover:bg-gray-100 rounded-md dark:hover:bg-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-gray-800 shadow-lg">
          <ul className="py-4 space-y-2">
            <li>
              <Link
                to="/"
                onClick={closeMobileMenu}
                className="block px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/electronics"
                onClick={closeMobileMenu}
                className="block px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                Electronics
              </Link>
            </li>
            <li>
              <Link
                to="/shoes"
                onClick={closeMobileMenu}
                className="block px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                Shoes
              </Link>
            </li>
            <li>
              <Link
                to="/clothes"
                onClick={closeMobileMenu}
                className="block px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                Clothes
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                onClick={closeMobileMenu}
                className="block px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                About
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
