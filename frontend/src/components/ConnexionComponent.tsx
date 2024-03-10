import React, { useState } from 'react';
import { IonButton, IonInput, IonItem, IonLabel, IonLoading, IonToast } from '@ionic/react';
import './Commons.css';
import { useLocation } from 'react-router-dom';

interface LocationState {
  matricule?: string;
}

const ConnexionContainer: React.FC = () => {
  const location = useLocation<LocationState>();
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [matricule, setMatricule] = useState<string>(location.state?.matricule || '');
  const [backendMessage, setBackendMessage] = useState<string>('');
  const [showToast, setShowToast] = useState<boolean>(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  const showToastWithColor = (message: string, color: string) => {
    setBackendMessage(message);
    setShowToast(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      // ... (votre logique de connexion)

      const response = await fetch(`${apiUrl}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          matricule,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        showToastWithColor(data.message, 'success');
      } else {
        const errorData = await response.json();
        console.error(errorData.message);
        showToastWithColor(errorData.message, 'danger');
      }

    } catch (error) {
      console.error('Erreur lors de la connexion :', error);
      showToastWithColor('Erreur lors de la connexion. Veuillez réessayer.', 'danger');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <IonLoading
        isOpen={loading}
        message={'Chargement...'}
      />
      <form className="centered-container" onSubmit={handleSubmit}>
        {matricule && (
          <IonItem>
            <IonLabel>Matricule: {matricule}</IonLabel>
          </IonItem>
        )}
        <IonItem>
          <IonInput
            label='Mot de passe : '
            value={password}
            minlength={8}
            type='password'
            onIonChange={(e) => setPassword(e.detail.value!)}
          />
        </IonItem>
        <IonButton type="submit">Se connecter</IonButton>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={backendMessage}
          duration={3000}
          color={backendMessage.includes('Réussie') ? 'success' : 'danger'}
        />
      </form>
    </>
  );
};

export default ConnexionContainer;
