import "normalize.css";
import './App.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BookingPage from "./pages/BookingPage";

import Header from "./components/Header"; 
import Footer from "./components/Footer"; 
import logoInline from './images/logo.svg';
import logoStacked from './images/logo-stacked.svg';

function App() {
  return (
    <Router>
      <Header logo={logoInline}/>
      <Routes> 
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/booking" element={<BookingPage />}></Route>
      </Routes>
      <Footer logo={logoStacked}/>
    </Router>
  );
}

export default App;
