import React, { Suspense, useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar.jsx";
import BackgroundWrapper from "./components/Background.jsx";
import Intropage from "./components/Intropage.jsx";

const Home = React.lazy(() => import("./pages/Home.jsx"));
const Members = React.lazy(() => import("./pages/Members.jsx"));
const Shop = React.lazy(() => import("./pages/Shop.jsx"));
const Cart = React.lazy(() => import("./pages/Cart.jsx"));
const Contact = React.lazy(() => import("./pages/Contact.jsx"));
const Login = React.lazy(() => import("./pages/Login.jsx"));
const ProductDetail = React.lazy(() => import("./pages/ProductDetail.jsx"));
const Events = React.lazy(() => import("./pages/Events.jsx"));
const Userprofile = React.lazy(() => import("./pages/Userprofile.jsx"));

// Main App Content Component
const AppContent = ({ showIntro, handleIntroComplete }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Handle the transition from intro to main app
  const handleTransition = () => {
    setIsTransitioning(true);
    handleIntroComplete();
    navigate("/");  // Navigate to Home page after intro completes
  };

  return (
    <>
      {/* Intro Page - minimal transition */}
      {showIntro && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 50,
            opacity: isTransitioning ? 0 : 1,
            transition: "opacity 150ms ease-out",
          }}
        >
          <Intropage onComplete={handleTransition} />
        </div>
      )}

      {/* Main App - simple show/hide */}
      <div
        style={{
          opacity: showIntro ? 0 : 1,
          transition: "opacity 150ms ease-out",
        }}
      >
        <Navbar />
        <BackgroundWrapper>
          <main className="pt-20 min-h-screen dark:text-gray-100 text-gray-900 transition-colors duration-300">
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/members" element={<Members />} />
                <Route path="/events" element={<Events />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/userprofile" element={<Userprofile />} />
              </Routes>
            </Suspense>
          </main>
        </BackgroundWrapper>
      </div>
    </>
  );
};

export default function App() {
  const [showIntro, setShowIntro] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user should see intro on initial load
  useEffect(() => {
    const hasVisited = sessionStorage.getItem("tales-house-visited");
    const lastVisit = localStorage.getItem("tales-house-last-visit");
    const currentTime = Date.now();
    const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds

    // Show intro if:
    // 1. Never visited in this session, OR
    // 2. Last visit was more than 1 hour ago (optional - remove if you want once per session only)
    if (!hasVisited || (lastVisit && currentTime - parseInt(lastVisit) > oneHour)) {
      setShowIntro(true);
      setIsFirstVisit(true);
    } else {
      setShowIntro(false);
      setIsFirstVisit(false);
    }

    setIsLoading(false);
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
    setIsFirstVisit(false);
    sessionStorage.setItem("tales-house-visited", "true");
    localStorage.setItem("tales-house-last-visit", Date.now().toString());
  };

  // Show loading state while checking visit status
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <Router>
        <AppContent showIntro={showIntro} handleIntroComplete={handleIntroComplete} />
      </Router>
    </ThemeProvider>
  );
}
