import React, { useState } from 'react';
import { IonButton, IonInput, IonItem, IonLabel, IonLoading } from '@ionic/react';
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
  const apiUrl = import.meta.env.VITE_API_URL;
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

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
        setBackendMessage(data.message);
      } else {
        const errorData = await response.json();
        console.error(errorData.message);
        setErrorMessage(errorData.message);
      }

    } catch (error) {
      console.error('Erreur lors de la connexion :', error);
      setErrorMessage('Erreur lors de la connexion. Veuillez réessayer.');
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
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <IonButton type="submit">Se connecter</IonButton>
      </form>
    </>
  );
};

export default ConnexionContainer;
