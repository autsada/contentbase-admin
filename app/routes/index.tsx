import type { LoaderArgs } from "@remix-run/node"
import { json } from "@remix-run/node"

import { requireAuth } from "~/server/auth.server"

export const loader = async ({ request }: LoaderArgs) => {
  const user = await requireAuth(request)
  return json({ user })
}

export default function Dashboard() {
  return (
    <div>
      <h3 className="text-3xl">Dashboard page</h3>
    </div>
  )
}
