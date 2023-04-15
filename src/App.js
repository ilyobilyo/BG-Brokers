import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import { Header } from './components/header/Header';
import { OfferLocationProvider } from './contexts/OfferLocationContext';
import { TypeProvider } from './contexts/TypeContext';
import { Register } from './components/register/Register';
import { Home } from './components/home/Home';
import { ModalProvider } from './contexts/ModalContext';
import { Login } from './components/login/Login';
import { AuthProvider } from './contexts/AuthContext';
import { Logout } from './components/logout/Logout';
import { CreateOffer } from './components/create-offer/CreateOffer';
import { ManageUsers } from './components/manage-users/ManageUser';
import { PrivateGuard } from './components/common/PrivateGuard';
import { OfferProvider } from './contexts/OfferContext';
import { OfferModal } from './components/offer-modal/OfferModal';

function App() {
  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <div className="App">
      <AuthProvider>
        <Header />
        <ModalProvider>
          <TypeProvider>
            <OfferLocationProvider>
              <OfferProvider>
                <Routes>
                  <Route path="/" element={<Home />}>
                    <Route path="/create" element={<CreateOffer />} />
                    <Route path='/offer/:offerId' element={<OfferModal />} />
                  </Route>
                  <Route path='/account/register' element={<Register />} />
                  <Route path="/account/login" element={<Login />} />
                  <Route element={<PrivateGuard />}>
                    <Route path="/manageUsers" element={<ManageUsers />} />
                    <Route path="/logout" element={<Logout />} />
                  </Route>
                </Routes>
                {background && (
                  <Routes>
                    <Route path="/create" element={<CreateOffer />} />
                    <Route path='/offer/:offerId' element={<OfferModal />} />
                  </Routes>
                )}
              </OfferProvider>
            </OfferLocationProvider>
          </TypeProvider>
        </ModalProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
