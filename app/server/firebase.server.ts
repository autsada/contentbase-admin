import admin from "firebase-admin"
import { getApps, getApp, initializeApp } from "firebase-admin/app"
import { getAuth } from "firebase-admin/auth"

const { FIREBASE_ADMIN_SERVICE_ACCOUNT } = process.env

function initializeAdmin() {
  return getApps().length > 0
    ? getApp()
    : initializeApp({
        credential: admin.credential.cert(
          JSON.parse(FIREBASE_ADMIN_SERVICE_ACCOUNT || "{}")
        ),
      })
}

const firebaseApp = initializeAdmin()
export const auth = getAuth(firebaseApp)
