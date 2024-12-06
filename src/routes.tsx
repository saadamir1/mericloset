import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./pages/layout";
import ProductDetailPage from "./pages/ProductDetailPage";
import ErrorPage from "./pages/ErrorPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import ContactUs from "./pages/ContactUs";
import Login from "./pages/login";
import Signup from "./pages/signup"
import Profile from "./pages/profile"
import UploadProducts from "./pages/UploadProducts"
import FAQ from "./pages/FAQ";
import AboutUs from "./pages/AboutUs";


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
      { path: "profile", element: <Profile /> },
      { path: "upload-products", element: <UploadProducts /> },
      { path: "faq", element: <FAQ/>},
      { path: "about-us", element: <AboutUs /> }, 
    ],
  },
]);
export default router;
