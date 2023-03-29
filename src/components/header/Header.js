import styles from './Header.module.css';

export const Header = () => {

    return (
        <header>
            <img src="" alt="logo" />
            <nav>
                <ul className={styles.headerUl}>
                    <li>
                        <a id={styles.navActive} href="#/">
                            Home
                        </a>
                    </li>
                    <li>
                        <a href="#/">About</a>
                    </li>
                    <li>
                        <a href="#/">Contacts</a>
                    </li>
                    <li>
                        <a href="#/">Login</a>
                    </li>
                    <li>
                        <a href="#/">Register</a>
                    </li>
                </ul>
            </nav>
        </header>
    )
}