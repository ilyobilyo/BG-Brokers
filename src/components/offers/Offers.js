import { useContext, useEffect, useState } from 'react';
import styles from './Offers.module.css';
import { OfferCard } from './offer-card/OfferCard';
import { OfferContext } from '../../contexts/OfferContext';

export const Offers = () => {
    const { lastDoc, offers, getOffersForInfiniteScroll } = useContext(OfferContext);

    useEffect(() => {
        if (lastDoc) {
            window.addEventListener("scroll", handleScroll);
            console.log('pls');
        }

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [lastDoc]);

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
            console.log("dOCC", lastDoc);
            getOffersForInfiniteScroll(lastDoc, handleScroll)
        }
    };

    return (
        <section className={styles.topOffers}>
            <h2 className={styles.topOffersHeading}>Top Offers</h2>
            <div className={styles.topOffersContainer}>
                {offers &&
                    offers.map(x => <OfferCard key={x.id} offer={x} />)
                }
            </div>
        </section>
    )
}