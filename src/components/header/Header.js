import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

export const Header = () => {
    const { isAuthenticated } = useContext(AuthContext);

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
                    {isAuthenticated
                        ? <li>
                            <Link to="/logout">Logout</Link>
                        </li>
                        : <>
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                            <li>
                                <Link to="/register">Register</Link>
                            </li>
                        </>
                    }
                </ul>
            </nav>
        </header>
    )
}