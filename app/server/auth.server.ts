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
