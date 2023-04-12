import { useContext, useState } from 'react';
import styles from './Offers.module.css';
import { OfferCard } from './offer-card/OfferCard';
import { OfferContext } from '../../contexts/OfferContext';

export const Offers = () => {
    const {offers} = useContext(OfferContext);

    return (
        <section className={styles.topOffers}>
            <h2 className={styles.topOffersHeading}>Top Offers</h2>
            <div className={styles.topOffersContainer}>
                {offers.map(x => <OfferCard key={x.id} offer={x}/>)}
            </div>
        </section>
    )
}