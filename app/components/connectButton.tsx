import React from "react"
import { Form } from "@remix-run/react"
import { useWeb3Modal } from "@web3modal/react"

interface Props {
  processingLogin: boolean
  connectingWallet: boolean
  disabled?: boolean
}

export function ConnectButton({
  processingLogin,
  connectingWallet,
  disabled,
}: Props) {
  const { open } = useWeb3Modal()

  async function openModal() {
    await open()
  }

  return (
    <div className="mt-6 flex-col items-center">
      <Form method="post" onSubmit={openModal}>
        <button type="submit" disabled={disabled}>
          {connectingWallet || processingLogin
            ? "Connecting..."
            : "Connect Wallet"}
        </button>
      </Form>
    </div>
  )
}
