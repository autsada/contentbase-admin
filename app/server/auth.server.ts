import type { Session } from "@remix-run/node"
import { redirect } from "@remix-run/node"
import type { DecodedIdToken } from "firebase-admin/auth"

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

export function revokeToken(uid: string) {
  return auth.revokeRefreshTokens(uid)
}

// Verify id token and check if user is an admin user
export function verifyIdToken(idToken: string) {
  return auth.verifyIdToken(idToken)
}

export function verifyAdmin(decodedIdToken: DecodedIdToken) {
  // Only allow admin users to login
  if (!decodedIdToken.super_admin && !decodedIdToken.admin) {
    throw new Error("Not allowed")
  }
}

export async function createSessionCookie(idToken: string) {
  const decodedIdToken = await verifyIdToken(idToken)
  verifyAdmin(decodedIdToken)
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
