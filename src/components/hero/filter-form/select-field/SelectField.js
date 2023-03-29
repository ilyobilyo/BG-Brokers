import { FilterSelectOption } from "../filter-select-option/FilterSelectOption"
import styles from './SelectField.module.css';

export const SelectField = ({title, id, type, icon, options}) => {
    return (
        <div className={styles.inputContainer}>
            <label htmlFor={id}>
                <i className={icon} /> {title}
            </label>
            <select name={type} id={id}>
                {options.map(x => <FilterSelectOption key={x} value={x} text={x}/>)}
            </select>
        </div>
    )
}