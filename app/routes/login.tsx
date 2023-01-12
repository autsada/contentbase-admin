// import React from "react"
import "firebase/auth"
import type { ActionArgs, LoaderArgs, Session } from "@remix-run/node"
import { json, redirect } from "@remix-run/node"
import { verifyAuthenticityToken, ClientOnly } from "remix-utils"

import {
  getSession,
  commitSession,
  destroySession,
} from "~/server/session.server"
import { checkSessionCookie, createSessionCookie } from "~/server/auth.server"
import { LoginForm } from "~/components/login-form"

// We need Javascript client side to run the Firebase Login component
export const handle = { hydrate: true }

export const loader = async ({ request }: LoaderArgs) => {
  const session = await getSession(request.headers.get("cookie"))
  const { uid } = await checkSessionCookie(session)
  const headers = {
    "Set-Cookie": await commitSession(session),
  }

  if (uid) {
    return redirect("/", { headers })
  }
  return json(null, { headers })
}

export async function action({ request }: ActionArgs) {
  let session: Session | undefined = undefined

  try {
    session = await getSession(request.headers.get("cookie"))
    await verifyAuthenticityToken(request, session)
    const form = await request.formData()
    const { idToken } = Object.fromEntries(form) as { idToken: string }
    const { sessionCookie } = await createSessionCookie(idToken)
    session.set("session", sessionCookie)

    return redirect("/", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    })
  } catch (error) {
    if (session) {
      // Delete cookie
      await destroySession(session)
    }

    return json({ error: String(error) }, { status: 401 })
  }
}

export default function Login() {
  return <ClientOnly>{() => <LoginForm />}</ClientOnly>
}
