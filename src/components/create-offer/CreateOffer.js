import { useContext, useEffect, useState } from 'react';
import styles from './CreateOffer.module.css';
import { TypeContext } from '../../contexts/TypeContext';
import { OfferLocationContext } from '../../contexts/OfferLocationContext';
import { InputField } from './input-field/InputField';
import { SelectField } from './select-field/SelectField';
import { Textarea } from './textarea/Textarea';
import * as userService from '../../services/userService';
import * as offerService from '../../services/offerService';
import { useNavigate } from 'react-router-dom';
import { OfferContext } from '../../contexts/OfferContext';


export const CreateOffer = () => {
    const { types } = useContext(TypeContext);
    const { towns, hoods, getTownHoods } = useContext(OfferLocationContext);
    const {addNewOffer} = useContext(OfferContext);
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [brokers, setBrokers] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        town: '',
        townId: '',
        hood: '',
        sellType: '',
        offerType: '',
        construction: '',
        furniture: '',
        heating: '',
        broker: '',
        address: '',
        exposition: '',
        price: '',
        area: '',
        rooms: '',
        bedrooms: '',
        terraces: '',
        floor: '',
        totalFloors: '',
        ownerPhone: '',
        hasElevator: false,
        hasParkingPlace: false,
        description: '',
        images: []
    })

    useEffect(() => {
        userService.getAllUsers()
            .then(data => {
                setBrokers(data);
            })
    }, [])



    const onChange = (e) => {
        setFormData(state => ({
            ...state,
            [e.target.name]: e.target.name === 'price' || e.target.name === 'area' ? Number(e.target.value) : e.target.value
        }))
    }

    const onChangeTownInput = (e) => {
        setFormData(state => ({
            ...state,
            townId: e.target.value,
            town: towns.find(x => x.id == e.target.value).name,
        }))
    }

    const onChangeCheckbox = (e) => {
        setFormData(state => ({
            ...state,
            [e.target.name]: !state[e.target.name]
        }))
    }

    const onChangeFileInput = (e) => {
        setFormData(state => ({
            ...state,
            images: e.target.files
        }))
    }

    const setTownHoods = (e) => {
        getTownHoods(formData.townId)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        const broker = brokers.find(x => x.id === formData.broker);
        formData.broker = broker;

        offerService.createOffer(formData)
            .then(newOffer => {
                setIsLoading(false);
                addNewOffer(newOffer);
                navigate('/');
            })
    }

    return (
        <section id="createModal" className={styles.modal}>
            <div className={styles.createOfferContent}>
                <h1>Create Offer</h1>
                {isLoading ? <p>Creating ...</p>
                    : <form encType="multipart/form-data" className={styles.createOfferForm} onSubmit={onSubmit}>
                        <InputField elementId='offer-title' labelText='Title' inputType='text' name='title' onChanegeHandler={onChange} />
                        
                        <SelectField elementId='city' labelText='Town' name='town' options={towns} hasOptionId={true} onChangeHandler={onChangeTownInput} onBlurHandler={setTownHoods} />

                        <SelectField elementId='offer-hood' labelText='Hood' name='hood' options={hoods} onChangeHandler={onChange} />

                        <SelectField elementId='sell-type' labelText='Sell Type' name='sellType' options={types.sellType} onChangeHandler={onChange} />
                        
                        <InputField elementId='offer-address' labelText='Address' inputType='text' name='address' onChanegeHandler={onChange} />

                        <InputField elementId='offer-price' labelText='Price' inputType='number' name='price' onChanegeHandler={onChange} />

                        <InputField elementId='offer-area' labelText='Area in ㎡' inputType='number' name='area' onChanegeHandler={onChange} />

                        <SelectField elementId='offer-type' labelText='Offer Type' name='offerType' options={types.offerType} onChangeHandler={onChange} />

                        <SelectField elementId='offer-construction' labelText='Construction' name='construction' options={types.construction} onChangeHandler={onChange} />

                        <SelectField elementId='offer-furniture' labelText='Furniture' name='furniture' options={types.furniture} onChangeHandler={onChange} />

                        <SelectField elementId='offer-heating' labelText='Heating' name='heating' options={types.heating} onChangeHandler={onChange} />

                        <SelectField elementId='offer-broker' labelText='Broker' name='broker' options={brokers} hasOptionId={true} onChangeHandler={onChange} />

                        <InputField elementId='offer-rooms' labelText='Total Rooms' inputType='number' name='rooms' onChanegeHandler={onChange} />

                        <InputField elementId='offer-bedrooms' labelText='Bedrooms' inputType='number' name='bedrooms' onChanegeHandler={onChange} />

                        <InputField elementId='offer-terraces' labelText='Terraces' inputType='number' name='terraces' onChanegeHandler={onChange} />

                        <InputField elementId='offer-floor' labelText='Floor' inputType='number' name='floor' onChanegeHandler={onChange} />

                        <InputField elementId='offer-total-floors' labelText='Total Floors' inputType='number' name='totalFloors' onChanegeHandler={onChange} />

                        <InputField elementId='offer-owner-phone' labelText='Owner phone' inputType='text' name='ownerPhone' onChanegeHandler={onChange} />

                        <InputField elementId='offer-elevator' labelText='Has Elevator' inputType='checkbox' name='hasElevator' onChanegeHandler={onChangeCheckbox} />

                        <InputField elementId='offer-parking' labelText='Has Parking place' inputType='checkbox' name='hasParkingPlace' onChanegeHandler={onChangeCheckbox} />

                        <SelectField elementId='offer-exposition' labelText='Exposition' name='exposition' options={types.exposition} onChangeHandler={onChange} />

                        <Textarea elementId='offer-desc' labelText='Description' name='description' onChangeHandler={onChange} />

                        <InputField elementId='offer-images' labelText='Images' inputType='file' name='images' onChanegeHandler={onChangeFileInput} isMultiple={true} />

                        <button className={styles.btnSubmit}>Create</button>
                    </form>}

            </div>
        </section>

    )
}