import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from '../MyProfile.module.css';

export const UserOffer = ({ offer, deleteHandler }) => {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <div className={styles.offer}>
            <div className={styles.offerImageContainer}>
                <img src={offer.images[0]} alt="" />
            </div>
            <div className={styles.offerInfo}>
                <p><i className="fas fa-tag"></i> {offer.title}</p>
                <p><i className="fas fa-city" /> {offer.town} | {offer.hood}</p>
                <p><i className='fas fa-money-bill-wave'></i> {offer.price} lv</p>
            </div>
            <div className={styles.actions}>
                <Link className={styles.view} to={`offer/${offer.id}`} state={{ background: location }}><i class="fas fa-info-circle"></i> View Offer</Link>
                <Link className={styles.edit} to={`/edit/${offer.id}`} state={{ background: location }}><i className="fas fa-edit"></i> Edit Offer</Link>
                <Link className={styles.delete} data-id={offer.id} onClick={(e) => {deleteHandler(offer)}} state={{ background: location }}><i className="fas fa-trash"></i> Delete Offer</Link>
            </div>
        </div>
    )
}