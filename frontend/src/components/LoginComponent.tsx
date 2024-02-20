import React, { useState } from 'react';
import { IonButton, IonInput, IonItem } from '@ionic/react';


const LoginComponent: React.FC = () => {
  const [matricule, setMatricule] = useState<string>('');

  async function fetchCSVData() {
    const csvUrl = './../../data.csv';

    try {
      const response = await fetch(csvUrl);
      const csvData = await response.text();
      return csvData;
    } catch (error) {
      console.error('Error fetching CSV:', error);
      throw error;
    }
  }

  async function test(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const csvData = await fetchCSVData();
      const matriculeExists = checkMatriculeInCSV(matricule, csvData);

      if (matriculeExists) {
        console.log('Matricule exists in CSV:', matricule);
      } else {
        console.log('Matricule not found in CSV:', matricule);
        alert("merci d'entrer un matricule valide")
      }
    } catch (error) {
    }
  }

  function checkMatriculeInCSV(matriculeToCheck: string, csvData: string): boolean {
    const rows = csvData.split('\n').map(row => row.split(';'));
  
    for (let i = 1; i < rows.length; i++) {
      const matriculeFromCSV = rows[i][0].trim(); // Assuming matricule is in the first column
  
      if (matriculeFromCSV === matriculeToCheck.trim()) {
        return true; // Matricule found in CSV
      }
    }
  
    return false; // Matricule not found in CSV
  }
  

  return (
    <form onSubmit={test}>
      <IonItem>
        <IonInput
          value={matricule}
          maxlength={8}
          minlength={8}
          placeholder='HEXXXXXX'
          onIonChange={(e) => setMatricule(e.detail.value!)}
        />
      </IonItem>
      <IonButton type='submit'>Suivant</IonButton>
    </form>
  );
};

export default LoginComponent;
