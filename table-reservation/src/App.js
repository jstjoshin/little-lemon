import "normalize.css";
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState, createContext, useRef } from "react";
import HomePage from "./pages/HomePage";
import BookingPage from "./pages/BookingPage";
import ConfirmedBooking from "./pages/ConfirmedBooking";
import Header from "./components/Header";
import Footer from "./components/Footer";
import logoInline from './images/logo.svg';
import logoStacked from './images/logo-stacked.png';
import heroImgHome from './images/hero-home.jpg';
import heroImgBooking from './images/hero-booking.jpg';
import Modal from "./components/Modal";

export const ModalContext = createContext();

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function ScrollTo({ location, currentPath, previousPath }) {
  useEffect(() => {
    if (location.hash) {
      const targetElement = document.getElementById(location.hash.substring(1));
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    if (previousPath.current !== currentPath) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      previousPath.current = currentPath;
    }
  }, [location, currentPath, previousPath]);
  return null;
}

function App() {
  const location = useLocation();
  const previousPath = useRef(location.pathname + location.hash);
  const currentPath = location.pathname + location.hash;
  const [modalContent, setModalContent] = useState(null);
  const [isLocked, setIsLocked] = useState(false);
  const showModal = (content, lock = false) => {
    setModalContent(content);
    setIsLocked(lock);
  };
  const hideModal = () => {
    if (!isLocked) setModalContent(null);
  };
  const noClick = (e) => {
    e.preventDefault()
    e.target.style.cursor = "not-allowed";
    e.target.setAttribute("title", "--- Ooops, this feature is not yet available ---");
  };
  useEffect(() => {
    setModalContent(null);
  }, [location]);

  return (
    <ModalContext.Provider value={{ showModal, hideModal, setIsLocked }}>
      <ScrollTo location={location} currentPath={currentPath} previousPath={previousPath} />
      <Header logo={logoInline} noClick={noClick}/>
      <Routes>
        <Route path="/" element={<HomePage heroImg={heroImgHome} noClick={noClick} />}></Route>
        <Route path="/booking" element={<BookingPage heroImg={heroImgBooking} />}></Route>
        <Route path="/confirmed-booking" element={<ConfirmedBooking heroImg={heroImgBooking} noClick={noClick}/>}></Route>
      </Routes>
      <Footer logo={logoStacked} noClick={noClick}/>
      {modalContent && <Modal onClose={hideModal} isLocked={isLocked}>{modalContent}</Modal>}
    </ModalContext.Provider>
  );
}

export default AppWrapper;
