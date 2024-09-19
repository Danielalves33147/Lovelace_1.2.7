import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import styles from './Activity.module.css';

function Activity() {
    const { id } = useParams();
    const [activity, setActivity] = useState();

    useEffect(() => {
        fetch(`http://localhost:4000/activities/${id}`)
            .then((response) => response.json())
            .then((data) => setActivity(data))
            .catch((err) => console.log(err));
    }, [id]);

    const copiarCodigo = () => {
        const codigoElement = document.getElementById('codigo');
        const codigoTexto = codigoElement.innerText;

        navigator.clipboard.writeText(codigoTexto)
    };

    if (!activity) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.envelope}>
            <div className={styles.return_box}>
                <Link className={styles.return} to='/Lovelace_1.2.4/tool'>Voltar</Link>
            </div>
            <div className={styles.card}>
                <h1>{activity.name}</h1>
                <h2>{activity.description}</h2>
                <ul>
                    {activity.questions.map((question) => (
                        <li key={question.id}>
                            <pre>{question.text}</pre>
                        </li>
                    ))}
                </ul>
                <div className={styles.code_box}>
                    <div className={styles.code_text}>
                        <h3>Código de Acesso: {activity.accessCode}</h3>
                    </div>
                    <button onClick={copiarCodigo} className={styles.copyButton}>
                        <FontAwesomeIcon className={styles.copy} icon={faCopy} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Activity;
