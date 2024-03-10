import React, { useState } from 'react';
import { IonItem, IonInput, IonButton, IonLabel, IonToast, IonLoading } from '@ionic/react';
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
    const [loading, setLoading] = useState<boolean>(false);
    const [showToast, setShowToast] = useState<boolean>(false);
    const [toastMessage, setToastMessage] = useState<string>('');
    const apiUrl = import.meta.env.VITE_API_URL;

    const showToastWithColor = (message: string, color: string) => {
        setToastMessage(message);
        setShowToast(true);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Check if passwords match
        if (password !== confirmPassword) {
            showToastWithColor('Les mots de passe ne correspondent pas.', 'danger');
            return;
        }

        // Check for SQL injection safety
        if (!isSqlInjectionSafe(password) || !isSqlInjectionSafe(confirmPassword)) {
            // Handle SQL injection attempt
            showToastWithColor('Potentielle injection SQL', 'danger');
            return;
        }

        // Check for password strength
        if (!isPasswordSecure(password)) {
            // Handle weak password
            showToastWithColor(
                'Le mot de passe ne remplit pas les prérequis de sécurité (1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial, et au moins 8 caractères)',
                'danger'
            );
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
                showToastWithColor('Inscription réussie !', 'success');
            } else {
                // Handle registration failure
                showToastWithColor('Échec de l\'inscription.', 'danger');
            }
        } catch (error) {
            console.error('Erreur lors de l\'inscription :', error);
            showToastWithColor('Erreur lors de l\'inscription.', 'danger');
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
                <IonToast
                    isOpen={showToast}
                    onDidDismiss={() => setShowToast(false)}
                    message={toastMessage}
                    duration={3000}
                    color={toastMessage.includes('réussie') ? 'success' : 'danger'}
                />
            </form>
        </>
    );
};

export default InscriptionContainer;
