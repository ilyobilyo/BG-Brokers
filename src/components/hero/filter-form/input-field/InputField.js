import styles from './InputField.module.css';

export const InputField = ({title, icon, id}) => {
    return (
        <div className={styles.inputContainer}>
            <label htmlFor={id}>
                <i className={icon} /> {title}
            </label>
            <input type="text" id={id}/>
        </div>
    )
}