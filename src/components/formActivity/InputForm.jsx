/* eslint-disable react/prop-types */
import styles from './InputForm.module.css'

function InputForm({ type, name, placeholder, value, handleOnChange, required}) {
    return (
        <>
            <input className={styles.input}
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={handleOnChange}
                required={required}
            />
        </>
    );
}

export default InputForm;
