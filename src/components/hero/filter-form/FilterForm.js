import { SelectField } from "./select-field/SelectField"
import styles from './FilterForm.module.css';
import { useState } from "react";
import { AdvancedFilter } from "./advancedFilter/AdvancedFilter";


export const FilterForm = () => {
    const [showAdvanced, setShowAdvanced] = useState(false);


    const advancedClickHandler = (e) => {
        e.preventDefault();

        setShowAdvanced(!showAdvanced);
    }

    return (
        <form className={styles.filterForm}>
            <SelectField title='Вид продажба' type='sellType' id={'sell-type'} icon='fas fa-search-dollar' options={['Продажба', 'Под наем']} />
            <SelectField title='Вид на имота' type='offerType' id={'offer-type'} icon='far fa-building' options={['1-стаен', '2-стаен', '3-стаен', 'Мезонет', 'Офис']} />
            <SelectField title='Град' type='town' id={'offer-town'} icon='fas fa-city' options={['Варна', 'София']} />
            <SelectField title='Квартал' type='hood' id={'offer-hood'} icon='fas fa-map-marked-alt' options={['Владиславово', 'Център']} />

            {showAdvanced 
            ? <AdvancedFilter hideClickHandler={advancedClickHandler}/>
            : <a href="#/" onClick={advancedClickHandler}>
                <i className="fas fa-caret-down" /> Advanced
              </a>
            }
            
            <button className={styles.btnSearch}>Търси</button>
        </form>
    )
}