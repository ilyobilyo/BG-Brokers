import { Route, Routes, useLocation } from 'react-router-dom';
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
import { CreateOffer } from './components/create-offer/CreateOffer';
import { ManageUsers } from './components/manage-users/ManageUser';

function App() {
  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <div className="App">
      <AuthProvider>
        <Header />
        <ModalContextProvider>
          <TypeProvider>
            <OfferLocationProvider>
              <Routes>
                <Route path="/" element={<Home />}>
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/create" element={<CreateOffer />} />
                </Route>
                <Route path="/logout" element={<Logout />} />
                <Route path="/private/manageUsers" element={<ManageUsers />} />
              </Routes>
              {background && (
                <Routes>
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/create" element={<CreateOffer />} />
                </Routes>
              )}
            </OfferLocationProvider>
          </TypeProvider>
        </ModalContextProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
