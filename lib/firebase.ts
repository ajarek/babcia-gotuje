import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { initializeFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBxT5tfdtdkqmUP_EdKyF3vO6K5VCP5Xic",
  authDomain: "confident-freehold-vskkt.firebaseapp.com",
  projectId: "confident-freehold-vskkt",
  storageBucket: "confident-freehold-vskkt.firebasestorage.app",
  messagingSenderId: "503766704011",
  appId: "1:503766704011:web:e2ac85b7acaeb67c79998e",
}

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()
const auth = getAuth(app)
const db = initializeFirestore(
  app,
  {},
  "ai-studio-2d4f5d61-456b-4ecb-8932-91299a48cf2c",
)

export { app, auth, db }
