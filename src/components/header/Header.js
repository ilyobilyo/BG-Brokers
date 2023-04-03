import { Link } from 'react-router-dom';
import styles from './Header.module.css';

export const Header = () => {

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
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/register">Register</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}