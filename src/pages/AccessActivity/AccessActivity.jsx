import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './AccessActivity.module.css'
import TextArea from '../../components/formActivity/TextArea'
import SubmitButton from '../../components/formActivity/SubmitButton';

function AccessActivity() {
    const { id } = useParams();
    const [activity, setActivity] = useState(null);
    const [responses, setResponses] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:4000/activities/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setActivity(data);
                setResponses(data.questions.map(question => ({
                    id: question.id,
                    text: ''
                })));
            })
            .catch((err) => console.log(err));
    }, [id]);

    const handleResponseChange = (questionId, value) => {
        const updatedResponses = responses.map(response => {
            if (response.id === questionId) {
                return { ...response, text: value };
            }
            return response;
        });
        setResponses(updatedResponses);
    };

    const submitResponses = (e) => {
        e.preventDefault();
        // Enviar respostas para o servidor ou processar de acordo
        console.log(responses);
    };

    if (!activity) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.card}>
            <div className={styles.return_box}>
                <Link className={styles.return} to='/Lovelace_1.2.4/tool'>Voltar</Link>
            </div>
            <div className={styles.header}>
                <h1>{activity.name}</h1>
                <p>{activity.description}</p>
            </div>
            <form onSubmit={submitResponses}>
                {activity.questions.map((question) => (
                    <div key={question.id} className={styles.question}>
                        <pre className={styles.question_text}>{question.text}</pre>
                        <TextArea className={styles.question_answer}
                            name="answer"
                            placeholder="Resposta"
                            value={responses.find(response => response.id === question.id)?.text || ''}
                            handleOnChange={(e) => handleResponseChange(question.id, e.target.value)}
                            required="required"
                        />
                    </div>
                ))}
                <SubmitButton text="Enviar Respostas" />
            </form>
        </div>
    );
}

export default AccessActivity;
