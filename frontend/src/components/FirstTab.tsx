import { IonButton } from '@ionic/react';
import './Commons.css';

interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  return (
    <div className="container">
      <IonButton href={'/login'}>Connexion</IonButton>
    </div>
  );
};

export default ExploreContainer;
