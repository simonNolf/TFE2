import React, { useState } from 'react';
import { IonButton, IonInput, IonItem, IonLoading, IonToast } from '@ionic/react';
import { useHistory } from 'react-router-dom';

const LoginComponent: React.FC = () => {
  const [matricule, setMatricule] = useState<string>('');
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const history = useHistory();
  const apiUrl = import.meta.env.VITE_API_URL;

  const showToastWithColor = (message: string, color: string) => {
    setToastMessage(message);
    setShowToast(true);
  };

  async function fetchCSVData() {
    const csvUrl = './../../data.csv';

    try {
      const response = await fetch(csvUrl);
      const csvData = await response.text();
      return csvData;
    } catch (error) {
      console.error('Erreur lors de la récupération du fichier CSV :', error);
      throw error;
    }
  }

  async function checkMatriculeInCSV(matriculeToCheck: string, csvData: string): Promise<boolean> {
    const rows = csvData.split('\n').map(row => row.split(';'));

    for (let i = 1; i < rows.length; i++) {
      const matriculeFromCSV = rows[i][0].trim();

      if (matriculeFromCSV === matriculeToCheck.trim()) {
        return true;
      }
    }

    return false;
  }

  async function checkMatriculeInDB(matriculeToCheck: string): Promise<boolean> {
    try {
      const response = await fetch(`${apiUrl}/users/${matriculeToCheck}`);
      const data = await response.json();

      if (response.ok) {
        return data.exists;
      } else {
        console.error('Erreur lors de la vérification du matricule dans la base de données :', data.error || data.message);
        return false;
      }
    } catch (error: any) {
      console.error('Erreur lors de la vérification du matricule dans la base de données :', error.message);
      return false;
    }
  }

  async function test(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setLoading(true);
      const csvData = await fetchCSVData();
      const matriculeExistsInCSV = await checkMatriculeInCSV(matricule, csvData);
      const matriculeExistsInDB = await checkMatriculeInDB(matricule);

      if (matriculeExistsInCSV && matriculeExistsInDB) {
        showToastWithColor(`Le matricule existe dans le CSV et dans la base de données : ${matricule}`, 'success');
        history.push("/connexion", { matricule });
      } else if (matriculeExistsInCSV) {
        showToastWithColor(`Le matricule : ${matricule} n'a pas de compte lié`, 'success');
        history.push("/inscription", { matricule });
      } else {
        showToastWithColor(`Le matricule : ${matricule} n'existe pas`, 'danger');
      }
    } catch (error) {
      console.error('Erreur lors de la vérification du matricule :', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <IonLoading
        isOpen={loading}
        message={'Vérification en cours...'}
      />
      <form className="centered-container" onSubmit={test}>
        <IonItem>
          <IonInput
            value={matricule}
            required
            maxlength={8}
            minlength={8}
            placeholder='HEXXXXXX'
            onIonChange={(e) => setMatricule(e.detail.value!)}
          />
        </IonItem>
        <IonButton type='submit'>Suivant</IonButton>
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={2000}
          color={toastMessage.includes('n\'existe pas') ? 'danger' : 'success'}
        />
      </form>
    </>
  );
};

export default LoginComponent;
