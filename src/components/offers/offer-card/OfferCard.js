import { useLocation, useNavigate } from 'react-router-dom';
import styles from './OfferCard.module.css';


export const OfferCard = ({offer}) => {
    const navigate = useNavigate();
    const location = useLocation();

    const clickHandler = () => {
        navigate(`/offer/${offer.id}`, {state: { background: location }})
    }

    return (
        <article className={styles.card} onClick={clickHandler}>
            <div className={styles.imgContainer}>
                <img src={offer.images[0]} alt="offer-img" />
            </div>
            <div className={styles.cardInfo}>
                <h1 className={styles.cardTitle}>{offer.title}</h1>
                <p className={styles.price}>{offer.price} Lv.</p>
                <div className={styles.offerInfo}>
                    <div className={styles.location}>
                        <span className={styles.town}>
                            <i className="fas fa-map-marked-alt" /> {offer.town} | {offer.hood}
                        </span>
                    </div>
                    <p className={styles.offerType}>
                        <i className="far fa-building" /> {offer.offerType}
                    </p>
                    <p className={styles.area}>
                        <i className="fas fa-ruler-combined" /> {offer.area} ㎡
                    </p>
                </div>
            </div>
        </article>
    )
}