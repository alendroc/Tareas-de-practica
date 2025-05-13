import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'paratica.una.ale',
  appName: 'unaapp',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    cleartext: true, 
    androidScheme: 'http', 
    
  },
  plugins: {
    FirebaseAuthentication: {
      skipNativeAuth: false,
      providers: [
        "google.com"
      ]
    },
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"]
    }, GoogleMaps: {
      apiKey: "AIzaSyBV35eS9s-QUwN0WcZWeK-XIoICekxqXwk", // Reemplaza con tu clave de API      
    },
  }
};

export default config;
 