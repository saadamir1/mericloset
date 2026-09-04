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
import BrandErrorPage from "./pages/brand-central/BrandErrorPage";
import BrandRegister from "./pages/BrandRegister";
import Profile from "./pages/profile";
import UploadProducts from "./pages/UploadProducts";
import FAQ from "./pages/FAQ";
import AboutUs from "./pages/AboutUs";
import WishlistPage from "./pages/Wishlist";
import BrandLayout from "./pages/brand-central/BrandLayout";
import AddProduct from "./pages/brand-central/AddProduct";
import BrandCentral from "@pages/brand-central/BrandCentral";
import BrandProductPage from "@pages/brand-central/BrandProductPage";
import AdminLayout from "@pages/admin-central/AdminLayout";
import AdminErrorPage from "@pages/admin-central/AdminErrorPage";
import AdminCentral from "@pages/admin-central/AdminCentral";
import RecommendationsPage from "./pages/RecommendationsPage";
import ProductComparison from "@pages/ProductComparison";
import Checkout from "./pages/checkout";
import WishlistCheckout from "./pages/WishlistCheckout";
import FeedbackPage from "./pages/FeedBackPage";
import ProductReviewPage from "./pages/ProductReviewPage";
import ProtectedRoute from "./components/ProtectedRoute";
import OutfitBuilderPage from "./pages/OutfitBuilderPage";

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
      { path: "recommendations/:userId", element: <RecommendationsPage /> },
      { path: "recommendations", element: <RecommendationsPage /> },
      { path: "outfit-builder", element: <OutfitBuilderPage /> },
      { path: "compare", element: <ProductComparison /> },
      { path: "checkout", element: <Checkout /> },
      { path: "wishlist-checkout", element: <WishlistCheckout /> },
      { path: "feedback", element: <FeedbackPage /> },
      { path: "product-review/:productId", element: <ProductReviewPage /> },
      { path: "success", element: <HomePage /> },
    ],
  },
  {
    path: "/brand",
    element: <ProtectedRoute roles={["brand", "admin"]} />,
    errorElement: <BrandErrorPage />,
    children: [
      {
        element: <BrandLayout />,
        children: [
          { index: true, element: <BrandCentral /> },
          { path: "add-product", element: <AddProduct /> },
          { path: "edit-profile", element: <Profile /> },
          { path: "products", element: <BrandProductPage /> },
        ],
      },
    ],
  },
  {
    path: "/admin",
    element: <ProtectedRoute roles={["admin"]} />,
    errorElement: <AdminErrorPage />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { index: true, element: <AdminCentral /> },
          { path: "add-product", element: <AddProduct /> },
          { path: "edit-profile", element: <Profile /> },
        ],
      },
    ],
  },
]);

export default router;
