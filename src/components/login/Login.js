import styles from './Login.module.css';
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

import * as authService from '../../services/authService';
import { checkRequiredInputField, validatePassword } from '../../utils/validate';

export const Login = () => {
    const { onLogin } = useContext(AuthContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const [errors, setErrors] = useState({
        email: '',
        password: '',
        serviceError: '',
    })

    const onChange = (e) => {
        setFormData(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))
    }

    const onBlur = (e) => {
        if (e.target.name === 'email') {
            setErrors(state => ({
                ...state,
                [e.target.name]: checkRequiredInputField(e.target.name, formData[e.target.name])
            }))
        } else if (e.target.name === 'password') {
            setErrors(state => ({
                ...state,
                password: validatePassword(formData.password)
            }))
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        authService.login(formData.email, formData.password)
            .then(data => {
                onLogin(data)
                navigate('/');
            })
            .catch((error) => {
                setErrors(state => ({
                    ...state,
                    serviceError: `Email or Password is not valid (${error.message})`
                }))
            });
    }

    return (
        <section id="login" className={styles.loginSection}>
            <div className={styles.loginContent}>
                <h1>Login</h1>
                <form className={styles.loginForm} onSubmit={onSubmit}>
                    {errors.serviceError && <p className={styles.error}>{errors.serviceError}</p>}
                    <label htmlFor="mail">
                        <i className="fas fa-envelope" /> E-mail
                    </label>
                    <input type="email" name="email" id="mail" onChange={onChange} onBlur={onBlur} />
                    {errors.email && <p className={styles.error}>{errors.email}</p>}

                    <label htmlFor="pass">
                        <i className="fas fa-key" /> Password
                    </label>
                    <input type="password" name="password" id="pass" onChange={onChange} onBlur={onBlur} />
                    {errors.password && <p className={styles.error}>{errors.password}</p>}

                    <button className={styles.btnSubmit}>Login</button>
                </form>
            </div>
        </section>
    )
}