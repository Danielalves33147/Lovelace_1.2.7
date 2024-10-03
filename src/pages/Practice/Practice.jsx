import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import styles from './Practice.module.css'

export default function Practice() {

  const navigate = useNavigate();


  const [practiceText, setPracticeText] = useState([]);
  const [currentText, setCurrentText] = useState("");
  const [timer, setTimer] = useState(0);
  const [timerStatus, setTimerStatus] = useState('stop');
  const [score, setScore] = useState(0);
  const [rank, setRank] = useState('');
  const timerRef = useRef(null);
  const inputRef = useRef(null);


  function saveResult() {
    const printableArea = document.getElementById("resultContainer");

    // Verifica se o elemento existe
    if (!printableArea) {
        console.error("Element with id 'resultContainer' not found");
        return;
    }

    const printableContent = printableArea.innerHTML;
    

        // Seleciona os botões e oculta-os
        const saveButton = document.querySelector(`.${styles.save}`);
        const dontSaveButton = document.querySelector(`.${styles.dontSavePdf}`);
        
        saveButton.style.display = 'none';
        dontSaveButton.style.display = 'none';
    
        const estilo = `
        <style>
            * {
                font-family: 'Noto Sans', sans-serif;
                box-sizing: border-box;
                font-size: 16px;
            }
            .modal {
                padding: 72px;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                gap: 16px;
                position: relative;
                text-align: center; /* Adicionado para centralizar o texto */
            }
            .resultContainer {
                width: 100%;
                font: 25px Calibri;
            }
            .resultContainer, th, td {
                border: solid 2px #888;
                border-collapse: collapse;
                padding: 4px 8px;
                text-align: center;
            }
            .save, .dontSavePdf {
                display: hidden;
            }
            footer {
                border-top: 1px solid #141115;
                text-align: center; /* Alinhamento centralizado do texto */
            }
            footer p span {
                color: #141115;
                font-weight: 700;
            }
            .paragraphmodal {
                display: none; /* Isso esconderá a pergunta sobre salvar o resultado no PDF */
            }
        </style>
    `;

    const footer = `
        <footer>
            <p>Desenvolvido por <span>Daniel de Santana</span>,<span> Marcos Emanuel </span> e <span> Melkysedeke Costa</span>.</p>
            <span class="divider"></span>
            <p>Orientado pela <span>Prof. Dr. Lenade Barreto</span>.</p>
        </footer>
    `;

    const pdfWindow = window.open("", "_blank");
    pdfWindow.document.open();
    pdfWindow.document.write(`
        <html>
            <head>
                <title>Lovelace - PDF</title>
                ${estilo}
            </head>
            <body>
                ${printableContent}
                ${footer}
            </body>
        </html>
    `);
    pdfWindow.document.close();
    pdfWindow.print();

    if (saveButton) saveButton.style.display = 'inline-block';
    if (dontSaveButton) dontSaveButton.style.display = 'inline-block';

}


function dontSavePdf() {
    const resContainer = document.getElementById("resultContainer");
    resContainer.classList.remove("show"); // Remove a classe 'show' para esconder o modal

    Swal.fire({
        title: 'Resultado não salvo!',
        text: 'Você decidiu não salvar o PDF.',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Continuar a atividade',
        cancelButtonText: 'Voltar à página inicial'
    }).then((result) => {
        if (result) {
            // Se o usuário quiser continuar, recarregue a página
            window.location.reload(); // Recarregar a página
        } else {
            // Caso contrário, navegue para a página inicial
            navigate('/Lovelace_1.2.4/tool');
        }
    });
}



  useEffect(() => {
    fetch('/content.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao carregar o JSON');
        }
        return response.json();
      })
      .then(data => {
        if (data && data.texts && data.texts.length > 0) {
          setPracticeText(data.texts);
          changeText(data.texts);
        }
      })
      .catch(error => console.error('Erro ao carregar o JSON:', error));
  }, []);

  useEffect(() => {
    let interval;
    if (timerStatus === 'play') {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    } else if (timerStatus === 'stop' && timer !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerStatus, timer]);

  function start() {
    setTimerStatus('play');
  }

  function stop() {
    setTimerStatus('stop');
  }

  function clearTimer() {
    setTimer(0);
  }

  function changeText(texts) {
    stop();
    clearTimer();
    const randomIndex = Math.floor(Math.random() * texts.length);
    setCurrentText(texts[randomIndex].paragraph);
    start();
  }

  function ainda_nao(){

    const resContainer = document.getElementById("resultContainer");
    resContainer.style.display="none";

    Swal.fire({
      title: 'Estamos trabalhando nisso!',
      html: 'Por favor, aguarde...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
        
        // Fecha o alerta após 3 segundos (3000 milissegundos)
        setTimeout(() => {
          Swal.close();
          window.location.reload(); // Recarregar a página
        }, 3000);
      }
    });
    
    
    
  }

  function testShow() {
    const resultContainer = document.getElementById("resultContainer");
    resultContainer.classList.toggle("show"); // Alternar a classe para testar
}

  function sendAnswers() {
    stop();
    const answerContainer = inputRef.current.value.toLowerCase();

    // console.log("Respostas : ",answerContainer);

    if (!answerContainer) {
      Swal.fire({
        text: 'Preencha todos os Campos',
        title: 'Opa!!',
        icon: 'warning',
        background: 'white',
        iconColor: '#F21B3F'
      });
      return;
    }

    calc(answerContainer);
    
    const resultContainer = document.getElementById("resultContainer");

    if (resultContainer) { 
      // document.getElementById("resultContainer").classList.add("show");
      resultContainer.style.display="flex";
      console.log("Pós Classe Show ",answerContainer);
    } else {
      console.log("Respostas chegaram aqui: ",answerContainer);
    }
  }

  function calc(answer) {
    
    const minTime = 75;
    let sec = timer;
    const respostas = [
      ["dia", "gostos", "autor"],
      ["viagem", "ferias", "frança", "visitas", "turísticos"],
      ["vida", "importância", "familia"],
      ["importância", "seus", "sonhos", "paixões"],
      ["Sempre", "enfrentar", "seus", "medos"],
      ["importante", "equilíbrio", "paixões", "felicidade", "interesses"],
      ["facilidade", "instalação", "versatilidade", "VS Code", "código"],
      ["contribuições", "positivas", "preocupações", "negativas", "equilíbrio"],
      ["importancia", "programação", "habilidade", "crucial"],
      ["Avanços", "tecnologicos", "Elon Musk"],
      ["Ponteiros", "C", "acessar", "manipular", "dados", "memória"],
      ["Como", "funciona", "banco de dados"],
      ["O que", "é", "eletromecanica"],
      ["O que", "é", "como", "funciona", "CHATGPT"],
      ["O que", "é", "como", "funciona", "CHATGPT"],
      ["O que", "é", "como", "funciona", "CHATGPT"]
    ];

    const currentTextIndex = practiceText.findIndex(text => text.paragraph === currentText);
    if (currentTextIndex === -1) return;

    const palavrasChave = respostas[currentTextIndex] || [];
    let palavra_acertada = 0;

    palavrasChave.forEach(palavra => {
      if (answer.includes(palavra)) {
        palavra_acertada++;
      }
    });

    const pontosPorPalavra = 100 / palavrasChave.length;
    const acertos = pontosPorPalavra * palavra_acertada;
    let decress = 0;

    if (sec > minTime) {
      const deCont = sec - minTime;
      decress = (deCont / 30) * 10;
    }

    let finalScore = acertos - decress;
    if (finalScore < 0) {
      finalScore = 0; // Define a pontuação mínima como zero
    }
    setScore(finalScore);

    if (finalScore <= 0) {
      setRank("Bad");
    } else if (finalScore <= 34) {
      setRank("Beginner");
    } else if (finalScore <= 68) {
      setRank("Intermediary");
    } else {
      setRank("Advanced");
    }
    console.log("PONTUAÇÃO",finalScore);
    
  }

  return (
    <div>
      <header className={styles.loveLog}>
        <h1>Lovelace</h1>
      </header>
      <div className={styles.temporizador}>
        <h3 className={styles.timer}>{new Date(timer * 1000).toISOString().substr(11, 8)}</h3>
      </div>
      <section className={styles.textContainer}>
        <div className={styles.containerContent}>
          <p>{currentText}</p>
        </div>
        <input id="submitAnswer" className={styles.submitAnswer} type="text" ref={inputRef} placeholder="As palavras chave do texto são..." required />
        <div className={styles.answerButtons}>
          <button className={styles.sendAnswer} onClick={sendAnswers}>Enviar resposta</button>
          <button className={styles.changeText} onClick={() => changeText(practiceText)}>Mudar texto</button>
        </div>
      </section>
      <footer>
        <p>Desenvolvido por <span>Daniel de Santana</span>,<span> Marcos Emanuel </span> e <span> Melkysedeke Costa</span>.</p>
        <span className={styles.divider}></span>
        <p>Orientado pela <span>Prof. Dr. Lenade Barreto</span>.</p>
      </footer>
      <section id="resultContainer" className={`${styles.resultContainer}`}>
        <div className={styles.modal}> 
          <h1>Resultado</h1>
          <div className={styles.scoreContainer}>
            <h2 className={styles.scoreTitle}><span className={styles.score}>{Math.round(score)}</span>/100</h2>
          </div>
          <p className={styles.usuario}>Usuario: <span className={styles.login}>admin</span></p>
          <p className={styles.modalParagraph}>Seu nível: <span className={styles.level}>{rank}</span></p>
          <p className={styles.Text}>Texto Lido: <span className={styles.txt}>{practiceText.find(text => text.paragraph === currentText)?.textTitle}</span></p>
          <p className={styles.temp}>Tempo: <span className={styles.time}>{new Date(timer * 1000).toISOString().substr(11, 8)}</span></p>
      
          <p className={styles.paragraphmodal}>Deseja salvar o resultado em um PDF?</p>
          <div className={styles.resultButtons}>
            <button className={styles.save} onClick={ainda_nao}>Quero!</button>
            <button className={styles.dontSavePdf} onClick={dontSavePdf}>Não quero</button>
          </div>
        </div>
      </section>
    </div>
  );
}
