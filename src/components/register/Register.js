import { useContext } from 'react';
import styles from './Register.module.css';
import { ModalContext } from '../../contexts/ModalContext';


export const Register = () => {
    const {isOpen, modalRef} = useContext(ModalContext);

    return (
        isOpen && <section ref={modalRef} id="registerModal" className={styles.modal}>
        <div className={styles.registerContent}>
            <h1>Register</h1>
            <form className={styles.registerForm}>
                <label htmlFor="mail">
                    <i className="fas fa-envelope" /> E-mail
                </label>
                <input type="email" name="email" id="mail" />
                <label htmlFor="pass">
                    <i className="fas fa-key" /> Password
                </label>
                <input type="password" name="password" id="pass" />
                <label htmlFor="rePass">
                    <i className="fas fa-lock" /> Confirm password
                </label>
                <input type="password" name="rePassword" id="rePass" />
                <label htmlFor="fName">
                    <i className="fas fa-id-card" /> First name
                </label>
                <input type="text" name="firstName" id="fName" />
                <label htmlFor="lName">
                    <i className="fas fa-id-card" /> Last name
                </label>
                <input type="text" name="lastName" id="lName" />
                <label htmlFor="mobile">
                    <i className="fas fa-phone" /> Phone number
                </label>
                <input type="text" name="phoneNumber" id="mobile" />
                <label htmlFor="city">
                    <i className="fas fa-city" /> Town
                </label>
                <select name="town" id="city">
                    <option value="id1">Sofia</option>
                    <option value="id2">Plovdiv</option>
                    <option value="id3">Varna</option>
                    <option value="id4">Burgas</option>
                </select>
                <button className={styles.btnSubmit}>Register</button>
            </form>
        </div>
    </section>
    )
}