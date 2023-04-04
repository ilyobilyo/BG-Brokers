import { Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import { Header } from './components/header/Header';
import { OfferLocationProvider } from './contexts/OfferLocationContext';
import { TypeProvider } from './contexts/TypeContext';
import { Register } from './components/register/Register';
import { Home } from './components/home/Home';
import { ModalContextProvider } from './contexts/ModalContext';
import { Login } from './components/login/Login';
import { AuthProvider } from './contexts/AuthContext';
import { Logout } from './components/logout/Logout';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Header />
        <ModalContextProvider>
          <TypeProvider>
            <OfferLocationProvider>
              <Home />
              <Routes>
                <Route path="/" element={<Outlet />}/>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
              </Routes>
            </OfferLocationProvider>
          </TypeProvider>
        </ModalContextProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
