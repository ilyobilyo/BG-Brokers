import { UserCard } from "./user-card/UserCard"
import styles from './ManageUsers.module.css'

export const ManageUsers = () => {
    return (
        <section>
            <div className={styles.manageUsersContent}>
                <h1>Manage users</h1>
                <div className={styles.cardWrapper}>
                    <UserCard />
                    <UserCard />
                    <UserCard />
                    <UserCard />
                    <UserCard />
                    <UserCard />
                </div>
            </div>
        </section>

    )
}