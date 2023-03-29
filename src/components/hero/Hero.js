import { FilterForm } from "./filter-form/FilterForm";
import styles from './Hero.module.css';

export const Hero = () => {

    return (
        <section className={styles.hero}>
            <div className={styles.filterContainer}>
                <h2>Намерете своят мечтан дом</h2>
                <FilterForm />
            </div>
        </section>
    )
}