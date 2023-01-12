import type { MetaFunction, LinksFunction, LoaderArgs } from "@remix-run/node"
import { json } from "@remix-run/node"
import { AuthenticityTokenProvider, createAuthenticityToken } from "remix-utils"

import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react"

import { getSession, commitSession } from "./server/session.server"
import styles from "./styles/app.css"

interface LoaderData {
  csrf: string
}

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "ContentBase Admin Dashboard",
  viewport: "width=device-width,initial-scale=1",
})

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }]

export async function loader({ request }: LoaderArgs) {
  const session = await getSession(request.headers.get("cookie"))
  const token = createAuthenticityToken(session)
  return json<LoaderData>(
    { csrf: token },
    { headers: { "Set-Cookie": await commitSession(session) } }
  )
}

export default function App() {
  const { csrf } = useLoaderData<{ csrf: string }>()

  return (
    <AuthenticityTokenProvider token={csrf || ""}>
      <html lang="en">
        <head>
          <Meta />
          <Links />
        </head>
        <body className="text-center text-gray-700">
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    </AuthenticityTokenProvider>
  )
}
