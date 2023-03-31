import { useContext } from 'react'

import { TypeContext } from '../../../../contexts/TypeContext'

import { InputField } from '../input-field/InputField'
import { SelectField } from '../select-field/SelectField'
import styles from './AdvancedFilter.module.css'

export const AdvancedFilter = ({hideClickHandler, onChangeHandler, validatePrice}) => {
    const {types} = useContext(TypeContext);

    return (
        <div className={styles.advanced}>
            <InputField 
                title='Цена от' 
                id={'price-from'} 
                name="priceFrom"
                icon={'fas fa-money-bill-wave'} 
                onChangeHandler={onChangeHandler}
                validatePrice={validatePrice}
            />
            <InputField 
                title='Цена до' 
                id={'price-to'} 
                name="priceTo"
                icon={'fas fa-money-bill-wave'} 
                onChangeHandler={onChangeHandler}
                validatePrice={validatePrice}
            />

            <SelectField 
                title='Обзавеждане'
                type='furniture' 
                id={'offer-furniture'} 
                icon='fas fa-couch' 
                options={types.furniture} 
                onChangeHandler={onChangeHandler}
            />
            <SelectField 
                title='Отопление' 
                type='heating' 
                id={'offer-heating'} 
                icon='fas fa-temperature-high' 
                options={types.heating} 
                onChangeHandler={onChangeHandler}
            />
            <SelectField 
                title='Изглед' 
                type='exposition' 
                id={'offer-exposition'} 
                icon='fas fa-compass' 
                options={types.exposition} 
                onChangeHandler={onChangeHandler}
            />
            <SelectField 
                title='Конструкция' 
                type='construction' 
                id={'offer-construction'} 
                icon='fas fa-tools' 
                options={types.construction} 
                onChangeHandler={onChangeHandler}
            />

            <InputField 
                title='Квадратура ㎡' 
                name="quadrature"
                id={'qaud'} 
                onChangeHandler={onChangeHandler}
            />

            <a href="#/" onClick={hideClickHandler}>
                <i className="fas fa-caret-up" /> Hide
            </a>
        </div>
    )
}