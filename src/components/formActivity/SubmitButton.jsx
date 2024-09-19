/* eslint-disable react/prop-types */
import styles from './SubmitButton.module.css'

function SubmitButton({ text }) {
    return (
        <button className={styles.btn} type="submit">
            {text}
        </button>
    );
}

export default SubmitButton;
