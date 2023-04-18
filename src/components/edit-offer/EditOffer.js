import { useContext, useEffect, useState } from "react";
import { InputField } from "../create-offer/input-field/InputField"
import { SelectField } from "../create-offer/select-field/SelectField"
import styles from '../create-offer/CreateOffer.module.css'
import { TypeContext } from "../../contexts/TypeContext";
import { OfferLocationContext } from "../../contexts/OfferLocationContext";
import * as userService from '../../services/userService'
import * as offerService from '../../services/offerService'
import { Textarea } from "../create-offer/textarea/Textarea";
import { OfferContext } from "../../contexts/OfferContext";
import { useNavigate, useParams } from "react-router-dom";


export const EditOffer = () => {
    const { types } = useContext(TypeContext);
    const { towns, hoods, getTownHoods } = useContext(OfferLocationContext);
    const { updateOffer, offers } = useContext(OfferContext);
    const navigate = useNavigate();
    const { offerId } = useParams();

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
                setFormData(offers.find(x => x.id === offerId))
            });

    }, [])

    useEffect(() => {
        getTownHoods(formData.townId);
    }, [formData.townId])

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

    const setTownHoods = (e) => {
        getTownHoods(formData.townId)
    }

    const onChangeFileInput = (e) => {
        setFormData(state => ({
            ...state,
            images: [...state.images, ...e.target.files]
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (!formData.broker.id) {
            const broker = brokers.find(x => x.id === formData.broker);
            formData.broker = broker;
        }

        offerService.updateOffer(offerId, formData)
            .then(updatedOffer => {
                setIsLoading(false);
                updateOffer(updatedOffer);
                navigate('/');
            })
    }

    return (
        <section id="createModal" className={styles.modal}>
            <div className={styles.createOfferContent}>
                <h1>Edit Offer</h1>
                {isLoading || !formData.broker || !hoods ? <p>Creating ...</p>
                    : <form encType="multipart/form-data" className={styles.createOfferForm} onSubmit={onSubmit}>
                        <InputField elementId='offer-title' labelText='Title' inputType='text' name='title' onChanegeHandler={onChange} value={formData.title} />

                        <SelectField elementId='city' labelText='Town' name='town' options={towns} hasOptionId={true} value={formData.townId} onChangeHandler={onChangeTownInput} onBlurHandler={setTownHoods} />

                        <SelectField elementId='offer-hood' labelText='Hood' name='hood' options={hoods} value={formData.hood} onChangeHandler={onChange} />

                        <SelectField elementId='sell-type' labelText='Sell Type' name='sellType' options={types.sellType} value={formData.sellType} onChangeHandler={onChange} />

                        <SelectField elementId='offer-type' labelText='Offer Type' name='offerType' options={types.offerType} value={formData.offerType} onChangeHandler={onChange} />

                        <SelectField elementId='offer-construction' labelText='Construction' name='construction' options={types.construction} value={formData.construction} onChangeHandler={onChange} />

                        <SelectField elementId='offer-furniture' labelText='Furniture' name='furniture' options={types.furniture} value={formData.furniture} onChangeHandler={onChange} />

                        <SelectField elementId='offer-heating' labelText='Heating' name='heating' options={types.heating} value={formData.heating} onChangeHandler={onChange} />

                        <SelectField elementId='offer-broker' labelText='Broker' name='broker' options={brokers} hasOptionId={true} value={formData.broker.id} onChangeHandler={onChange} />

                        <InputField elementId='offer-address' labelText='Address' inputType='text' name='address' value={formData.address} onChanegeHandler={onChange} />

                        <InputField elementId='offer-price' labelText='Price' inputType='number' name='price' value={formData.price} onChanegeHandler={onChange} />

                        <InputField elementId='offer-area' labelText='Area in ㎡' inputType='number' name='area' value={formData.area} onChanegeHandler={onChange} />

                        <InputField elementId='offer-rooms' labelText='Total Rooms' inputType='number' name='rooms' value={formData.rooms} onChanegeHandler={onChange} />

                        <InputField elementId='offer-bedrooms' labelText='Bedrooms' inputType='number' name='bedrooms' value={formData.bedrooms} onChanegeHandler={onChange} />

                        <InputField elementId='offer-terraces' labelText='Terraces' inputType='number' name='terraces' value={formData.terraces} onChanegeHandler={onChange} />

                        <InputField elementId='offer-floor' labelText='Floor' inputType='number' name='floor' value={formData.floor} onChanegeHandler={onChange} />

                        <InputField elementId='offer-total-floors' labelText='Total Floors' inputType='number' name='totalFloors' value={formData.totalFloors} onChanegeHandler={onChange} />

                        <InputField elementId='offer-owner-phone' labelText='Owner phone' inputType='text' name='ownerPhone' value={formData.ownerPhone} onChanegeHandler={onChange} />

                        <InputField elementId='offer-elevator' labelText='Has Elevator' inputType='checkbox' name='hasElevator' value={formData.hasElevator} onChanegeHandler={onChangeCheckbox} />

                        <InputField elementId='offer-parking' labelText='Has Parking place' inputType='checkbox' name='hasParkingPlace' value={formData.hasParkingPlace} onChanegeHandler={onChangeCheckbox} />

                        <Textarea elementId='offer-desc' labelText='Description' name='description' value={formData.description} onChangeHandler={onChange} />

                        <InputField elementId='offer-images' labelText='Images' inputType='file' name='images' isMultiple={true} onChanegeHandler={onChangeFileInput}/>

                        <button className={styles.btnSubmit}>Update Offer</button>
                    </form>}

            </div>
        </section>
    )
}