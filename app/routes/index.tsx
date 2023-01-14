import React from "react"
import type { LoaderArgs, ActionArgs } from "@remix-run/node"
import { json } from "@remix-run/node"
import { useLoaderData, useFetcher } from "@remix-run/react"
import { useAuthenticityToken, useHydrated } from "remix-utils"
import { useAccount, useDisconnect } from "wagmi"

import {
  requireAuth,
  createUserIfNotExist,
  createCustomToken,
} from "~/server/auth.server"
import { signInWithToken } from "~/client/auth.client"
import { ConnectButton } from "~/components/connectButton"
import { LogOutButton } from "~/components/logoutButton"

export async function loader({ request }: LoaderArgs) {
  const user = await requireAuth(request)
  return json({ user })
}

export async function action({ request }: ActionArgs) {
  // Get a wallet address from the request
  const form = await request.formData()
  const { address } = Object.fromEntries(form) as { address: string }

  if (address) {
    const user = await createUserIfNotExist(address)
    const token = await createCustomToken(user.uid)
    return json({ token })
  } else {
    return json({ token: null })
  }
}

export default function Dashboard() {
  const data = useLoaderData<typeof loader>()
  const fetcher = useFetcher<typeof action>()
  const token = fetcher?.data?.token
  const csrf = useAuthenticityToken()
  const hydrated = useHydrated()

  const [processingLogin, setProcessingLogin] = React.useState(false)
  const [error, setError] = React.useState("")

  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()

  // When users connected their wallet, submit the address to the server for processing Firebase Auth login
  React.useEffect(() => {
    if (isConnected && !!address) {
      fetcher.submit({ address }, { method: "post" })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, isConnected])

  // Function to sign in with custom token
  const login = React.useCallback(
    async (token: string) => {
      try {
        const credential = await signInWithToken(token)
        const idToken = await credential.user.getIdToken()
        // Send the `idToken` and `csrf` token to the `action` function on the server.
        fetcher.submit({ idToken, csrf }, { method: "post", action: "/login" })
      } catch (error) {
        setError("Error occurred while attempting to login")
        setProcessingLogin(false)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [csrf]
  )

  React.useEffect(() => {
    if (token) {
      login(token)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  function logOut() {
    // Make sure to reset the processing state
    if (processingLogin) setProcessingLogin(false)
    // Disconnect from the wallet before processing session logout
    disconnect()
    fetcher.submit({}, { method: "post", action: "/logout" })
  }

  console.log("error -->", error)
  return (
    <div>
      {data.user ? (
        <div className="mt-6">
          <h3 className="text-3xl">Dashboard</h3>
          <LogOutButton logOut={logOut} disabled={!hydrated} />
        </div>
      ) : (
        <ConnectButton
          processing={processingLogin}
          setProcessing={setProcessingLogin}
          disabled={!hydrated || processingLogin}
        />
      )}
    </div>
  )
}
