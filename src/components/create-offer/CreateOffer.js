import { useContext, useState } from 'react';
import styles from './CreateOffer.module.css';
import { TypeContext } from '../../contexts/TypeContext';
import { OfferLocationContext } from '../../contexts/OfferLocationContext';
import { InputField } from './input-field/InputField';
import { SelectField } from './select-field/SelectField';
import { Textarea } from './textarea/Textarea';


export const CreateOffer = () => {
    const {types} = useContext(TypeContext);
    const {towns, hoods, getTownHoods} = useContext(OfferLocationContext);

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

    const onChange = (e) => {
        setFormData(state => ({
            ...state,
            [e.target.name]: e.target.value
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

    return (
        <section id="createModal" className={styles.modal}>
            <div className={styles.createOfferContent}>
                <h1>Create Offer</h1>
                <form encType="multipart/form-data" className={styles.createOfferForm}>
                    <InputField elementId='offer-title' labelText='Title' inputType='text' name='title' onChanegeHandler={onChange}/>
                    
                    <SelectField elementId='city' labelText='Town' name='town' options={towns} hasOptionId={true} onChangeHandler={onChangeTownInput} onBlurHandler={setTownHoods}/>
                    
                    <SelectField elementId='offer-hood' labelText='Hood' name='hood' options={hoods} onChangeHandler={onChange}/>

                    <SelectField elementId='sell-type' labelText='Sell Type' name='sellType' options={types.sellType} onChangeHandler={onChange}/>
                    
                    <SelectField elementId='offer-type' labelText='Offer Type' name='offerType' options={types.offerType} onChangeHandler={onChange}/>
                    
                    <SelectField elementId='offer-construction' labelText='Construction' name='construction' options={types.construction} onChangeHandler={onChange}/>
                    
                    <SelectField elementId='offer-furniture' labelText='Furniture' name='furniture' options={types.furniture} onChangeHandler={onChange}/>

                    <SelectField elementId='offer-heating' labelText='Heating' name='heating' options={types.heating} onChangeHandler={onChange}/>
                    
                    {/*TODO: Create GetBroker from db fuctions */}
                    <div className={styles.inputWrapper}>
                        <label htmlFor="offer-broker">Broker</label>
                        <select name="broker" id="offer-broker">
                            <option value="id1">Iliyan Iliev</option>
                            <option value="id2">John Cena</option>
                            <option value="id3">Petur Asenov</option>
                        </select>
                    </div>

                    <InputField elementId='offer-address' labelText='Address' inputType='text' name='address' onChanegeHandler={onChange}/>
                   
                    <InputField elementId='offer-price' labelText='Price' inputType='number' name='price' onChanegeHandler={onChange}/>
                    
                    <InputField elementId='offer-area' labelText='Area in ㎡' inputType='number' name='area' onChanegeHandler={onChange}/>
                    
                    <InputField elementId='offer-rooms' labelText='Total Rooms' inputType='number' name='rooms' onChanegeHandler={onChange}/>
                    
                    <InputField elementId='offer-bedrooms' labelText='Bedrooms' inputType='number' name='bedrooms' onChanegeHandler={onChange}/>

                    <InputField elementId='offer-terraces' labelText='Terraces' inputType='number' name='terraces' onChanegeHandler={onChange}/>
                    
                    <InputField elementId='offer-floor' labelText='Floor' inputType='number' name='floor' onChanegeHandler={onChange}/>

                    <InputField elementId='offer-total-floors' labelText='Total Floors' inputType='number' name='totalFloors' onChanegeHandler={onChange}/>
                    
                    <InputField elementId='offer-owner-phone' labelText='Owner phone' inputType='text' name='ownerPhone' onChanegeHandler={onChange}/>
                    
                    <InputField elementId='offer-elevator' labelText='Has Elevator' inputType='checkbox' name='hasElevator' onChanegeHandler={onChangeCheckbox}/>
                    
                    <InputField elementId='offer-parking' labelText='Has Parking place' inputType='checkbox' name='hasParkingPlace' onChanegeHandler={onChangeCheckbox}/>
                   
                    <Textarea elementId='offer-desc' labelText='Description' name='description' onChangeHandler={onChange}/>
                    
                    <InputField elementId='offer-images' labelText='Images' inputType='file' name='images' onChanegeHandler={onChangeFileInput} isMultiple={true}/>
                    
                    <button className={styles.btnSubmit}>Create</button>
                </form>
            </div>
        </section>

    )
}