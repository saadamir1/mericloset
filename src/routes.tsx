import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./pages/layout";
import ProductDetailPage from "./pages/ProductDetailPage";
import ErrorPage from "./pages/ErrorPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import ContactUs from "./pages/ContactUs";
import Login from "./pages/login";
import Signup from "./pages/signup";
import BrandErrorPage from "./pages/brand-central/BrandErrorPage"; // General error page for customer routes
import BrandRegister from "./pages/BrandRegister";
import Profile from "./pages/profile";
import UploadProducts from "./pages/UploadProducts";
import FAQ from "./pages/FAQ";
import AboutUs from "./pages/AboutUs";
import BrandCentral from "./pages/brand-central/brandCentral";
import WishlistPage from "./pages/Wishlist";
import BrandLayout from "./pages/brand-central/BrandLayout";
import AddProduct from "./pages/brand-central/AddProduct";
import EditProduct from "./pages/brand-central/editProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "products/:slug", element: <ProductDetailPage /> },
      { path: "privacy-policy", element: <PrivacyPolicy /> },
      { path: "terms-of-service", element: <TermsOfService /> },
      { path: "contact-us", element: <ContactUs /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "register-brand", element: <BrandRegister /> },
      { path: "profile", element: <Profile /> },
      { path: "upload-products", element: <UploadProducts /> },
      { path: "faq", element: <FAQ /> },
      { path: "about-us", element: <AboutUs /> },
      { path: "wishlist", element: <WishlistPage /> },
    ],
  },
  {
    path: "/brand",
    element: <BrandLayout />, // Brand Layout
    errorElement: <BrandErrorPage />,
    children: [
      { index: true, element: <BrandCentral /> },
      { path: "add-product", element: <AddProduct /> },
      { path: "edit-product", element: <EditProduct /> },
    ],
  },
]);

export default router;