import { useContext, useEffect, useState } from 'react'
import styles from './OfferModal.module.css'
import { OfferContext } from '../../contexts/OfferContext'
import { useParams } from 'react-router-dom';
import { ImageElement } from './image-element/ImageElement';

export const OfferModal = () => {
    const { offers } = useContext(OfferContext);
    const { offerId } = useParams();

    const [offer, setOffer] = useState({});
    const [isLoading, setIsloading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        // Add a delay to allow the animation to complete before resetting the isAnimating state
        const timeoutId = setTimeout(() => {
          setIsAnimating(false);
        }, 300);
        return () => clearTimeout(timeoutId);
      }, [currentIndex]);

    const handleNext = () => {
        setIsAnimating(true);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % offer.images.length);
    };

    const handlePrev = () => {
        setIsAnimating(true);
        setCurrentIndex((prevIndex) => (prevIndex - 1 + offer.images.length) % offer.images.length);
    };

    const handleClickOnCertainImage = (index) => {
        setCurrentIndex(currentIndex + index)
    }

    useEffect(() => {
        setOffer(offers.find(x => x.id == offerId))
        setIsloading(false);
    }, [])

    return (
        isLoading
            ? <p>Loading ...</p>
            :
            <section id="offerModal" className={styles.modal}>
                <div className={styles.modalOfferContent}>
                    <div className={styles.heading}>
                        <h1>{offer.title}</h1>
                        <h2>{offer.price} lv</h2>
                    </div>
                    <div className={styles.contentWrapper}>
                        <div className={styles.imageSection}>
                            <div className={styles.mainImg}>
                                <img src={offer.images[currentIndex]} alt="" />
                            </div>
                            <div className={styles.imagesContainer} style={{
                                transform: `translateX(-${currentIndex * 25}%)`,
                                transition: isAnimating ? 'transform 0.3s ease-in-out' : 'none'
                            }}>
                                {offer.images.map((x, i) => <ImageElement key={i} src={x} index={i} onClickHandler={handleClickOnCertainImage} />)}
                            </div>
                            <button onClick={handlePrev} >Prev</button>
                            <button onClick={handleNext}>Next</button>
                        </div>
                        <div className={styles.offerInfo}>
                            <ul className={styles.infoList}>
                                <li>
                                    <i className="fas fa-building" /> Offer Type: <span>{offer.offerType}</span>
                                </li>
                                <li>
                                    <i className="fas fa-city" /> Town: <span>{offer.town} | {offer.hood}</span>
                                </li>
                                <li>
                                    <i className="fas fa-map-marker-alt" /> Address:
                                    <span>{offer.address}</span>
                                </li>
                                {offer.rooms &&
                                    <li>
                                        <i className="fas fa-home" /> Rooms: <span>{offer.rooms}</span>
                                    </li>
                                }
                                {offer.bedrooms &&
                                    <li>
                                        <i className="fas fa-bed" /> Bedrooms: <span>{offer.bedrooms}</span>
                                    </li>
                                }
                                {offer.floor &&
                                    <li>
                                        <i className="fas fa-layer-group" /> Floor: <span>{offer.floor}</span>
                                    </li>
                                }
                                <li>
                                    <i className="fas fa-ruler-combined" /> Area: <span>{offer.area} ㎡</span>
                                </li>
                                {offer.construction &&
                                    <li>
                                        <i className="fas fa-tools" /> Construction: <span>{offer.construction}</span>
                                    </li>
                                }
                                {offer.furniture &&
                                    <li>
                                        <i className="fas fa-couch" /> Furniture: <span>{offer.furniture}</span>
                                    </li>
                                }
                                {offer.heating &&
                                    <li>
                                        <i className="fas fa-temperature-high" /> Heating: <span>{offer.heating}</span>
                                    </li>
                                }
                                <li>
                                    <i className="fas fa-users" />
                                    <i className="fas fa-arrows-alt-v" /> Has Elevator:
                                    {offer.hasElevator ? <span>Yes</span> : <span>No</span>}
                                </li>
                                <li>
                                    <i className="fas fa-parking" /> Has Parking place: {offer.hasParkingPlace ? <span>Yes</span> : <span>No</span>}
                                </li>
                            </ul>
                            <div className={styles.desc}>
                                <label>
                                    <i className="fas fa-info-circle" /> Offer Description
                                </label>
                                <p>{offer.description}</p>
                            </div>
                            <div className={styles.contacts}>
                                <div className={styles.broker}>
                                    <label>Broker: {offer.broker.name}</label>
                                    <p className={styles.contact}>
                                        <i className="fas fa-phone" /> {offer.broker.phoneNumber}
                                    </p>
                                </div>
                                {offer.ownerPhone &&
                                    <div className={styles.owner}>
                                        <label>Owner: </label>
                                        <p className={styles.contact}>
                                            <i className="fas fa-phone" /> {offer.ownerPhone}
                                        </p>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
    )
}