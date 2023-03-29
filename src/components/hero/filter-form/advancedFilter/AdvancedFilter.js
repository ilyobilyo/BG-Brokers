import { InputField } from '../input-field/InputField'
import { SelectField } from '../select-field/SelectField'
import styles from './AdvancedFilter.module.css'

export const AdvancedFilter = ({hideClickHandler}) => {
    return (
        <div className={styles.advanced}>
            <InputField title='Цена от' id={'price-from'} icon={'fas fa-money-bill-wave'} />
            <InputField title='Цена до' id={'price-to'} icon={'fas fa-money-bill-wave'} />

            <SelectField title='Обзавеждане' type='furniture' id={'offer-furniture'} icon='fas fa-couch' options={['Необзаведен', 'Ново обзавеждане', 'Старо обзавеждане']} />
            <SelectField title='Отопление' type='heating' id={'offer-heating'} icon='fas fa-temperature-high' options={['ТЕЦ', 'Електричество']} />
            <SelectField title='Изглед' type='exposition' id={'offer-exposition'} icon='fas fa-compass' options={['Изток', 'Запад', 'Север', 'Юг']} />
            <SelectField title='Конструкция' type='construction' id={'offer-construction'} icon='fas fa-tools' options={['ЕПК', 'ПК', 'Тухла']} />

            <InputField title='Квадратура ㎡' id={'qaud'} />
            <a href="#/" onClick={hideClickHandler}>
                <i className="fas fa-caret-up" /> Hide
            </a>
        </div>
    )
}