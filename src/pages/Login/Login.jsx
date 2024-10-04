import React, { useState, useEffect } from "react";
import { useSignInWithEmailAndPassword, useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { sendPasswordResetEmail } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from "../../services/firebaseConfig.js"; 
import { load_cad, sucess_cad, fail_cad, sucess, fail } from "../../services/alert.js"; 
import { doc, setDoc, getDoc } from "firebase/firestore";  
import { collection, query, where, getDocs } from "firebase/firestore";
import styles from '../Testes/teste.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

import Swal from 'sweetalert2';


const LoginRegisterComponent = () => {
  const [isActive, setIsActive] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); 

  const [signInWithEmailAndPassword, userLogin, loadingLogin, errorLogin] = useSignInWithEmailAndPassword(auth);
  const [createUserWithEmailAndPassword, userRegister, loadingRegister, errorRegister] = useCreateUserWithEmailAndPassword(auth);

  const navigate = useNavigate();

  function clearFields() {
    setEmail("");
    setPassword("");
    setName("");  // Limpa o campo de nome
  }
  // Toggle functions
  const handleRegisterClick = () => {
    setIsActive(true);
  };

  const handleLoginClick = () => {
    setIsActive(false);
  };

  
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    heightAuto: false, // Desativar a altura automática
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
    customClass: {
      popup: 'toast-custom', // Classe personalizada para o popup
    },
  });

  const showToastSuccess = (message) => {
    Toast.fire({
      icon: "success",
      title: message,
    });
  };
  
  const showToastError = (message) => {
    Toast.fire({
      icon: "error",
      title: message,
    });
  };
  
  function handleForgotPassword() {
    Swal.fire({
      title: "Esqueceu sua senha?",
      text: "Digite seu e-mail para redefinir a senha:",
      input: "email",
      inputPlaceholder: "lovelace@gmail.com",
      showCancelButton: true,
      confirmButtonText: "Enviar",
      confirmButtonColor:"#F21B3F",
      cancelButtonText: "Cancelar",
      customClass: {
        confirmButton: 'swal-button-confirm',
        cancelButton: 'swal-button-cancel'
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        const email = result.value;
  
        // Verifica se o e-mail existe no Firestore
        const userQuery = await getUserByEmail(email);
  
        if (userQuery) {
          // E-mail existe, enviar e-mail de redefinição de senha
          sendPasswordResetEmail(auth, email)
            .then(() => {
              showToastSuccess("Um e-mail de redefinição de senha foi enviado para " + email);
            })
            .catch((error) => {
              console.error(error);
              showToastError("Não foi possível enviar o e-mail. Tente novamente mais tarde.");
            });
        } else {
          // E-mail não existe, exibir mensagem de erro
          showToastError("O e-mail informado não está cadastrado.");
        }
      }
    });
  }
  

  // Handle user registration
  async function handleSignUp(e) {
    e.preventDefault();

    load_cad();
    try {
      const userCredential = await createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email
      });

      sucess_cad();
      clearFields();
      setIsActive(false);
      navigate('/Lovelace'); 
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
        navigate('/Lovelace/tool');
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

  async function getUserByEmail(email) {
    const usersRef = collection(db, "users"); // Obtenha a referência à coleção "users"
    const q = query(usersRef, where("email", "==", email)); // Crie a consulta
    const querySnapshot = await getDocs(q); // Busque os documentos que correspondem à consulta
    return !querySnapshot.empty; // Retorna verdadeiro se o e-mail existir
  }

  return (
    <body className={styles.body_login}>
      <div className={`${styles.container} ${isActive ? styles.active : ""}`}>
        <div className={`${styles.form_container} ${styles.sign_up}`}>
          <form onSubmit={handleSignUp}>
            <h1>Criar Conta</h1>
            <div className={styles.social_icons}>
            <a href="#" className={styles.icon}> <FontAwesomeIcon icon={faGoogle} style={{ color: '#DB4437' }} /></a>
              {/* <a href="#" className={styles.icon}><i className="fa-brands fa-facebook-f"></i></a>
              <a href="#" className={styles.icon}><i className="fa-brands fa-github"></i></a>
              <a href="#" className={styles.icon}><i className="fa-brands fa-linkedin-in"></i></a> */}
            </div>
            <span>ou use seu e-mail para registro</span>
            <input type="text" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button>Cadastrar</button>
          </form>
        </div>

        <div className={`${styles.form_container} ${styles.sign_in}`}>
          <form onSubmit={handleSignIn}>
            <h1>Entrar</h1>
            <div className={styles.social_icons}>
            <a href="#" className={styles.icon}> <FontAwesomeIcon icon={faGoogle} style={{ color: '#DB4437' }} /></a>
              {/* <a href="#" className={styles.icon}><i className="fa-brands fa-facebook-f"></i></a>
              <a href="#" className={styles.icon}><i className="fa-brands fa-github"></i></a>
              <a href="#" className={styles.icon}><i className="fa-brands fa-linkedin-in"></i></a> */}
            </div>
            <span>ou use sua senha de e-mail</span>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
            <a href="#" onClick={handleForgotPassword} className={styles.link}>Esqueceu sua senha?</a>
            <button>Entrar</button>
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
