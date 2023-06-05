import styles from './BrokerCard.module.css'

export const BrokerCard = ({ member }) => {

    return (
        <article className={styles.card}>
            <div className={styles.cardContainer}>
                <div className={styles.userImageContainer}>
                    <img src={member.img} alt="UserImg" />

                </div>
                <div className={styles.info}>
                    {member.resume &&
                        <div className={styles.resume}>
                            <p>{member.resume}</p>
                        </div>
                    }
                    <div className={styles.userInfo}>
                        <div className={`${styles.infoContainer} ${styles.role}`}>
                            <label>
                                <i className="fas fa-user-tie" />
                            </label>
                            <p className={styles.name}>{member.name}</p>
                        </div>
                        <div className={styles.infoContainer}>
                            <label>
                                <i className="fas fa-phone" />
                            </label>
                            <p className="phone">{member.phoneNumber}</p>
                        </div>
                        <div className={styles.infoContainer}>
                            <label>
                                <i className="fas fa-envelope" />
                            </label>
                            <p className="email">{member.email}</p>
                        </div>
                    </div>
                </div>

            </div>
        </article>
    )
}