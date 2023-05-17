import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { OfferContext } from '../../contexts/OfferContext';

export const Header = () => {
    const { isAuthenticated, user } = useContext(AuthContext);
    const { getInitialOffers } = useContext(OfferContext);
    const location = useLocation();

    return (
        <header>
            <img src="" alt="logo" />
            <nav>
                <ul className={styles.headerUl}>
                    <li>
                        <Link id={styles.navActive} to="/" onClick={() => {getInitialOffers()}}>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/">About</Link>
                    </li>
                    <li>
                        <Link to="/">Contacts</Link>
                    </li>
                    {isAuthenticated && !user.isDeleted ?
                        <>
                            <li>
                                <Link to="/myProfile">My Profile</Link>
                            </li>
                            <li>
                                <Link to="/create" state={{ background: location }}>Create Offer</Link>
                            </li>
                            {user.roles.includes('admin') &&
                                <>
                                    <li>
                                        <Link to="/createType" state={{ background: location }} >Create Type</Link>
                                    </li>
                                    <li>
                                        <Link to="/manageUsers" >Manage users</Link>
                                    </li>
                                </>
                            }
                            <li>
                                <Link to="/logout">Logout</Link>
                            </li>
                        </>
                        : <></>
                    }
                </ul>
            </nav>
        </header>
    )
}