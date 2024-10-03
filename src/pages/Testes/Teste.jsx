import React, { useState, useEffect } from "react";
import { useSignInWithEmailAndPassword, useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { Link, useNavigate } from 'react-router-dom';
import arrowImg from "../../assets/arrow.svg";
import { auth, db } from "../../services/firebaseConfig.js"; 
import { load_cad, sucess_cad, fail_cad, sucess, fail } from "../../services/alert.js"; 
import { doc, setDoc, getDoc } from "firebase/firestore";  
import styles from '../Testes/teste.module.css';

const LoginRegisterComponent = () => {
  const [isActive, setIsActive] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); 

  const [signInWithEmailAndPassword, userLogin, loadingLogin, errorLogin] = useSignInWithEmailAndPassword(auth);
  const [createUserWithEmailAndPassword, userRegister, loadingRegister, errorRegister] = useCreateUserWithEmailAndPassword(auth);

  const navigate = useNavigate();

  // Toggle functions
  const handleRegisterClick = () => {
    setIsActive(true);
  };

  const handleLoginClick = () => {
    setIsActive(false);
  };

  // Handle user registration
  async function handleSignUp(e) {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email
      });

      sucess_cad();
      navigate('/Lovelace_1.2.4'); 
    } catch (error) {
      console.error("Erro ao registrar ou salvar no Firestore:", error);
      fail_cad();
    }
  }

  // Handle user login
  async function handleSignIn(e) {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(email, password);
      if (userCredential) {
        const user = userCredential.user;
        const userName = await getUserNameFromFirestore(user.uid);
        console.log("Nome do usuário:", userName); 
        sucess();
        navigate('/Lovelace_1.2.4/tool');
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      fail();
    }
  }

  // Function to get user name from Firestore
  async function getUserNameFromFirestore(uid) {
    const userDoc = doc(db, "users", uid);
    const docSnap = await getDoc(userDoc);
    if (docSnap.exists()) {
      return docSnap.data().name;
    } else {
      console.log("Nenhum documento encontrado!");
      return null;
    }
  }

  return (
    <body className={styles.body_login}>
      <div className={`${styles.container} ${isActive ? styles.active : ""}`}>
        <div className={`${styles.form_container} ${styles.sign_up}`}>
          <form onSubmit={handleSignUp}>
            <h1>Criar Conta</h1>
            <div className={styles.social_icons}>
              <a href="#" className={styles.icon}><i className="fa-brands fa-google-plus-g"></i></a>
              <a href="#" className={styles.icon}><i className="fa-brands fa-facebook-f"></i></a>
              <a href="#" className={styles.icon}><i className="fa-brands fa-github"></i></a>
              <a href="#" className={styles.icon}><i className="fa-brands fa-linkedin-in"></i></a>
            </div>
            <span>ou use seu e-mail para registro</span>
            <input type="text" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button>Cadastrar <img src={arrowImg} alt="->" /></button>
          </form>
        </div>

        <div className={`${styles.form_container} ${styles.sign_in}`}>
          <form onSubmit={handleSignIn}>
            <h1>Entrar</h1>
            <div className={styles.social_icons}>
              <a href="#" className={styles.icon}><i className="fa-brands fa-google-plus-g"></i></a>
              <a href="#" className={styles.icon}><i className="fa-brands fa-facebook-f"></i></a>
              <a href="#" className={styles.icon}><i className="fa-brands fa-github"></i></a>
              <a href="#" className={styles.icon}><i className="fa-brands fa-linkedin-in"></i></a>
            </div>
            <span>ou use sua senha de e-mail</span>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
            <a href="#">Esqueceu sua senha?</a>
            <button>Entrar <img src={arrowImg} alt="->" /></button>
          </form>
        </div>

        <div className={styles.toggle_container}>
          <div className={styles.toggle}>
            <div className={`${styles.toggle_panel} ${styles.toggle_left}`}>
              <h1>Bem-vindo de Volta!</h1>
              <p>Digite seus dados pessoais para usar todos os recursos do site</p>
              <button className={styles.hidden} onClick={handleLoginClick}>Entrar</button>
            </div>
            <div className={`${styles.toggle_panel} ${styles.toggle_right}`}>
              <h1>Olá, Amigo!</h1>
              <p>Registre-se com seus dados pessoais para usar todos os recursos do site</p>
              <button className={styles.hidden} onClick={handleRegisterClick}>Cadastrar</button>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
};

export default LoginRegisterComponent;
