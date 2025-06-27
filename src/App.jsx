import React, { Suspense, useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route, useLocation, useNavigate, Navigate } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider, useAuth } from "./context/AuthContext"; 
import Navbar from "./components/Navbar.jsx";
import StarBackground from "./components/StarBackground.jsx";
import BackgroundWrapper from "./components/Background.jsx";
import IntroAnimation from "./components/IntroAnimation.jsx";
const Home = React.lazy(() => import("./pages/Home.jsx"));
const Members = React.lazy(() => import("./pages/Members.jsx"));
const Shop = React.lazy(() => import("./pages/Shop.jsx"));
const Cart = React.lazy(() => import("./pages/Cart.jsx"));
const Contact = React.lazy(() => import("./pages/Contact.jsx"));
const Login = React.lazy(() => import("./pages/Login.jsx"));
const ProductDetail = React.lazy(() => import("./pages/ProductDetail.jsx"));
const Events = React.lazy(() => import("./pages/Events.jsx"));
const Userprofile = React.lazy(() => import("./pages/Userprofile.jsx"));
const Vote = React.lazy(() => import("./pages/Vote.jsx"));
const Dashboard = React.lazy(() => import("./pages/Dashboard.jsx"));

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth(); // Use the useAuth hook instead of useContext
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

const AppContent = ({ showIntro, handleIntroComplete }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleTransition = () => {
    setIsTransitioning(true);
    handleIntroComplete();
    navigate("/");
  };

  return (
    <>
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
          <IntroAnimation onComplete={handleTransition} />
        </div>
      )}

      <StarBackground />

      <div
        style={{
          opacity: showIntro ? 0 : 1,
          transition: "opacity 150ms ease-out",
        }}
      >
        <Navbar />
        <BackgroundWrapper>
          <main className="pt-20 min-h-screen dark:text-gray-100 text-gray-900 transition-colors duration-300">
            <Suspense fallback={
              <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
                  <p className="text-gray-400">Loading...</p>
                </div>
              </div>
            }>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/members" element={<Members />} />
                <Route path="/events" element={<Events />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                
                {/* Protected Routes */}
                <Route path="/cart" element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                } />
                <Route path="/userprofile" element={
                  <ProtectedRoute>
                    <Userprofile />
                  </ProtectedRoute>
                } />
                <Route path="/vote" element={<Vote />} />
                <Route path="/dashboard" element={<Dashboard />} />
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

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("tales-house-visited");
    const lastVisit = localStorage.getItem("tales-house-last-visit");
    const currentTime = Date.now();
    const oneHour = 60 * 60 * 1000;

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

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AppContent showIntro={showIntro} handleIntroComplete={handleIntroComplete} />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}