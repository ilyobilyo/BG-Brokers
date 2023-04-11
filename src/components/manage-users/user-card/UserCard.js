import styles from './UserCard.module.css'

export const UserCard = ({user}) => {
    return (
        <div className={styles.cardContiner}>
            <div className={styles.userImageContainer}>
                <img src={user.img} alt="UserImg" />
            </div>
            <div className={styles.userInfo}>
                <div className={styles.infoContainer}>
                    <label>
                        <i className="fas fa-user" /> User Full name:
                    </label>
                    <p>{user.name}</p>
                </div>
                <div className={styles.infoContainer}>
                    <label>
                        <i className="fas fa-envelope" /> User Email:
                    </label>
                    <p>{user.email}</p>
                </div>
                <div className={styles.infoContainer}>
                    <label>
                        <i className="fas fa-phone" /> User Phone number:
                    </label>
                    <p>{user.phoneNumber}</p>
                </div>
                <div className={styles.infoContainer}>
                    <label>
                        <i className="fas fa-user-shield" /> User Roles:
                    </label>
                    <p>{user.roles.join(', ')}</p>
                </div>
                <div className={styles.infoContainer}>
                    <label>
                        <i className="fas fa-city" /> User Town:
                    </label>
                    <p>{user.town}</p>
                </div>
            </div>
            <div className={styles.actions}>
                <button className={styles.edit}>
                    <i className="fas fa-user-edit" /> Edit
                </button>
                <button className={styles.remove}>
                    <i className="fas fa-user-slash" /> Delete
                </button>
            </div>
        </div>
    )
}