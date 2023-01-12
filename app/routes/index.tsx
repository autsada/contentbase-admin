import type { LoaderArgs } from "@remix-run/node"
import { json } from "@remix-run/node"
import { Form, useLoaderData } from "@remix-run/react"

import { requireAuth } from "~/server/auth.server"

export const loader = async ({ request }: LoaderArgs) => {
  const user = await requireAuth(request)
  return json({ user })
}

export default function Dashboard() {
  const data = useLoaderData<typeof loader>()

  return (
    <div>
      <h3 className="text-3xl">Dashboard page</h3>

      {data.user && (
        <div className="mt-6">
          <Form action="/logout" method="post">
            <button type="submit">Logout</button>
          </Form>
        </div>
      )}
    </div>
  )
}
