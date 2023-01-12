import React from "react"
import { useFetcher, Link } from "@remix-run/react"
import { useAuthenticityToken, useHydrated } from "remix-utils"

import { signUp } from "~/client/auth.client"

export function SignUpForm() {
  const fetcher = useFetcher()
  const csrf = useAuthenticityToken()
  const hydrated = useHydrated()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      name: { value: string }
      email: { value: string }
      password: { value: string }
    }
    const email = target["email"].value
    const password = target["password"].value
    const { idToken } = await signUp(email, password)

    // Send the `idToken` and `csrf` token to the `action` function on the server.
    fetcher.submit({ idToken, csrf }, { method: "post" })
  }

  return (
    <div>
      <fetcher.Form method="post" className="py-10" onSubmit={handleSubmit}>
        <input
          style={{ display: "block", margin: "0 auto" }}
          name="name"
          placeholder="Peter"
          type="text"
        />
        <input
          style={{ display: "block", margin: "0 auto" }}
          name="email"
          placeholder="you@example.com"
          type="email"
        />
        <input
          style={{ display: "block", margin: "0 auto" }}
          name="password"
          placeholder="password"
          type="password"
        />
        <button
          style={{ display: "block", margin: "0 auto" }}
          type="submit"
          disabled={!hydrated}
        >
          Submit
        </button>
      </fetcher.Form>

      <div>
        <Link to="/login">Login</Link>
      </div>
    </div>
  )
}
