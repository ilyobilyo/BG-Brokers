import { useContext } from 'react'

import { TypeContext } from '../../../../contexts/TypeContext'

import { InputField } from '../input-field/InputField'
import { SelectField } from '../select-field/SelectField'
import styles from './AdvancedFilter.module.css'

export const AdvancedFilter = ({hideClickHandler}) => {
    const {types} = useContext(TypeContext);

    return (
        <div className={styles.advanced}>
            <InputField title='Цена от' id={'price-from'} icon={'fas fa-money-bill-wave'} />
            <InputField title='Цена до' id={'price-to'} icon={'fas fa-money-bill-wave'} />

            <SelectField title='Обзавеждане' type='furniture' id={'offer-furniture'} icon='fas fa-couch' options={types.furniture} />
            <SelectField title='Отопление' type='heating' id={'offer-heating'} icon='fas fa-temperature-high' options={types.Heating} />
            <SelectField title='Изглед' type='exposition' id={'offer-exposition'} icon='fas fa-compass' options={types.exposition} />
            <SelectField title='Конструкция' type='construction' id={'offer-construction'} icon='fas fa-tools' options={types.construction} />

            <InputField title='Квадратура ㎡' id={'qaud'} />
            <a href="#/" onClick={hideClickHandler}>
                <i className="fas fa-caret-up" /> Hide
            </a>
        </div>
    )
}