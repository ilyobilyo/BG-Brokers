import { useState } from 'react';
import styles from './Offers.module.css';
import { OfferCard } from './offer-card/OfferCard';

export const Offers = () => {
    const [offers, setOffers] = useState([
        {
            img: '../img/livingRoom.jpg',
            title: 'Offer Title',
            price: '500',
            town: 'Varna',
            hood: 'Centur',
            offerType: '2-staen',
            area: '62'
        },
        {
            img: './img/livingRoom.jpg',
            title: 'Offer Title',
            price: '500',
            town: 'Varna',
            hood: 'Centur',
            offerType: '2-staen',
            area: '62'
        },
        {
            img: './img/livingRoom.jpg',
            title: 'Offer Title',
            price: '500',
            town: 'Varna',
            hood: 'Centur',
            offerType: '2-staen',
            area: '62'
        },
        {
            img: './img/livingRoom.jpg',
            title: 'Offer Title',
            price: '500',
            town: 'Varna',
            hood: 'Centur',
            offerType: '2-staen',
            area: '62'
        },
        {
            img: './img/livingRoom.jpg',
            title: 'Offer Title',
            price: '500',
            town: 'Varna',
            hood: 'Centur',
            offerType: '2-staen',
            area: '62'
        },
        {
            img: './img/livingRoom.jpg',
            title: 'Offer Title',
            price: '500',
            town: 'Varna',
            hood: 'Centur',
            offerType: '2-staen',
            area: '62'
        },
        {
            img: './img/livingRoom.jpg',
            title: 'Offer Title',
            price: '500',
            town: 'Varna',
            hood: 'Centur',
            offerType: '2-staen',
            area: '62'
        },
        {
            img: './img/livingRoom.jpg',
            title: 'Offer Title',
            price: '500',
            town: 'Varna',
            hood: 'Centur',
            offerType: '2-staen',
            area: '62'
        },
        {
            img: './img/livingRoom.jpg',
            title: 'Offer Title',
            price: '500',
            town: 'Varna',
            hood: 'Centur',
            offerType: '2-staen',
            area: '62'
        },
    ])

    return (
        <section className={styles.topOffers}>
            <h2 className={styles.topOffersHeading}>Top Offers</h2>
            <div className={styles.topOffersContainer}>
                {offers.map(x => <OfferCard offer={x}/>)}
            </div>
        </section>
    )
}