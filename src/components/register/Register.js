import { useContext, useState } from 'react';
import styles from './Register.module.css';
import * as authService from '../../services/authService';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { checkRequiredInputField, validatePassAndRepass, validatePassword, validatePhoneNumber } from '../../utils/validate';
import { OfferLocationContext } from '../../contexts/OfferLocationContext';


export const Register = () => {
    const { onLogin } = useContext(AuthContext);
    const { towns } = useContext(OfferLocationContext);

    const navigate = useNavigate();

    const [errors, setErrors] = useState({
        email: '',
        password: '',
        rePassword: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        serviceError: '',
    });

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rePassword: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        town: '',
        img: null,
    });

    const onChange = (e) => {
        setFormData(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))
    }

    const onChangeFile = (e) => {
        setFormData(state => ({
            ...state,
            img: e.target.files[0]
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault();

        authService.register(formData.email, formData.password, formData.firstName, formData.lastName, formData.phoneNumber, formData.town, formData.img)
            .then(data => {
                onLogin(data)
                navigate('/');
            })
            .catch((error) => {
                setErrors(state => ({
                    ...state,
                    serviceError: error.message
                }))
            });
    }

    const onBlur = (e) => {
        if (e.target.name === 'email' || e.target.name === 'firstName' || e.target.name === 'lastName') {
            setErrors(state => ({
                ...state,
                [e.target.name]: checkRequiredInputField(e.target.name, formData[e.target.name])
            }))
        } else if (e.target.name === 'password') {
            setErrors(state => ({
                ...state,
                password: validatePassword(formData.password)
            }))
        } else if (e.target.name === 'rePassword') {
            setErrors(state => ({
                ...state,
                rePassword: validatePassAndRepass(formData.password, formData.rePassword)
            }))
        } else if (e.target.name === 'phoneNumber') {
            setErrors(state => ({
                ...state,
                phoneNumber: validatePhoneNumber(formData.phoneNumber)
            }))
        }
    }

    return (
        <section id="register" className={styles.registerSection}>
            <div className={styles.registerContent}>
                <h1>Register</h1>
                <form className={styles.registerForm} onSubmit={onSubmit} encType="multipart/form-data">
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

                    <label htmlFor="rePass">
                        <i className="fas fa-lock" /> Confirm password
                    </label>
                    <input type="password" name="rePassword" id="rePass" onChange={onChange} onBlur={onBlur} />
                    {errors.rePassword && <p className={styles.error}>{errors.rePassword}</p>}

                    <label htmlFor="fName">
                        <i className="fas fa-id-card" /> First name
                    </label>
                    <input type="text" name="firstName" id="fName" onChange={onChange} onBlur={onBlur} />
                    {errors.firstName && <p className={styles.error}>{errors.firstName}</p>}

                    <label htmlFor="lName">
                        <i className="fas fa-id-card" /> Last name
                    </label>
                    <input type="text" name="lastName" id="lName" onChange={onChange} onBlur={onBlur} />
                    {errors.lastName && <p className={styles.error}>{errors.lastName}</p>}

                    <label htmlFor="mobile">
                        <i className="fas fa-phone" /> Phone number
                    </label>
                    <input type="text" name="phoneNumber" id="mobile" onChange={onChange} onBlur={onBlur} />
                    {errors.phoneNumber && <p className={styles.error}>{errors.phoneNumber}</p>}

                    <label htmlFor="city">
                        <i className="fas fa-city" /> Town
                    </label>
                    <select name="town" id="city" onChange={onChange}>
                        {towns.map(x => <option key={x.name} value={x.name}>{x.name}</option>)}
                    </select>
                    <label htmlFor="user-img">
                        User image
                    </label>
                    <input type='file' name='img' id='user-img' onChange={onChangeFile}/>
                    <button className={styles.btnSubmit} disabled={errors.email || errors.password || errors.rePassword || errors.firstName || errors.lastName || errors.phoneNumber}>
                        Register
                    </button>
                </form>
            </div>
        </section>
    )
}