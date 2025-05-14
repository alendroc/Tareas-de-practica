import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.unaapp.appu',
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
    },
    GoogleMaps: {
        apiKey: "AIzaSyALiSvM4DZTlQXtNi6HL5fxMPppkDXlnMs",
      },
  }
};

export default config;
 