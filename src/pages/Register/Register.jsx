import React, { useState, useEffect } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { Link, useNavigate } from 'react-router-dom';
import arrowImg from "../../assets/arrow.svg";
import { auth, db } from "../../services/firebaseConfig.js";  // Importando o Firestore
import { load_cad, sucess_cad, fail_cad } from "../../services/alert.js";
import { doc, setDoc } from "firebase/firestore";  // Funções do Firestore
import styles from './Register.module.css';

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");  // Adicionando estado para o nome

  const [createUserWithEmailAndPassword, userCredential, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const navigate = useNavigate();

  // Função para limpar os campos de input
  function clearFields() {
    setEmail("");
    setPassword("");
    setName("");  // Limpa o campo de nome
  }

  // Armazenar dados no localStorage
  useEffect(() => {
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    localStorage.setItem("name", name);  // Armazena o nome
  }, [email, password, name]);

  // Recuperar dados do localStorage
  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");
    const storedName = localStorage.getItem("name");  // Recupera o nome
    if (storedEmail && storedPassword && storedName) {
      setEmail(storedEmail);
      setPassword(storedPassword);
      setName(storedName);  // Define o nome
    }
  }, []);

  // Função para registrar o usuário e armazenar o nome no Firestore
  async function handleSignUp(e) {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      // Armazenar o nome no Firestore após o registro bem-sucedido
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email
      });

      sucess_cad();
      navigate('/Lovelace_1.2.4'); // Navega para a página de login
    } catch (error) {
      console.error("Erro ao registrar ou salvar no Firestore:", error);
      fail_cad();
    }
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Lovelace</h1>
        <span>Informações de Registro</span>
      </header>

      <form onSubmit={handleSignUp}>
        <div className={styles.inputContainer}>
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Digite seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="email">E-mail</label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="lovelace@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="********************"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className={styles.button} type="submit">
          Cadastrar <img src={arrowImg} alt="->" />
        </button>
        <div className={styles.footer}>
          <p>Você já tem uma conta?</p>
          <Link to="/Lovelace_1.2.4">Faça login aqui</Link>
        </div>
      </form>
    </div>
  );
}
