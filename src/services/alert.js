import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
let notificationCount = 0;
import { sendPasswordResetEmail } from "firebase/auth";



export function load(){
    Swal.fire({
        title: 'Carregando...',
        text: 'Por favor, aguarde...',
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });
      
      // Simula um processo de carregamento
      setTimeout(() => { //
        // Fecha a notificação após 2 segundos
        Swal.close();
      }, 2000);
}

export function sucess(){
    // Notificação de Sucesso com redirecionamento
    Swal.fire({
        icon: 'success',
        title: 'Sucesso!',
        text: 'Bem Vindo.',
        position: 'center',
        showConfirmButton: false,
        timer: 3000,
        toast: true
      })
}

export function fail_cad(){
// Exibe a notificação de erro

    Swal.fire({
      icon: 'error',
      title: 'Ops! Algo deu errado...',
      text: 'Revise as informações e tente novamente.',
      position: 'center',
      showConfirmButton: false,
      timer: 3000,
      toast: true
    });
}

export function load_cad(){
  Swal.fire({
      title: 'Carregando...',
      text: 'Por favor, aguarde...',
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
    
    // Simula um processo de carregamento
    setTimeout(() => { //
      // Fecha a notificação após 2 segundos
      Swal.close();
    }, 2000);
}

export function sucess_cad(){
  // Notificação de Sucesso com redirecionamento
  Swal.fire({
      icon: 'success',
      title: 'Sucesso!',
      text: 'Cadastro.',
      position: 'center',
      showConfirmButton: false,
      timer: 3000,
      toast: true
    })
}

export function fail(){
// Exibe a notificação de erro

  Swal.fire({
    icon: 'error',
    title: 'Ops! Algo deu errado...',
    text: 'Revise as informações e tente novamente.',
    position: 'center',
    showConfirmButton: false,
    timer: 3000,
    toast: true
  });

}


export function pratica(){
  
  const navigate = useNavigate();

  Swal.fire({
      title: 'Iniciar Atividade?',
      text: "A partir daqui não terá mais volta!",
      icon: 'warning',
      iconColor: '#F21B3F',
      background: 'white',
      showCancelButton: true,
      confirmButtonColor: '#F21B3F',
      border: 'none',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Iniciar'
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/practice');
      }
    })
}