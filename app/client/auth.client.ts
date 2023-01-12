import { createUserWithEmailAndPassword } from "firebase/auth"

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
