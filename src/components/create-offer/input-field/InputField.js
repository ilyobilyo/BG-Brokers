import styles from '../CreateOffer.module.css';

export const InputField = ({ elementId, labelText, inputType, name, onChanegeHandler, isMultiple, value }) => {
    return (
        isMultiple
            ? <div className={`${styles.inputWrapper} ${styles.imagesInput}`}>
                <label htmlFor={elementId}>{labelText}</label>
                <input type={inputType} name={name} id={elementId} onChange={onChanegeHandler} multiple />
            </div>
            : <div className={styles.inputWrapper}>
                <label htmlFor={elementId}>{labelText}</label>
                <input type={inputType} name={name} id={elementId} onChange={onChanegeHandler} defaultValue={value && value} defaultChecked={value}/>
            </div>
    )
}