import React from "react"
import { Form } from "@remix-run/react"
import { useWeb3Modal } from "@web3modal/react"

interface Props {
  processing: boolean
  setProcessing: (processing: boolean) => void
  disabled?: boolean
}

export function ConnectButton({ processing, setProcessing, disabled }: Props) {
  const { open } = useWeb3Modal()

  async function openModal() {
    setProcessing(true)
    await open()
  }

  return (
    <div className="mt-6 flex-col items-center">
      <Form method="post" onSubmit={openModal}>
        <button type="submit" disabled={disabled}>
          {processing ? "Connecting..." : "Connect Wallet"}
        </button>
      </Form>
    </div>
  )
}
