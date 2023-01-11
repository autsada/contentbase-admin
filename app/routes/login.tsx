// import React from "react"
import "firebase/auth"
import type { ActionArgs, LoaderArgs } from "@remix-run/node"
import { json, redirect } from "@remix-run/node"
import // ClientOnly,
// createAuthenticityToken,
// unauthorized,
// useAuthenticityToken,
// useHydrated,
"remix-utils"

import { getSession, commitSession } from "~/server/session.server"
import { checkSessionCookie } from "~/server/auth.server"

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

// export const action = async ({ request }: ActionArgs) => {}

export default function Login() {
  // const hydrated = useHydrated()

  return (
    <div>
      <h3 className="text-3xl">Login Page</h3>
    </div>
  )
}
