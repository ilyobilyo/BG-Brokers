import { useContext, useState } from "react";
import { useEffect } from "react";
import * as userService from '../../../services/userService';
import { useNavigate, useParams } from "react-router-dom";
import { checkRequiredInputField, validatePhoneNumber } from "../../../utils/validate";
import { deleteFile, uploadFile } from "../../../utils/uploadImg";
import styles from './EditUser.module.css'
import { OfferLocationContext } from "../../../contexts/OfferLocationContext";
import Select from 'react-select';
import { AuthContext } from "../../../contexts/AuthContext";


export const EditUser = () => {
    const { userId } = useParams();
    const { towns } = useContext(OfferLocationContext);
    const {user, setUser} = useContext(AuthContext);
    const navigate = useNavigate();

    const [roles, setRoles] = useState([]);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        town: '',
        img: null,
        roles: [],
    });

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        serviceError: '',
    });

    useEffect(() => {
        userService.getUserById(userId)
            .then(user => {
                setFormData({
                    id: userId,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    phoneNumber: user.phoneNumber,
                    town: user.town,
                    img: user.img,
                    roles: user.roles.map(x => {
                        return {
                            value: x,
                            label: x,
                        }
                    })
                    
                });
            })

        userService.getRoles()
        .then(data => {
            setRoles(data);
        })
    }, [])

    const onChange = (e) => {
        setFormData(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))
    }

    const onChangeRole = (roles) => {
        debugger
        setFormData(state => ({
            ...state,
            roles: roles
        }))
    }

    const onChangeFile = async (e) => {
        deleteFile(formData.img);

        const newImg = await uploadFile(e.target.files[0])

        user.img = newImg;

        setUser(user);

        setFormData(state => ({
            ...state,
            img: newImg
        }))
    }


    const onBlur = (e) => {
        if (e.target.name === 'email' || e.target.name === 'firstName' || e.target.name === 'lastName') {
            setErrors(state => ({
                ...state,
                [e.target.name]: checkRequiredInputField(e.target.name, formData[e.target.name])
            }))
        } else if (e.target.name === 'phoneNumber') {
            setErrors(state => ({
                ...state,
                phoneNumber: validatePhoneNumber(formData.phoneNumber)
            }))
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();

        userService.updateUser(formData)
            .then(data => {
                navigate('/manageUsers');
            })
            .catch((error) => {
                setErrors(state => ({
                    ...state,
                    serviceError: error.message
                }))
            });
    }

    return (
        <section id="edit-user" className={styles.editUserSection}>
            <div className={styles.editUserContent}>
                <h1>Edit User</h1>
                <form className={styles.editUserForm} onSubmit={onSubmit} encType="multipart/form-data">
                    {errors.serviceError && <p className={styles.error}>{errors.serviceError}</p>}

                    <div className={styles.imageSection}>
                        <div className={styles.imageContainer}>
                            <img src={formData.img} alt="userImage" />
                        </div>
                        <label htmlFor="user-img">
                            Change image
                        </label>
                        <input type='file' name='img' id='user-img' onChange={onChangeFile} />
                    </div>
                    <div className={styles.inputsContainer}>
                        <label htmlFor="fName">
                            <i className="fas fa-id-card" /> First name
                        </label>
                        <input type="text" name="firstName" id="fName" onChange={onChange} onBlur={onBlur} value={formData.firstName} />
                        {errors.firstName && <p className={styles.error}>{errors.firstName}</p>}

                        <label htmlFor="lName">
                            <i className="fas fa-id-card" /> Last name
                        </label>
                        <input type="text" name="lastName" id="lName" onChange={onChange} onBlur={onBlur} value={formData.lastName} />
                        {errors.lastName && <p className={styles.error}>{errors.lastName}</p>}

                        <label htmlFor="mobile">
                            <i className="fas fa-phone" /> Phone number
                        </label>
                        <input type="text" name="phoneNumber" id="mobile" onChange={onChange} onBlur={onBlur} value={formData.phoneNumber} />
                        {errors.phoneNumber && <p className={styles.error}>{errors.phoneNumber}</p>}

                        <label htmlFor="city">
                            <i className="fas fa-city" /> Town
                        </label>
                        <select name="town" id="city" onChange={onChange} value={formData.town}>
                            {towns.map(x => <option key={x.name} value={x.name}>{x.name}</option>)}
                        </select>

                        <label htmlFor="city">
                            <i className="fas fa-user-shield" /> Roles
                        </label>
                        <Select
                            onChange={onChangeRole}
                            value={formData.roles}
                            isMulti
                            name="roles"
                            options={roles}
                            className={`basic-multi-select ${styles.rolesSelect}`}
                            classNamePrefix="select"
                        />
                    </div>
                    <button className={styles.btnSubmit} disabled={errors.email || errors.password || errors.rePassword || errors.firstName || errors.lastName || errors.phoneNumber}>
                        Update
                    </button>
                </form>
            </div>
        </section>
    )
}