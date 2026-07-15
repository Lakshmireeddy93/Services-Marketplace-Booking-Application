import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ServicesPage from "./pages/ServicesPage";
import ServiceDetails from "./pages/ServiceDetails";
import BookingPage from "./pages/BookingPage";
import BookingSuccess from "./pages/BookingSuccess";
import BookingHistory from "./pages/BookingHistory";
import NotFoundPage from "./pages/NotFoundPage";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />

        <main className="app-main page-fade">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/services"
              element={
                <PrivateRoute>
                  <ServicesPage />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;