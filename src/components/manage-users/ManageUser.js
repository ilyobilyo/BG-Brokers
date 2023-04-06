import { UserCard } from "./user-card/UserCard"
import styles from './ManageUsers.module.css'
import { useEffect, useState } from "react"
import * as userService from '../../services/userService';

export const ManageUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        userService.getAllUsers()
            .then(data => {
                setUsers(data);
            })
    }, [])

    return (
        <section>
            <div className={styles.manageUsersContent}>
                <h1>Manage users</h1>
                {users.length === 0
                    ? <p>Loading...</p>
                    : <div className={styles.cardWrapper}>
                        {users.map(x => <UserCard key={x.id} user={x}/>)}
                    </div>
                }

            </div>
        </section>

    )
}