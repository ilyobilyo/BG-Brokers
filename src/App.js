import './App.css';
import { Header } from './components/header/Header';
import { Hero } from './components/hero/Hero';
import { TownProvider } from './contexts/TownContext';
import { TypeProvider } from './contexts/TypeContext';

function App() {
  return (
    <div className="App">
      <Header />

      <TypeProvider>
        <TownProvider>
          
          <Hero />

        </TownProvider>
      </TypeProvider>
    </div>
  );
}

export default App;
