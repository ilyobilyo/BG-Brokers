import styles from '../CreateOffer.module.css';

export const SelectField = ({elementId, labelText, name, options, hasOptionId, onChangeHandler, onBlurHandler, value}) => {
    return (
        <div className={styles.inputWrapper}>
            <label htmlFor={elementId}>{labelText}</label>
            <select name={name} id={elementId} onChange={onChangeHandler} onBlur={onBlurHandler} value={value && value}>
                <option value=''></option>
                {options.map(x => <option key={hasOptionId ? x.id : x.name} value={hasOptionId ? x.id : x.name} >{x.name}</option>)}
            </select>
        </div>
    )
}