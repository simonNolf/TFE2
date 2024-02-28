import React, { useState } from 'react';
import { IonItem, IonInput, IonButton, IonLabel, IonText, IonLoading, IonToast } from '@ionic/react';
import { useLocation } from 'react-router-dom';


import './Commons.css';

interface LocationState {
  matricule?: string;
}

const isSqlInjectionSafe = (input: string): boolean => {
    // SQL injection prevention logic
    const sqlInjectionPattern = /[\';\"]/;
    return !sqlInjectionPattern.test(input);
};

const isPasswordSecure = (password: string): boolean => {
    // Password strength validation logic
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[#@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
};

const InscriptionContainer: React.FC = () => {
    const location = useLocation<LocationState>();
    const matricule = location.state?.matricule || '';
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [passwordMismatch, setPasswordMismatch] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [showToast, setShowToast] = useState<boolean>(false);
    const [toastMessage, setToastMessage] = useState<string>('');
    const apiUrl = import.meta.env.VITE_API_URL


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Check if passwords match
        if (password !== confirmPassword) {
            setPasswordMismatch(true);
            return;
        }

        // Check for SQL injection safety
        if (!isSqlInjectionSafe(password) || !isSqlInjectionSafe(confirmPassword)) {
            // Handle SQL injection attempt
            setToastMessage('potentielle injection SQL');
            setShowToast(true);
            return;
        }

        // Check for password strength
        if (!isPasswordSecure(password)) {
            // Handle weak password
            setToastMessage(
                'le mot de passse ne complète pas les prérequis de sécurité( 1 Majucule, 1 Minuscule, 1 Chiffre , un caratère non-alphanumérique et au moins 8 caractères)'
                );
            setShowToast(true);
            return;
        }

        // Reset flags
        setPasswordMismatch(false);

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
                setToastMessage('Registration successful!');
            } else {
                // Handle registration failure
                setToastMessage('Registration failed.');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            setToastMessage('Error during registration.');
        } finally {
            // Stop loading
            setLoading(false);
            // Show toast
            setShowToast(true);
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
                        <IonLabel>Matricule: {matricule}</IonLabel>
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
                {passwordMismatch && (
                    <IonText color="danger">
                        <p>Les mots de passe ne correspondent pas.</p>
                    </IonText>
                )}
                <IonButton type='submit'>
                    S'inscrire
                </IonButton>
                <IonToast
                    isOpen={showToast}
                    onDidDismiss={() => setShowToast(false)}
                    message={toastMessage}
                    duration={3000}
                />
            </form>
        </>
    );
};

export default InscriptionContainer;
