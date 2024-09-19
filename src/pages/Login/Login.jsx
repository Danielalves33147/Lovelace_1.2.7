import React, { useState, useEffect } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { Link, useNavigate } from 'react-router-dom';
import arrowImg from "../../assets/arrow.svg";
import { auth, db } from "../../services/firebaseConfig.js";
import { load, sucess, fail } from "../../services/alert.js";
import Swal from 'sweetalert2';
import { sendPasswordResetEmail } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";  // Importar funções necessárias
import styles from './Login.module.css';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState(""); // Adicionar estado para o nome do usuário

  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
    
  const navigate = useNavigate();

  //clear input
  function clearFields() {
    setEmail("");
    setPassword("");
  }

 
  useEffect(() => {
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
  }, [email, password]);


  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");
    if (storedEmail && storedPassword) {
      setEmail(storedEmail);
      setPassword(storedPassword);
    }
  }, []);

  // Handle login
  async function handleSignIn(e) {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(email, password);
      if (userCredential) {
        const user = userCredential.user;
  
        // Buscar o nome do usuário usando o UID
        const userName = await getUserNameFromFirestore(user.uid);
        setUserName(userName);
        console.log("Nome do usuário:", userName); // Ou você pode usar o nome do usuário como precisar
  
        sucess();
        navigate('/Lovelace_1.2.4/tool'); // Navega para a página de ferramenta
      }
    } catch (error) {
      console.error("Erro ao fazer login ou buscar o nome do usuário:", error);
      fail();
    }
  }
  

// Função para obter o nome do usuário do Firestore com base no UID
async function getUserNameFromFirestore(uid) {
  const userDoc = doc(db, "users", uid); // UID como ID 
  const docSnap = await getDoc(userDoc);
  if (docSnap.exists()) {
    return docSnap.data().name;
  } else {
    console.log("Nenhum documento encontrado!");
    return null;
  }
}


  // Handle forgot password
  function handleForgotPassword() {
    Swal.fire({
      title: "Esqueceu sua senha?",
      text: "Digite seu e-mail para redefinir a senha:",
      input: "email",
      inputPlaceholder: "lovelace@gmail.com",
      showCancelButton: true,
      confirmButtonText: "Enviar",
    }).then((result) => {
      if (result.isConfirmed) {
        const email = result.value;
        sendPasswordResetEmail(auth, email)
          .then(() => {
            Swal.fire("Sucesso!", "Um e-mail de redefinição de senha foi enviado para " + email, "success");
          })
          .catch((error) => {
            console.error(error);
            Swal.fire("Erro", "Não foi possível enviar o e-mail. Verifique o seu endereço de e-mail.", "error");
          });
      }
    });
  }
  
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Lovelace</h1>
        <span>Informações de Login</span>
      </header>

      <form onSubmit={handleSignIn}>
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
        <a href="#" onClick={handleForgotPassword}>Esqueceu sua senha?</a>
        <button className={styles.button} type="submit">
          Entrar <img src={arrowImg} alt="->" />
        </button>
        <div className={styles.footer}>
          <p>Você não tem uma conta?</p>
          <Link to="/Lovelace_1.2.4/register">Crie a sua conta aqui</Link>
        </div>
      </form>
    </div>
  );
}
