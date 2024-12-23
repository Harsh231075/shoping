import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isAccountMenuOpen, setAccountMenuOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleAccountMenu = () => {
    setAccountMenuOpen((prev) => !prev);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    alert("You have been logged out.");
    window.location.reload(); // Reload the page to update the navbar.
  };

  const authToken = localStorage.getItem("authToken");
  const role = localStorage.getItem("role");

  return (
    <nav className="bg-gradient-to-r from-blue-800 to-black text-white shadow-md antialiased fixed top-0 right-0 left-0 z-20">
      <div className="max-w-screen-xl px-4 mx-auto py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="shrink-0">
          <img className="h-10" src="Logo.webp" alt="Logo" />
        </Link>

        {/* Desktop Links */}
        <ul className="hidden lg:flex items-center gap-8">
          <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
          <li><Link to="/electronics" className="hover:text-gray-300">Electronics</Link></li>
          <li><Link to="/shoes" className="hover:text-gray-300">Shoes</Link></li>
          <li><Link to="/clothes" className="hover:text-gray-300">Clothes</Link></li>
          {role !== "admin" && <li><Link to="/about" className="hover:text-gray-300">About</Link></li>}
        </ul>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          {/* My Cart */}
          <Link to="/cart" className="hover:text-gray-300 flex items-center">
            {/* <svg className="w-6 h-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.879 2.757m2.77 8.486A3 3 0 0012 19h6a3 3 0 002.992-3.253L19.743 7H5.212M16 9a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg> */}
            My Cart
          </Link>

          {/* Account / Signup */}
          <div className="relative">
            {authToken ? (
              <button
                onClick={toggleAccountMenu}
                className="hover:text-gray-300 flex items-center"
              >
                {/* <svg className="w-6 h-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5.121 19.121A4 4 0 118.242 16h7.516a4 4 0 113.121 3.121M15 10a5 5 0 11-10 0 5 5 0 0110 0z"
                  />
                </svg> */}
                Account
              </button>
            ) : (
              <Link to="/signup" className="hover:text-gray-300">Signup</Link>
            )}

            {/* Account Dropdown */}
            {isAccountMenuOpen && authToken && (
              <div className="absolute right-0 mt-2 bg-white text-black p-2 rounded shadow">
                {role === "admin" && (
                  <Link
                    to="/profile"
                    className="block  py-2 hover:bg-gray-200"
                  >
                    Dashboard
                  </Link>
                )}
                <Link
                  to="/history"
                  className="block  py-2 hover:bg-gray-200"
                >
                  My Orders
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden hover:text-gray-300"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMobileMenuOpen && (
        <ul className="lg:hidden bg-zinc-500 text-white space-y-2 px-4 py-2">
          <li><Link to="/" onClick={() => setMobileMenuOpen(false)} className="block hover:text-gray-300">Home</Link></li>
          <li><Link to="/electronics" onClick={() => setMobileMenuOpen(false)} className="block hover:text-gray-300">Electronics</Link></li>
          <li><Link to="/shoes" onClick={() => setMobileMenuOpen(false)} className="block hover:text-gray-300">Shoes</Link></li>
          <li><Link to="/clothes" onClick={() => setMobileMenuOpen(false)} className="block hover:text-gray-300">Clothes</Link></li>
          <li><Link to="/about" onClick={() => setMobileMenuOpen(false)} className="block hover:text-gray-300">About</Link></li>
        </ul>
      )}
    </nav>
  );
}
