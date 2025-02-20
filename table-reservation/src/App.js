import "normalize.css";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BookingPage from "./pages/BookingPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import logoInline from './images/logo.svg';
import logoStacked from './images/logo-stacked.png';
import heroImgHome from './images/hero-home.jpg';
import heroImgBooking from './images/hero-booking.jpg';

function App() {
  return (
    <Router>
      <Header logo={logoInline}/>
      <Routes>
        <Route path="/" element={<HomePage heroImg={heroImgHome} />}></Route>
        <Route path="/booking" element={<BookingPage heroImg={heroImgBooking} />}></Route>
      </Routes>
      <Footer logo={logoStacked}/>
    </Router>
  );
}

export default App;
