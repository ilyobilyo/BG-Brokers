import { useContext, useEffect, useState } from 'react'
import styles from './OfferModal.module.css'
import { OfferContext } from '../../contexts/OfferContext'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { ImageElement } from './image-element/ImageElement';
import { AuthContext } from '../../contexts/AuthContext';
import * as offerService from '../../services/offerService';
import { TeamMemberCard } from '../about-us/team-member-card/TeamMemberCard';
import { BrokerCard } from './broker-card/BrokerCard';

export const OfferModal = () => {
    const { deleteOfferFromState } = useContext(OfferContext);
    const { isAuthenticated, user } = useContext(AuthContext);
    const { offerId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const [offer, setOffer] = useState(null);
    const [isLoading, setIsloading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setIsAnimating(false);
        }, 300);
        return () => clearTimeout(timeoutId);
    }, [currentIndex]);

    useEffect(() => {
        offerService.getOfferById(offerId)
            .then(data => {
                setOffer(state => data)
                setIsloading(false);
            })
    }, [])

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

    const deleteHandler = (e) => {
        e.preventDefault();

        if (window.confirm('Are you sure you want to delete the offer?') == true) {
            offerService.deleteOffer(offer)
                .then(() => {
                    deleteOfferFromState(offer.id);
                    navigate('/');
                })
        }
    }

    return (
        isLoading || !offer
            ? <p>Loading ...</p>
            :
            <section id="offerModal" className={styles.container}>
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
                                transform: `translateX(-${currentIndex * 255}px)`,
                                transition: isAnimating ? 'transform 0.3s ease-in-out' : 'none'
                            }}>
                                {offer.images.map((x, i) => <ImageElement key={i} src={x} index={i} onClickHandler={handleClickOnCertainImage} />)}
                            </div>
                            <div className={styles.buttons}>
                                <button className={styles.prev} onClick={handlePrev} >&#60; Prev</button>
                                <button className={styles.next} onClick={handleNext}>Next &#62;</button>
                            </div>
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
                                    <i className="fas fa-map-marker-alt" /> Address: <span>{offer.address}</span>
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
                                {offer.exposition &&
                                    <li>
                                        <i className="fas fa-temperature-high" /> Exposition: <span>{offer.exposition}</span>
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
                                <BrokerCard member={offer.broker} />
                            </div>
                            {isAuthenticated && (user.id === offer.broker.id || user.roles.includes('admin')) ?
                                <div className={styles.actions}>
                                    {location.pathname.includes('myProfile')
                                        ? <Link className={styles.edit} to={`/myProfile/edit/${offerId}`} state={{ background: location }}><i className="fas fa-edit"></i> Edit</Link>
                                        : <Link className={styles.edit} to={`/edit/${offerId}`} state={{ background: location }}><i className="fas fa-edit"></i> Edit</Link>
                                    }
                                    <Link className={styles.delete} onClick={deleteHandler} state={{ background: location }}><i className="fas fa-user-slash" /> Delete</Link>
                                </div>
                                : <></>
                            }
                        </div>
                    </div>
                </div>
            </section>
    )
}