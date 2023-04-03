import styles from './Login.module.css';
import { ModalContext } from '../../contexts/ModalContext';
import { useContext } from 'react';

export const Login = () => {
    const {isOpen, modalRef} = useContext(ModalContext);

    return (
        isOpen && <section ref={modalRef} id="loginModal" className={styles.modal}>
            <div className={styles.loginContent}>
                <h1>Login</h1>
                <form className={styles.loginForm}>
                    <label htmlFor="mail">
                        <i className="fas fa-envelope" /> E-mail
                    </label>
                    <input type="email" name="email" id="mail" />
                    <label htmlFor="pass">
                        <i className="fas fa-key" /> Password
                    </label>
                    <input type="password" name="password" id="pass" />
                    <button className={styles.btnSubmit}>Register</button>
                </form>
            </div>
        </section>
    )
}