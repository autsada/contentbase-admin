import type { MetaFunction, LinksFunction, LoaderArgs } from "@remix-run/node"
import { json } from "@remix-run/node"
import { AuthenticityTokenProvider, createAuthenticityToken } from "remix-utils"
import { WagmiConfig } from "wagmi"
import { Web3Modal } from "@web3modal/react"

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
import { wagmiClient, ethereumClient } from "./ethereum/client"
import { WALLET_CONNECT_PROJECT_ID } from "./utils/constants"
import type { ENV } from "./types"
import styles from "./styles/app.css"

interface LoaderData {
  csrf: string
  ENV: {
    NODE_ENV: ENV
  }
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
    {
      csrf: token,
      ENV: {
        // NODE_ENV: process.env.NODE_ENV,
        NODE_ENV: "test",
      },
    },
    { headers: { "Set-Cookie": await commitSession(session) } }
  )
}

function Document({
  children,
  title = "ContentBase Admin Dashboard",
}: {
  children: React.ReactNode
  title?: string
}) {
  const { csrf, ENV } = useLoaderData<LoaderData>()

  return (
    <AuthenticityTokenProvider token={csrf || ""}>
      <html lang="en">
        <head>
          <Meta />
          <title>{title}</title>
          <Links />
        </head>
        <body className="text-center text-gray-700">
          {children}
          <ScrollRestoration />
          <script
            // Add `ENV` to the window object
            dangerouslySetInnerHTML={{
              __html: `window.ENV = ${JSON.stringify(ENV)}`,
            }}
          />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    </AuthenticityTokenProvider>
  )
}

export default function App() {
  return (
    <Document>
      <WagmiConfig client={wagmiClient}>
        <Outlet />
      </WagmiConfig>

      {/* The Modal to connect to wallet */}
      <Web3Modal
        projectId={WALLET_CONNECT_PROJECT_ID}
        ethereumClient={ethereumClient}
      />
    </Document>
  )
}
