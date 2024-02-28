import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import InscriptionComponent from '../components/InscriptionComponent';
import './Connexion.css';

const Inscription: React.FC = () => {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Inscription</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <InscriptionComponent />
        </IonContent>
      </IonPage>
    );
  };
  

export default Inscription;
