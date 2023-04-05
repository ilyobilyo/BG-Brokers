import styles from '../CreateOffer.module.css'

export const Textarea = ({elementId, labelText, name, onChangeHandler}) => {
    return (
        <div className={`${styles.inputWrapper} ${styles.descInput}`}>
            <label htmlFor="offer-desc">Description</label>
            <textarea
                name="description"
                id="offer-desc"
                cols={75}
                rows={5}
                defaultValue={""}
                onChange={onChangeHandler}
            />
        </div>
    )
}