import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
const firebaseConfig = {
  apiKey: "AIzaSyB5NlqHAb_uvaf2wY0ve60UbYWVocGzzX4",
  authDomain: "hrc-driplab.firebaseapp.com",
  databaseURL: "https://hrc-driplab-default-rtdb.firebaseio.com",
  projectId: "hrc-driplab",
  storageBucket: "hrc-driplab.firebasestorage.app",
  messagingSenderId: "705644472842",
  appId: "1:705644472842:web:f73229ed0e04e2bbbc4df3"
}
export const app = initializeApp(firebaseConfig)
export const db = getDatabase(app)
