import styles from './ImageModal.module.css'

export const ImageModal = ({ img, close }) => {
    return (
        <div className={styles.modal}>
            <div className={styles.content}>
                <p className={styles.close} onClick={close}>X</p>
                <img src={img} alt="" />
            </div>
        </div>
    )
}