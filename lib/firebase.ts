import { initializeApp, getApps, FirebaseApp } from 'firebase/app'
import { getAuth, Auth } from 'firebase/auth'
import { getFirestore, Firestore } from 'firebase/firestore'

let app: FirebaseApp
let auth: Auth
let db: Firestore

const initFirebase = () => {
  if (typeof window === 'undefined') return

  if (!getApps().length) {
    app = initializeApp({
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? '',
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? '',
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? '',
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? '',
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_ID ?? '',
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? '',
    })
  } else {
    app = getApps()[0]
  }

  auth = getAuth(app)
  db = getFirestore(app)
}

initFirebase()

export { auth, db }
