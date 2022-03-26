import { type FirebaseApp, initializeApp } from "firebase/app";
import { type Firestore, getFirestore } from "firebase/firestore";

export default class FirestoreProvider {
  private static instance: FirestoreProvider = null;
  private firebase_app: FirebaseApp;
  public firestore: Firestore;

  constructor() {
    const firebase_config = {
      apiKey: "AIzaSyAiusFG7AE2nb2lMvInqWPsblnzz0Z8TnE",
      authDomain: "omok-411fa.firebaseapp.com",
      projectId: "omok-411fa",
      storageBucket: "omok-411fa.appspot.com",
      messagingSenderId: "566460409998",
      appId: "1:566460409998:web:ad10cb7432945e760181df",
      measurementId: "G-CEWLMYXXWK"
    };

    this.firebase_app = initializeApp(firebase_config);
    this.firestore = getFirestore();
  }

  public static get_instance() {
    if (this.instance === null) {
      this.instance = new FirestoreProvider();
    }
    return this.instance;
  };
}