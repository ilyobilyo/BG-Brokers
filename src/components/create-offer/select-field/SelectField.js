import styles from '../CreateOffer.module.css';

export const SelectField = ({elementId, labelText, name, options, hasOptionId, onChangeHandler, onBlurHandler}) => {
    return (
        <div className={styles.inputWrapper}>
            <label htmlFor={elementId}>{labelText}</label>
            <select name={name} id={elementId} onChange={onChangeHandler} onBlur={onBlurHandler}>
                <option value=''></option>
                {options.map(x => <option key={x.name} value={hasOptionId ? x.id : x.name} >{x.name}</option>)}
            </select>
        </div>
    )
}