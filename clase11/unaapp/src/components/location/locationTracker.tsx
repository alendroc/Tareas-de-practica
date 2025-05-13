import React, { useEffect, useState } from "react";
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonIcon, IonItem, IonLabel, IonList, IonSpinner } from "@ionic/react";
import { locationOutline, pauseOutline, playOutline } from "ionicons/icons";
import { useLocationTracker } from "../../hooks/locations/useLocationTracker";
import LocationCountdown from "../../hooks/locations/locationCountdown";

const LocationTrackerComponent: React.FC = () => {
  const [isTracking, setIsTracking] = useState(false);
  const { location, loading, error, countdown, startTracking, stopTracking, requestPermissions, getCurrentPosition } = useLocationTracker(40, 5); // Update every 40 seconds with 5 second countdown

  useEffect(() => {
    const requestLocationPermissions = async () => {
      await requestPermissions();
    };

    requestLocationPermissions();
  }, [requestPermissions]);

  const handleStartTracking = () => {
    startTracking();
    setIsTracking(true);
  };

  const handleStopTracking = () => {
    stopTracking();
    setIsTracking(false);
  };

  return (
    <IonContent>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Location Tracker</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          {countdown !== null && (
            <div className='countdown-container'>
              <LocationCountdown countdown={countdown} />
            </div>
          )}

          {loading ? (
            <div className='loading-container'>
              <IonSpinner name='crescent' />
              <IonLabel>Getting location...</IonLabel>
            </div>
          ) : location ? (
            <IonList>
              <IonItem>
                <IonIcon icon={locationOutline} slot='start' />
                <IonLabel>
                  <h2>Current Location</h2>
                  <p>Latitude: {location.coords.latitude.toFixed(6)}</p>
                  <p>Longitude: {location.coords.longitude.toFixed(6)}</p>
                  <p>Accuracy: {location.coords.accuracy?.toFixed(2)} meters</p>
                  <p>Last Updated: {new Date(location.timestamp).toLocaleTimeString()}</p>
                </IonLabel>
              </IonItem>
            </IonList>
          ) : (
            <div className='no-location'>
              <p>No location data available</p>
            </div>
          )}

          {error && (
            <div className='error-container'>
              <p className='error-message'>{error}</p>
            </div>
          )}

          <div className='button-container'>
            {!isTracking ? (
              <IonButton expand='block' onClick={handleStartTracking}>
                <IonIcon slot='start' icon={playOutline} />
                Start Location Tracking
              </IonButton>
            ) : (
              <IonButton expand='block' color='danger' onClick={handleStopTracking}>
                <IonIcon slot='start' icon={pauseOutline} />
                Stop Location Tracking
              </IonButton>
            )}

            <IonButton expand='block' fill='outline' onClick={getCurrentPosition}>
              <IonIcon slot='start' icon={locationOutline} />
              Get Current Location
            </IonButton>
          </div>
        </IonCardContent>
      </IonCard>
    </IonContent>
  );
};

export default LocationTrackerComponent;
