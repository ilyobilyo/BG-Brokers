import { SelectField } from "./select-field/SelectField"
import styles from './FilterForm.module.css';

import { useContext, useEffect, useState } from "react";

import { AdvancedFilter } from "./advancedFilter/AdvancedFilter";
import { TypeContext } from "../../../contexts/TypeContext";
import { OfferLocationContext } from "../../../contexts/OfferLocationContext";
import { checkPrice } from "../../../utils/validate";
import { OfferContext } from "../../../contexts/OfferContext";
import { useNavigate } from "react-router-dom";

export const FilterForm = () => {
    const { types } = useContext(TypeContext);
    const { towns, hoods, getTownHoods } = useContext(OfferLocationContext);
    const { getInitialOffers} = useContext(OfferContext);
    const navigate = useNavigate();
    
    const [errors, setErrors] = useState({
        priceFrom: '',
        priceTo: '',
        quadrature: '',
    })
    const [formData, setFormData] = useState({
        sellType: '',
        offerType: '',
        townId: '',
        hood: '',
        priceFrom: '',
        priceTo: '',
        furniture: '',
        heating: '',
        exposition: '',
        construction: '',
        quadrature: '',
    })
    const [showAdvanced, setShowAdvanced] = useState(false);

    const advancedClickHandler = (e) => {
        e.preventDefault();

        setShowAdvanced(!showAdvanced);
    }

    const onChange = (e) => {
        setFormData(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))
    }

    const validatePrice = (e) => {
        setErrors(state => ({
            ...state,
            priceFrom: checkPrice(Number(formData.priceFrom))
        }))
    }

    const setTownHoods = (e) => {
        getTownHoods(formData.townId)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const queryParams = new URLSearchParams();
        let params = {};
        
        for (const [key, value] of Object.entries(formData)) {
            if (value !== "") {
                queryParams.append(key, value);
                params[key] = value;
            }
        }

        const filteredURL = `?${queryParams.toString()}`;
        
        getInitialOffers(params)

        navigate(filteredURL);
    }

    return (
        types === undefined || towns.length === 0
            ? <p>Loading...</p>
            : <form className={styles.filterForm} onSubmit={onSubmit} method="get">
                <SelectField
                    title='Вид продажба'
                    type={'sellType'}
                    id={'sell-type'}
                    icon='fas fa-search-dollar'
                    options={types.sellType}
                    onChangeHandler={onChange}
                />
                <SelectField
                    title='Вид на имота'
                    type={'offerType'}
                    id={'offer-type'}
                    icon='far fa-building'
                    options={types.offerType}
                    onChangeHandler={onChange}
                />
                <SelectField
                    title='Град'
                    type={'townId'}
                    id={'offer-town'}
                    icon='fas fa-city'
                    options={towns}
                    optionValues={Object.keys(towns)}
                    onChangeHandler={onChange}
                    onBlurHndler={setTownHoods}
                />
                <SelectField
                    title='Квартал'
                    type={'hood'}
                    id={'offer-hood'}
                    icon='fas fa-map-marked-alt'
                    options={hoods}
                    onChangeHandler={onChange}
                />

                {showAdvanced
                    ? <AdvancedFilter
                        hideClickHandler={advancedClickHandler}
                        types={types}
                        onChangeHandler={onChange}
                        validatePrice={validatePrice}
                    />
                    : <a href="#/" onClick={advancedClickHandler}>
                        <i className="fas fa-caret-down" /> Advanced
                    </a>
                }

                <button className={styles.btnSearch}>Търси</button>
            </form>

    )
}