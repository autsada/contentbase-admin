import { signInWithCustomToken } from "firebase/auth"

import { clientAuth } from "./firebase.client"

export function signInWithToken(token: string) {
  return signInWithCustomToken(clientAuth, token)
}
