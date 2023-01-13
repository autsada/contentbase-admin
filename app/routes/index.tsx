import React from "react"
import type { LoaderArgs, ActionArgs } from "@remix-run/node"
import { json } from "@remix-run/node"
import {
  Form,
  useLoaderData,
  useActionData,
  useFetcher,
} from "@remix-run/react"
import { useAuthenticityToken, useHydrated } from "remix-utils"

import {
  requireAuth,
  createUserIfNotExist,
  createCustomToken,
} from "~/server/auth.server"
import { signInWithToken } from "~/client/auth.client"

export async function loader({ request }: LoaderArgs) {
  const user = await requireAuth(request)
  return json({ user })
}

export async function action({ request }: ActionArgs) {
  // Get a wallet address from the request
  const form = await request.formData()
  const { address } = Object.fromEntries(form) as { address: string }
  const user = await createUserIfNotExist(address)
  const token = await createCustomToken(user.uid)
  return json({ token })
}

export default function Dashboard() {
  const data = useLoaderData<typeof loader>()
  const actionData = useActionData<typeof action>()
  const token = actionData?.token
  const fetcher = useFetcher()
  const csrf = useAuthenticityToken()
  const hydrated = useHydrated()

  const [error, setError] = React.useState("")

  const login = React.useCallback(
    async (token: string) => {
      try {
        const credential = await signInWithToken(token)
        const idToken = await credential.user.getIdToken()
        // Send the `idToken` and `csrf` token to the `action` function on the server.
        fetcher.submit({ idToken, csrf }, { method: "post", action: "/login" })
      } catch (error) {
        setError("Error occurred while attempting to login")
      }
    },
    [fetcher, csrf]
  )

  React.useEffect(() => {
    if (token) {
      login(token)
    }
  }, [token, login])

  return (
    <div>
      {data.user ? (
        <div className="mt-6">
          <h3 className="text-3xl">Dashboard</h3>
          <Form action="/logout" method="post">
            <button type="submit" disabled={!hydrated}>
              Logout
            </button>
          </Form>
        </div>
      ) : (
        <div className="mt-6">
          <Form method="post">
            <button type="submit" disabled={!hydrated}>
              Connect Wallet
            </button>
          </Form>
        </div>
      )}
    </div>
  )
}
