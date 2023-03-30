import { SelectField } from "./select-field/SelectField"
import styles from './FilterForm.module.css';

import { useContext, useState } from "react";

import { AdvancedFilter } from "./advancedFilter/AdvancedFilter";
import { TypeContext } from "../../../contexts/TypeContext";
import { TownContext } from "../../../contexts/TownContext";

export const FilterForm = () => {
    const {types} = useContext(TypeContext);
    const {towns, hoods} = useContext(TownContext);

    const [showAdvanced, setShowAdvanced] = useState(false);

    const advancedClickHandler = (e) => {
        e.preventDefault();

        setShowAdvanced(!showAdvanced);
    }

    return (
        types.length === 0 || towns.length === 0 || hoods.length === 0
            ? <p>Loading...</p>
            : <form className={styles.filterForm}>
                <SelectField title='Вид продажба' type={'sellType'} id={'sell-type'} icon='fas fa-search-dollar' options={types.sellType} />
                <SelectField title='Вид на имота' type={'offerType'} id={'offer-type'} icon='far fa-building' options={types.offerType} />
                <SelectField title='Град' type={'town'} id={'offer-town'} icon='fas fa-city' options={towns} />
                <SelectField title='Квартал' type={'hood'} id={'offer-hood'} icon='fas fa-map-marked-alt' options={hoods} />

                {showAdvanced
                    ? <AdvancedFilter hideClickHandler={advancedClickHandler} types={types}/>
                    : <a href="#/" onClick={advancedClickHandler}>
                        <i className="fas fa-caret-down" /> Advanced
                    </a>
                }

                <button className={styles.btnSearch}>Търси</button>
            </form>

    )
}