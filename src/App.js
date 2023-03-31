import './App.css';
import { Header } from './components/header/Header';
import { Hero } from './components/hero/Hero';
import { OfferLocationProvider } from './contexts/OfferLocationContext';
import { TypeProvider } from './contexts/TypeContext';

function App() {
  return (
    <div className="App">
      <Header />

      <TypeProvider>
        <OfferLocationProvider>
          
          <Hero />

        </OfferLocationProvider>
      </TypeProvider>
    </div>
  );
}

export default App;
