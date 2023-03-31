import { FilterSelectOption } from "../filter-select-option/FilterSelectOption"
import styles from './SelectField.module.css';

export const SelectField = ({title, id, type, icon, options, optionValues, onChangeHandler, onBlurHndler}) => {
    return (
        <div className={styles.inputContainer}>
            <label htmlFor={id}>
                <i className={icon} /> {title}
            </label>
            <select name={type} id={id} onChange={onChangeHandler} onBlur={onBlurHndler}>
                {options.map(x => <FilterSelectOption key={x.name} value={optionValues ? x.id : x.name} text={x.name}/>)}
            </select>
        </div>
    )
}