import type { ActionArgs } from "@remix-run/node"
import { redirect } from "@remix-run/node"

import { getSession, destroySession } from "~/server/session.server"

export function loader() {
  return redirect("/login")
}

export async function action({ request }: ActionArgs) {
  const session = await getSession(request.headers.get("cookie"))
  return redirect("/", {
    headers: { "Set-Cookie": await destroySession(session) },
  })
}
