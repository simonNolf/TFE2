import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ConnexionComponent from '../components/ConnexionComponent';
import './Connexion.css';

const Connexion: React.FC = () => {
    console.log("co");
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Connexion</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <ConnexionComponent />
        </IonContent>
      </IonPage>
    );
  };
  

export default Connexion;
