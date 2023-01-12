import type { Session } from "@remix-run/node"
import { redirect } from "@remix-run/node"

import { auth } from "./firebase.server"
import { getSession, destroySession } from "./session.server"

export async function checkSessionCookie(session: Session) {
  try {
    const decodedToken = await auth.verifySessionCookie(
      session.get("session") || ""
    )
    return decodedToken
  } catch (error) {
    return { uid: undefined }
  }
}

export async function requireAuth(request: Request) {
  const session = await getSession(request.headers.get("cookie"))
  const { uid } = await checkSessionCookie(session)
  if (!uid) {
    throw redirect("/login", {
      headers: { "Set-Cookie": await destroySession(session) },
    })
  }

  return auth.getUser(uid)
}

export async function createSessionCookie(idToken: string) {
  const decodedIdToken = await auth.verifyIdToken(idToken)
  // Only process if the user just signed in in the last 5 minutes.
  if (new Date().getTime() / 1000 - decodedIdToken.auth_time < 5 * 60) {
    const expiresIn = 1000 * 60 * 60 * 24 * 7 // 1 week
    return {
      uid: decodedIdToken.uid,
      sessionCookie: await auth.createSessionCookie(idToken, {
        expiresIn,
      }),
    }
  }

  throw new Error("Recent sign in required!")
}

export async function deleteUser(uid: string) {
  return auth.deleteUser(uid)
}
