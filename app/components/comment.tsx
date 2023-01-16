import React from "react"

import {
  useGetProfileContractAddressFromCommentContract,
  useUpdateProfileContractAddressForCommentContract,
  useGetPublishContractAddressFromCommentContract,
  useUpdatePublishContractAddressForCommentContract,
} from "~/hooks/commentContract"

function UpdateProfileAddress() {
  const [profileAddress, setProfileAddress] = React.useState("")
  const { refetch } = useGetProfileContractAddressFromCommentContract()
  const { write, isLoading, isSuccess, error, isError } =
    useUpdateProfileContractAddressForCommentContract(profileAddress)

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

  //   console.log("profile address/comment -->", data)
  return (
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
  )
}

function UpdatePublishAddress() {
  const [publishAddress, setPublishAddress] = React.useState("")
  const { refetch } = useGetPublishContractAddressFromCommentContract()
  const { write, isLoading, isSuccess, error, isError } =
    useUpdatePublishContractAddressForCommentContract(publishAddress)

  React.useEffect(() => {
    if (isSuccess) {
      if (refetch) refetch()
      setPublishAddress("")
    }
  }, [isSuccess, refetch])

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    if (!publishAddress || !write) return
    e.preventDefault()
    write()
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPublishAddress(e.target.value)
  }

  //   console.log("publish address/comment -->", data)
  return (
    <form className="border-2 border-blue-300" onSubmit={submit}>
      <div className="my-0 mx-auto w-1/3 border-2 border-red-300">
        <label className="block">
          Publish Contract Address
          <abbr title="This field is mandatory" aria-label="required">
            *
          </abbr>
          <input
            type="text"
            name="publish-address"
            required
            className="block w-full px-2"
            onChange={handleChange}
            value={publishAddress}
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
  )
}

export function Comment() {
  return (
    <div className="mb-10">
      <h2>Comment Contract</h2>
      <UpdateProfileAddress />
      <UpdatePublishAddress />
    </div>
  )
}
