import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import exemplo from "../../assets/Example.svg";
import github from "../../assets/github.svg";
import link from "../../assets/link.svg";
import figma from "../../assets/figma.svg";
import styles from './Tool.module.css'

import Swal from 'sweetalert2';

export default function Tool() {

    const navigate = useNavigate();

    function pratica(){
        Swal.fire({
            title: 'Iniciar Atividades?',
            text: "Voce pode acessar uma pre definida ou criar uma sala personalizada, o que deseja?",
            icon: 'warning',
            iconColor: '#F21B3F',
            background: 'white',
            showCancelButton: true,
            confirmButtonColor: '#F21B3F',
            border: 'none',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Pré-definida',
            cancelButtonText: 'Personalizada'
          }).then((result) => {
            if (result.isConfirmed) {
              navigate('/Lovelace_1.2.4/practice');
            } else {
                Swal.fire({
                    title: 'Iniciando Atividade!',
                    text: "Voce pode criar uma sala, ou entrar em uma já existente!",
                    icon: 'warning',
                    iconColor: '#F21B3F',
                    background: 'white',
                    showCancelButton: true,
                    confirmButtonColor: '#F21B3F',
                    border: 'none',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Criar Sala',
                    cancelButtonText: 'Entrar'
                }).then((result) => {
                if (result.isConfirmed) {
                navigate('/Lovelace_1.2.4/createactivity');
                } else {
                navigate('/Lovelace_1.2.4/accesscode');
                }
                })
            }
          })
    }

  return ( 
    <>
        <header className={styles.loveLog}>
            <h1>Lovelace</h1>
        </header>
        <section className={styles.mainContent}>
            <h1>Seja bem-vindo ao <span>Lovelace</span></h1>
            <p>Uma ferramenta para que você possa praticar a sua leitura e melhorar ainda mais a forma com que você lida com palavras que você não conhece!</p>
        </section>
        <div className={styles.tudo}>
            <div className={styles.direita}>
                <section className={styles.exampleSection}>
                    <h2>Como funciona?</h2>
                    <p>Um contador para o tempo de leitura e uma pergunta para responder! Simples e prático.</p>
                    <p>Basta ler o texto e dar as palavras chave, você pontuará a medida que acertar as palavras chave e levar menos tempo para ler!</p>
                    <p>Ou crie uma sala personalizada, com suas proprias perguntas, textos e respostas! Tudo depende da dua criatividade!</p>
                </section>

                <section className={styles.interactButtons}>
                    <a onClick= {pratica} className={styles.startPractice}>COMECE A PRATICAR</a>
                    <a href="https://www.gutenberg.org/" target="_blank" className={styles.seeBooks}>E-BOOKS GRATUITOS EM INGLÊS</a>
                </section>
            
            </div>
            <div className={styles.esquerda}>
                <section className={styles.exampleSection2}>
                <img src={exemplo} alt="Exemplo de ATV" title="exemplo de atv"/>
                </section>
            </div>
        </div>

        <section className={styles.socialButtons}>
            <a href="https://github.com/devmarquinhos/Lovelace" target="_blank"><img src={github} alt="Github"/></a>
            <a href="https://linktr.ee/lovelacedevs"><img src={link} alt="Link"/></a>
            <a href="https://www.figma.com/file/Ej7N8rlsG69xa393ALhbnW/Voltaire?node-id=0%3A1&t=UJtTMR0yc0eKyPoZ-1" target="_blank"><img src={figma} alt="Figma"/></a>
        </section>

        <footer>
            <p>Desenvolvido por <span>Daniel de Santana</span>,<span> Marcos Emanuel </span> e <span> Melkysedeke Costa</span>.</p>
            <span className={styles.divider}></span>
            <p>Orientado pela <span>Prof. Dr. Lenade Barreto</span>.</p>
        </footer>
    </>
 );
}
