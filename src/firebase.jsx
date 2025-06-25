// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyChMQFtCB1TzuxiXASbylGwzHOvIV7i-JY',
  authDomain: 'clutch-a86e7.firebaseapp.com',
  databaseURL: 'https://clutch-a86e7-default-rtdb.firebaseio.com',
  projectId: 'clutch-a86e7',
  storageBucket: 'clutch-a86e7.firebasestorage.app',
  messagingSenderId: '892891850709',
  appId: '1:892891850709:web:00022674ed02fb3bf63f5c',
  measurementId: 'G-N64ZWJ0D5Y',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };

export default app;
