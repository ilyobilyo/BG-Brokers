import { useContext, useEffect, useState } from 'react';
import styles from './MyProfile.module.css';
import { AuthContext } from '../../contexts/AuthContext';
import * as offerService from '../../services/offerService';
import { UserOffer } from './user-offer/UserOffer';
import { ImageModal } from '../image-modal/ImageModal';
import { Link, useNavigate } from 'react-router-dom';
import { OfferContext } from '../../contexts/OfferContext';

export const MyProfile = () => {
    const { user } = useContext(AuthContext);
    const {deleteOfferFromState, offers} = useContext(OfferContext);
    const navigate = useNavigate();

    const [userOffers, setUserOffers] = useState([]);
    const [isModalOpen, setIsOpen] = useState(false);

    useEffect(() => {
        offerService.getUserOffers(user.id)
            .then(data => {
                setUserOffers(data);
            })
    }, [offers])


    const deleteHandler = (offer) => {

        if (window.confirm('Are you sure you want to delete the offer?') == true) {
            offerService.deleteOffer(offer)
                .then(() => {
                    deleteOfferFromState(offer.id);
                    setUserOffers(state => userOffers.filter(x => x.id !== offer.id))
                    navigate('/MyProfile');
                })
        }
    }

    const toggleModal = () => {
        setIsOpen(!isModalOpen);
    };

    return (
        <div className={styles.background}>
            {isModalOpen ? <ImageModal img={user.img} close={toggleModal} />
                :
                <section className={styles.profileSection}>
                    <div className={styles.container}>
                        <h1>My Profile</h1>
                        <div className={styles.imageSection}>
                            <div className={styles.imageContainer}>
                                <img id='userPic' src={user.img} alt="userImage" onClick={toggleModal} />
                            </div>
                            <Link className={styles.editBtn} to={`/editUser/${user.id}`}>
                                <i className="fas fa-user-edit"></i> Edit Info
                            </Link>
                        </div>
                        <div className={styles.userInfo}>
                            <div className={styles.info}>
                                <label><i className="fas fa-id-card" /> First name</label>
                                <p>{user.firstName}</p>
                            </div>
                            <div className={styles.info}>
                                <label><i className="fas fa-id-card" /> Last name</label>
                                <p>{user.lastName}</p>
                            </div>
                            <div className={styles.info}>
                                <label><i className="fas fa-envelope" /> Email</label>
                                <p>{user.email}</p>
                            </div>
                            <div className={styles.info}>
                                <label><i className="fas fa-city" /> Town</label>
                                <p>{user.town}</p>
                            </div>
                            <div className={styles.info}>
                                <label><i className="fas fa-phone" /> PhoneNumber</label>
                                <p>{user.phoneNumber}</p>
                            </div>
                            <div className={styles.info}>
                                <label><i className="fas fa-user-shield" /> Roles</label>
                                <div className={styles.role}>
                                    {user.roles.map(x => <p >{x}</p>)}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.myOffers}>
                        <h1>My Offers</h1>
                        <div className={styles.wrapper}>
                            {userOffers.length === 0
                                ? <p>Loading ...</p>
                                : userOffers.map(x => <UserOffer offer={x} deleteHandler={deleteHandler}/>)}
                        </div>
                    </div>
                </section>
            }
        </div>


    )
}