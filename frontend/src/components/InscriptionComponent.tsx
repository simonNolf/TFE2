import React, { useState } from 'react';
import { IonItem, IonInput, IonButton, IonLabel, IonLoading } from '@ionic/react';
import { useLocation } from 'react-router-dom';

import './Commons.css';

interface LocationState {
    matricule?: string;
}

export const isSqlInjectionSafe = (input: string): boolean => {
    // SQL injection prevention logic
    const sqlInjectionPattern = /[\';\"]/;
    return !sqlInjectionPattern.test(input);
};

export const isPasswordSecure = (password: string): boolean => {
    // Password strength validation logic
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[#@$!%*?&])[A-Za-z\d#$@!%*?&]{8,}$/;
    return passwordRegex.test(password);
};


const InscriptionContainer: React.FC = () => {
    const location = useLocation<LocationState>();
    const matricule = location.state?.matricule || '';
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const apiUrl = import.meta.env.VITE_API_URL;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Check if passwords match
        if (password !== confirmPassword) {
            setErrorMessage('Les mots de passe ne correspondent pas.');
            return;
        }

        // Check for SQL injection safety
        if (!isSqlInjectionSafe(password) || !isSqlInjectionSafe(confirmPassword)) {
            // Handle SQL injection attempt
            setErrorMessage('Potentielle injection SQL');
            return;
        }

        // Check for password strength
        if (!isPasswordSecure(password)) {
            // Handle weak password
            setErrorMessage('Le mot de passe ne remplit pas les prérequis de sécurité (1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial, et au moins 8 caractères)');
            return;
        }

        // Start loading
        setLoading(true);

        // Continue with the registration logic or any other actions, e.g., making a backend call
        try {
            // Assuming you have a backend API endpoint for registration
            const response = await fetch(`${apiUrl}/users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    matricule,
                    password,
                }),
            });

            // Handle the response from the backend
            if (response.ok) {
                // Registration successful
                setErrorMessage('');
            } else {
                // Handle registration failure
                setErrorMessage('Échec de l\'inscription.');
            }
        } catch (error) {
            console.error('Erreur lors de l\'inscription :', error);
            setErrorMessage('Erreur lors de l\'inscription.');
        } finally {
            // Stop loading
            setLoading(false);
        }
    };

    return (
        <>
            <IonLoading
                isOpen={loading}
                message={'Enregistrement en cours...'}
            />
            <form className="centered-container" onSubmit={handleSubmit}>
                {matricule && (
                    <IonItem>
                        <IonLabel>Matricule : {matricule}</IonLabel>
                    </IonItem>
                )}
                <IonItem>
                    <IonInput
                        label='Votre mot de passe'
                        value={password}
                        minlength={8}
                        type='password'
                        onIonChange={(e) => setPassword(e.detail.value!)}
                    />
                </IonItem>
                <IonItem>
                    <IonInput
                        label='Confirmer le mot de passe'
                        value={confirmPassword}
                        minlength={8}
                        type='password'
                        onIonChange={(e) => setConfirmPassword(e.detail.value!)}
                    />
                </IonItem>
                <IonButton type='submit'>
                    S'inscrire
                </IonButton>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            </form>
        </>
    );
};

export default InscriptionContainer;
