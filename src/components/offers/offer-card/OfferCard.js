import styles from './OfferCard.module.css';


export const OfferCard = ({offer}) => {

    return (
        <article className={styles.card}>
            <div className={styles.imgContainer}>
                <img src='../../../images/livingRoom.jpg' alt="offer-img" />
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