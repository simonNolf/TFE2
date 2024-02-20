import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import LoginComponent from '../components/LoginComponent';
import './Login.css';

const Login: React.FC = () => {
    console.log("co");
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Connexion</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <LoginComponent />
        </IonContent>
      </IonPage>
    );
  };
  

export default Login;
