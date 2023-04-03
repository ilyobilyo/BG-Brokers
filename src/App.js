import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Header } from './components/header/Header';
import { OfferLocationProvider } from './contexts/OfferLocationContext';
import { TypeProvider } from './contexts/TypeContext';
import { Register } from './components/register/Register';
import { Home } from './components/home/Home';
import { ModalContextProvider } from './contexts/ModalContext';
import { Login } from './components/login/Login';

function App() {
  return (
    <div className="App">
      <Header />
      <ModalContextProvider>
        <TypeProvider>
          <OfferLocationProvider>
            <Home />
            <Routes>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </OfferLocationProvider>
        </TypeProvider>
      </ModalContextProvider>
    </div>
  );
}

export default App;
