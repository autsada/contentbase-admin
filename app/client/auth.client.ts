import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth"

import { clientAuth } from "./firebase.client"

export async function signUp(email: string, password: string) {
  const credential = await createUserWithEmailAndPassword(
    clientAuth,
    email,
    password
  )

  return {
    user: credential.user,
    idToken: await credential.user.getIdToken(),
  }
}

export async function login(email: string, password: string) {
  const credential = await signInWithEmailAndPassword(
    clientAuth,
    email,
    password
  )

  return {
    user: credential.user,
    idToken: await credential.user.getIdToken(),
  }
}
