import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

export const Header = () => {
    const { isAuthenticated, user } = useContext(AuthContext);
    const location = useLocation();

    return (
        <header>
            <img src="" alt="logo" />
            <nav>
                <ul className={styles.headerUl}>
                    <li>
                        <Link id={styles.navActive} to="/">
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
                                <Link to="/create" state={{ background: location }}>Create</Link>
                            </li>
                            {user.roles.includes('admin') &&
                                <li>
                                    <Link to="/manageUsers" >Manage users</Link>
                                </li>
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