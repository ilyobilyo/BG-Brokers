import styles from './AboutUs.module.css'

export const AboutUs = () => {

    return (
        <>
            <section className={styles.heroAbout}>
                <h1 className={styles.title}>About Us</h1>
            </section>
            <section className={styles.mission}>
                <div className={styles.missionImg}>
                    <img
                        src='/images/mission.jpg'
                        alt="hel"
                    />
                </div>
                <div className={styles.missionInfo}>
                    <h2>Мисия</h2>
                    <p className={styles.info}>
                        Нашата мисия е да ви предложим широка гама от възможности за недвижими
                        имоти. От модерни апартаменти в градски райони до уютни къщи на село и
                        луксозни вили на морския бряг. Специализираме се и в комерсиалните
                        имоти, предлагайки офиси, магазини и складови помещения. Ние сме
                        посветени на предоставянето на качествена услуга и изключително внимание
                        към нашите клиенти. Нашите опитни агенти са тук, за да ви съдействат
                        през целия процес на търсене, преговори и сключване на сделка.
                    </p>
                </div>
            </section>
            <section className={styles.team}>
                <h2>Екип</h2>
                <div className={styles.cardWrapper}>
                    <article className={styles.card}>
                        <div className={styles.cardContiner}>
                            <div className={styles.userImageContainer}>
                                <img src="./img/bedroom.jpg" alt="UserImg" />
                            </div>
                            <div className={styles.userInfo}>
                                <div className={`${styles.infoContainer} ${styles.role}`}>
                                    <label>
                                        <i className="fas fa-user-tie" />
                                    </label>
                                    <p className="name">Iliyan Iliev, CTO</p>
                                </div>
                                <div className="infoContainer">
                                    <label>
                                        <i className="fas fa-envelope" />
                                    </label>
                                    <p className="email">ilito@abv.bg</p>
                                </div>
                                <div className="infoContainer">
                                    <label>
                                        <i className="fas fa-phone" />
                                    </label>
                                    <p className="phone">0895462156</p>
                                </div>
                            </div>
                        </div>
                    </article>
                    <article className={styles.card}>
                        <div className={styles.cardContiner}>
                            <div className={styles.userImageContainer}>
                                <img src="./img/bedroom.jpg" alt="UserImg" />
                            </div>
                            <div className={styles.userInfo}>
                                <div className={`${styles.infoContainer} ${styles.role}`}>
                                    <label>
                                        <i className="fas fa-user-tie" />
                                    </label>
                                    <p className="name">Iliyan Iliev, Broker</p>
                                </div>
                                <div className="infoContainer">
                                    <label>
                                        <i className="fas fa-envelope" />
                                    </label>
                                    <p className="email">ilito@abv.bg</p>
                                </div>
                                <div className="infoContainer">
                                    <label>
                                        <i className="fas fa-phone" />
                                    </label>
                                    <p className="phone">0895462156</p>
                                </div>
                            </div>
                        </div>
                    </article>
                    <article className={styles.card}>
                        <div className={styles.cardContiner}>
                            <div className={styles.userImageContainer}>
                                <img src="./img/bedroom.jpg" alt="UserImg" />
                            </div>
                            <div className={styles.userInfo}>
                                <div className="infoContainer">
                                    <label>
                                        <i className="fas fa-user-tie" />
                                    </label>
                                    <p className="name">Iliyan Iliev, Sales</p>
                                </div>
                                <div className="infoContainer">
                                    <label>
                                        <i className="fas fa-envelope" />
                                    </label>
                                    <p className="email">ilito@abv.bg</p>
                                </div>
                                <div className="infoContainer">
                                    <label>
                                        <i className="fas fa-phone" />
                                    </label>
                                    <p className="phone">0895462156</p>
                                </div>
                            </div>
                        </div>
                    </article>
                    <article className={styles.card}>
                        <div className={styles.cardContiner}>
                            <div className={styles.userImageContainer}>
                                <img src="./img/bedroom.jpg" alt="UserImg" />
                            </div>
                            <div className={styles.userInfo}>
                                <div className="infoContainer">
                                    <label>
                                        <i className="fas fa-user-tie" />
                                    </label>
                                    <p className="name">Iliyan Iliev, Broker</p>
                                </div>
                                <div className="infoContainer">
                                    <label>
                                        <i className="fas fa-envelope" />
                                    </label>
                                    <p className="email">ilito@abv.bg</p>
                                </div>
                                <div className="infoContainer">
                                    <label>
                                        <i className="fas fa-phone" />
                                    </label>
                                    <p className="phone">0895462156</p>
                                </div>
                            </div>
                        </div>
                    </article>
                    <article className={styles.card}>
                        <div className={styles.cardContiner}>
                            <div className={styles.userImageContainer}>
                                <img src="./img/bedroom.jpg" alt="UserImg" />
                            </div>
                            <div className={styles.userInfo}>
                                <div className="infoContainer">
                                    <label>
                                        <i className="fas fa-user-tie" />
                                    </label>
                                    <p className="name">Iliyan Iliev, Broker</p>
                                </div>
                                <div className="infoContainer">
                                    <label>
                                        <i className="fas fa-envelope" />
                                    </label>
                                    <p className="email">ilito@abv.bg</p>
                                </div>
                                <div className="infoContainer">
                                    <label>
                                        <i className="fas fa-phone" />
                                    </label>
                                    <p className="phone">0895462156</p>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            </section>
        </>

    )
}