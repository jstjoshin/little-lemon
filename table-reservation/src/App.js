import "normalize.css";
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BookingPage from "./pages/BookingPage";
import ConfirmedBooking from "./pages/ConfirmedBooking";
import Header from "./components/Header";
import Footer from "./components/Footer";
import logoInline from './images/logo.svg';
import logoStacked from './images/logo-stacked.png';
import heroImgHome from './images/hero-home.jpg';
import heroImgBooking from './images/hero-booking.jpg';
import { useEffect } from "react";

function App() {
  const ScrollToSection = () => {
    const location = useLocation();
    useEffect(() => {
      if (location.hash) {
        const targetElement = document.getElementById(location.hash.substring(1));
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      }
    }, [location]);
    return null;
  };
  const noClick = (e) => {
    e.preventDefault()
    e.target.style.cursor = "not-allowed";
    e.target.setAttribute("title", "--- Ooops, this feature is not yet available ---");
  };

  return (
    <Router>
      <ScrollToSection />
      <Header logo={logoInline} noClick={noClick}/>
      <Routes>
        <Route path="/" element={<HomePage heroImg={heroImgHome} noClick={noClick} />}></Route>
        <Route path="/booking" element={<BookingPage heroImg={heroImgBooking} />}></Route>
        <Route path="/confirmed-booking" element={<ConfirmedBooking heroImg={heroImgBooking} />}></Route>
      </Routes>
      <Footer logo={logoStacked} noClick={noClick}/>
    </Router>
  );
}

export default App;
