import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';

import ServiceDetails from './pages/ServiceDetails';
import BookingPage from './pages/BookingPage';
import BookingSuccess from './pages/BookingSuccess';
import BookingHistory from './pages/BookingHistory';
function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
         {/* <Route
          path="/"
          element={<ServicesPage />}
        />
        <Route
          path="/services"
          element={<ServicesPage />}
        /> */}
        <Route
          path="/services/:id"
          element={<ServiceDetails />}
        />
        <Route
          path="/booking"
          element={<BookingPage />}
        />
         <Route
          path="/success"
          element={<BookingSuccess />}
        />
         <Route
          path="/booking-history"
          element={<BookingHistory />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
