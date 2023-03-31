import styles from './InputField.module.css';

export const InputField = ({title, icon, id, name, onChangeHandler, validatePrice}) => {
    return (
        <div className={styles.inputContainer}>
            <label htmlFor={id}>
                <i className={icon} /> {title}
            </label>
            <input type="text" name={name} id={id} onChange={onChangeHandler} onBlur={validatePrice}/>
        </div>
    )
}