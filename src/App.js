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
import { EditOffer } from './components/edit-offer/EditOffer';
import { AdminGuard } from './components/common/AdminGuard';
import { EditUser } from './components/manage-users/edit-user/EditUser';
import { MyProfile } from './components/my-profile/MyProfile';
import { CreateType } from './components/create-type/CreateType';
import { AuthenticatedGuard } from './components/common/AuthenticatedGuard';

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
                    <Route path='/createType' element={<CreateType />} />
                    <Route path='/offer/:offerId' element={<OfferModal />} />
                    <Route path='/edit/:offerId' element={<EditOffer />} />
                  </Route>

                  <Route element={<AuthenticatedGuard />}>
                    <Route path='/account/register' element={<Register />} />
                    <Route path="/account/login" element={<Login />} />
                  </Route>

                  <Route element={<PrivateGuard />}>
                    <Route path="/logout" element={<Logout />} />
                    <Route path='/myProfile' element={<MyProfile />}>
                      <Route path='offer/:offerId' element={<OfferModal />} />
                      <Route path='edit/:offerId' element={<EditOffer />} />

                    </Route>
                    <Route path="/editUser/:userId" element={<EditUser />} />
                  </Route>

                  <Route element={<AdminGuard />}>
                    <Route path="/manageUsers" element={<ManageUsers />} />
                    <Route path="/editUser/:userId" element={<EditUser />} />
                  </Route>

                </Routes>
                {background && (
                  <Routes>
                    <Route path="/create" element={<CreateOffer />} />
                    <Route path='/offer/:offerId' element={<OfferModal />} />
                    <Route path='myProfile/offer/:offerId' element={<OfferModal />} />
                    <Route path='myProfile/edit/:offerId' element={<EditOffer />} />
                    <Route path='/edit/:offerId' element={<EditOffer />} />
                    <Route path="/editUser/:userId" element={<EditUser />} />
                    <Route path='/createType' element={<CreateType />} />
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
