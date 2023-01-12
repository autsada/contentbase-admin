import type { LoaderArgs, ActionArgs, Session } from "@remix-run/node"
import { redirect, json } from "@remix-run/node"
import { ClientOnly, verifyAuthenticityToken } from "remix-utils"

import { checkSessionCookie } from "~/server/auth.server"
import {
  getSession,
  commitSession,
  destroySession,
} from "~/server/session.server"
import { createSessionCookie, deleteUser } from "~/server/auth.server"
import { SignUpForm } from "~/components/signup-form"

// We need Javascript client side to run the component
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
  let userId: string = ""
  let session: Session | undefined = undefined

  try {
    session = await getSession(request.headers.get("cookie"))
    await verifyAuthenticityToken(request, session)
    // Get the `idToken` from the request
    const form = await request.formData()
    const { idToken } = Object.fromEntries(form) as { idToken: string }
    const { sessionCookie, uid } = await createSessionCookie(idToken)
    session.set("session", sessionCookie)
    userId = uid

    return redirect("/", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    })
  } catch (error) {
    // Delete user from Firebase auth
    if (userId) {
      await deleteUser(userId)
    }
    if (session) {
      // Delete cookie
      await destroySession(session)
    }

    return json({ error: String(error) }, { status: 401 })
  }
}

export default function SignUp() {
  return <ClientOnly>{() => <SignUpForm />}</ClientOnly>
}
