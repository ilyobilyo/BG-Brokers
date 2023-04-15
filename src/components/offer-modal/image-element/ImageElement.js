import styles from '../OfferModal.module.css'


export const ImageElement = ({ src, onClickHandler, index }) => {
    const clickHanler = (e) => {
        onClickHandler(index)
    }

    return (
        <div className={styles.modalImg}  onClick={clickHanler}>
            <img src={src} alt="offer photo" />
        </div>
    )
}