import { Form } from "@remix-run/react"

interface Props {
  logOut: () => void
  disabled?: boolean
}

export function LogOutButton({ logOut, disabled }: Props) {
  return (
    <div>
      <Form method="post" onSubmit={logOut}>
        <button type="submit" disabled={disabled}>
          Logout
        </button>
      </Form>
    </div>
  )
}
