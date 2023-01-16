import React from "react"

import {
  useGetProfileContractAddressFromFollowContract,
  useUpdateProfileContractAddressForFollowContract,
} from "~/hooks/followContract"

export function Follow() {
  const [profileAddress, setProfileAddress] = React.useState("")
  const { refetch } = useGetProfileContractAddressFromFollowContract()
  const { write, isLoading, isSuccess, error, isError } =
    useUpdateProfileContractAddressForFollowContract(profileAddress)

  React.useEffect(() => {
    if (isSuccess) {
      if (refetch) refetch()
      setProfileAddress("")
    }
  }, [isSuccess, refetch])

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    if (!profileAddress || !write) return
    e.preventDefault()
    write()
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setProfileAddress(e.target.value)
  }

  return (
    <div className="mb-10">
      <h2>Follow Contract</h2>
      <form className="border-2 border-blue-300" onSubmit={submit}>
        <div className="my-0 mx-auto w-1/3 border-2 border-red-300">
          <label className="block">
            Profile Contract Address
            <abbr title="This field is mandatory" aria-label="required">
              *
            </abbr>
            <input
              type="text"
              name="profile-address"
              required
              className="block w-full px-2"
              onChange={handleChange}
              value={profileAddress}
            />
          </label>
        </div>
        <div>
          <button type="submit" disabled={!write || isLoading}>
            {isLoading ? "Processing" : "Submit"}
          </button>
        </div>
        <div>
          <p>{!isError && isSuccess ? "Update successful" : <>&nbsp;</>}</p>
          <p>{error ? <>{error.message}</> : <>&nbsp;</>}</p>
        </div>
      </form>
    </div>
  )
}
