import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

export const Header = () => {
    const { isAuthenticated } = useContext(AuthContext);
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
                    <li>
                        <Link to="/create" state={{ background: location }}>Create</Link>
                    </li>
                    {isAuthenticated
                        ? <li>
                            <Link to="/logout">Logout</Link>
                        </li>
                        : <>
                            <li>
                                <Link to="/login" state={{ background: location }}>Login</Link>
                            </li>
                            <li>
                                <Link to="/register" state={{ background: location }}>Register</Link>
                            </li>
                        </>
                    }
                </ul>
            </nav>
        </header>
    )
}