import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { ProductProvider } from "./context/ContentProvider";
import { Route, Routes } from "react-router-dom";
import Details from "./pages/Details";
import Cart from "./pages/Cart";
import Electronics from "./pages/Electronics";
import Clothes from "./pages/Clothes";
import Shoes from './pages/Shoes'
import About from './pages/About'
import Login from './pages/Login'
import Signup from "./pages/Signup";
import OrderHistory from "./pages/OrderHistory";
import { Toaster } from 'react-hot-toast';
import MyProfile from "./dasboard/MyProfile";
import Footer from "./components/Footer";
import AdminContactForm from "./pages/AdminContactForm";


function App() {
  const location = useLocation();
  const hideNavbarFooter = ["/profile"].includes(location.pathname);
  return (
    <>
      <ProductProvider>
        {/* Navbar should be outside Routes */}
        {!hideNavbarFooter && <Navbar />}

        <Routes>
          <Route path="/" element={<Home></Home>} />
          <Route path="/details/:_id" element={<Details />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/electronics" element={<Electronics />} />
          <Route path="/shoes" element={<Shoes />} />
          <Route path="/clothes" element={<Clothes />} />
          <Route path="/About" element={<About />} />
          <Route path="/profile" element={<MyProfile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/history" element={<OrderHistory />} />
          < Route path="/request" element={<AdminContactForm />} />
        </Routes>
        <Toaster />
        {!hideNavbarFooter && <Footer />}
      </ProductProvider>
    </>
  );
}

export default App;
