import styles from './UserCard.module.css'

export const UserCard = () => {
    return (
        <div className={styles.cardContiner}>
            <div className={styles.userImageContainer}>
                <img src="./img/bedroom.jpg" alt="UserImg" />
            </div>
            <div className={styles.userInfo}>
                <div className={styles.infoContainer}>
                    <label>
                        <i className="fas fa-user" /> User Full name:
                    </label>
                    <p>Iliyan Iliev</p>
                </div>
                <div className={styles.infoContainer}>
                    <label>
                        <i className="fas fa-envelope" /> User Email:
                    </label>
                    <p>ilito@abv.bg</p>
                </div>
                <div className={styles.infoContainer}>
                    <label>
                        <i className="fas fa-phone" /> User Phone number:
                    </label>
                    <p>0895462156</p>
                </div>
                <div className={styles.infoContainer}>
                    <label>
                        <i className="fas fa-user-shield" /> User Roles:
                    </label>
                    <p>Broker, Admin</p>
                </div>
                <div className={styles.infoContainer}>
                    <label>
                        <i className="fas fa-city" /> User Town:
                    </label>
                    <p>Varna</p>
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