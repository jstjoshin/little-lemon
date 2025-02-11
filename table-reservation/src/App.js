import './App.css';
import Header from "./components/Header"; 
import Footer from "./components/Footer"; 
import logoInline from './images/logo.svg';
import logoStacked from './images/logo-stacked.svg';

function App() {
  return (
    <>
      <main>
        <Header logo={logoInline}/>
        <Footer logo={logoStacked}/>
      </main>
    </>
  );
}

export default App;
