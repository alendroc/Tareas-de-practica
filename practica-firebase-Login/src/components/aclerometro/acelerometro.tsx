import { useEffect, useState } from "react";
import { Motion } from "@capacitor/motion";
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonLabel } from "@ionic/react";


const Acelerometro = () => {
  const [acceleration, setAcceleration] = useState<{ x: number | null; y: number | null; z: number | null }>({ x: null, y: null, z: null });
  const [orientation, setOrientation] = useState<"Vertical" | "Horizontal" | null>(null);

  useEffect(() => {
    const setupListener = async () => {
      const listener = await Motion.addListener("accel", (event) => {
        setAcceleration({ x: event.acceleration.x, y: event.acceleration.y, z: event.acceleration.z });
      });

      // Limpia el listener cuando el componente se desmonta
      return () => {
        listener.remove();
      };
    };

    const cleanup = setupListener();
    return () => {
      cleanup.then((removeListener) => removeListener && removeListener());
    };
  }, []);

  useEffect(() => {
    let listener: { remove: () => void } | null = null;

    const setupListener = async () => {
      listener = await Motion.addListener("orientation", (event) => {
        const { beta, gamma } = event;
        if (Math.abs(gamma) > 45) {
          setOrientation("Horizontal");
        } else {
          setOrientation("Vertical");
        }
      });
    };

    setupListener();

    return () => {
      if (listener) {
        listener.remove();
      }
    };
  }, []);
  
  return (
    <IonContent>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Datos del Acelerómetro</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          {acceleration.x !== null && acceleration.y !== null && acceleration.z !== null ? (
            <>
            <div className='acelerometro-data'>
              <p>X: {acceleration.x.toFixed(2)}</p>
              <br />
              <p>Y: {acceleration.y.toFixed(2)}</p>
              <br />
              <p>Z: {acceleration.z.toFixed(2)}</p>
              <br />
            </div>
                {orientation && (
                <IonLabel style={{ fontWeight: "bold", fontSize: "1.2em", color: "#10dc60" }}>
                     Orientación: {orientation}
                 </IonLabel>
               )}
            </>
          ) : (
            <div className='loading-container'>
              <IonLabel>Cargando datos del acelerómetro...</IonLabel>
            </div>
          )}
        </IonCardContent>
      </IonCard>
    </IonContent>
  );
};
export default Acelerometro;
