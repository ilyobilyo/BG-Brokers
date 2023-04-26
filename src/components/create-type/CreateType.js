import { useContext, useState } from "react"
import { TypeContext } from "../../contexts/TypeContext"
import styles from './CreateType.module.css';
import * as typeService from '../../services/typeService';
import { checkRequiredInputField } from "../../utils/validate";

export const CreateType = () => {
    const { types } = useContext(TypeContext);
    const [formData, setFormData] = useState({
        typeName: '',
        name: '',
    });

    const [errors, setErrors] = useState({
        typeName: '',
        name: ''
    })

    const onChange = (e) => {
        setFormData(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))
    }

    const onBlur = (e) => {
        setErrors(state => ({
            ...state,
            name: checkRequiredInputField(e.target.name, formData.name),
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if (formData.typeName === '') {
            setErrors(state => ({
                ...state,
                typeName: 'Type name cannot be empty!'
            }))

            return;
        }

        typeService.CreateType(formData)
            .then(() => {
                console.log('done');
            })
    }

    return (
        <section id="createType" className={styles.modal}>
            <div className={styles.modalContentCreateTypes}>
                <form className={styles.create} onSubmit={onSubmit}>
                    <div className={styles.wrapper}>
                        <label htmlFor="type-name">Type Name</label>
                        {errors.typeName && <p className={styles.error}>{errors.typeName}</p>}
                        <select name="typeName" id="type-name" onChange={onChange}>
                            <option value=""></option>
                            {Object.keys(types).map(x => <option key={x} value={x} >{x}</option>)}
                        </select>
                    </div>
                    <div className={styles.wrapper}>
                        <label htmlFor="type">Name</label>
                        {errors.name && <p className={styles.error}>{errors.name}</p>}
                        <input type="text" id="type" name="name" placeholder="ex. EPK" onChange={onChange} onBlur={onBlur} />
                    </div>
                    <button>
                        Create Type <i className="fas fa-plus" />
                    </button>
                </form>
            </div>
        </section>

    )
}