import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './BackButton.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

export default function BackButton(){
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1);
    };

    return (
        <button type='button' className={styles.btn} onClick={handleBackClick}>
            <FontAwesomeIcon className={styles.retorn_svg} icon={faChevronLeft} />
        </button>
    )
}