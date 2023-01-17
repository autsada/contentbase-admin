import React from "react"

import {
  useGetProfileContractAddressFromLikeContract,
  useUpdateProfileContractAddressForLikeContract,
  useGetPublishContractAddressFromLikeContract,
  useUpdatePublishContractAddressForLikeContract,
  useGetPlatformFee,
  useUpdatePlatformFee,
  useGetPriceFeedContractAddress,
  useUpdatePriceFeedContract,
  useGetLikeFeeRate,
  useUpdateLikeFeeRate,
} from "~/hooks/likeContract"

function UpdateProfileAddress() {
  const [profileAddress, setProfileAddress] = React.useState("")
  const { refetch } = useGetProfileContractAddressFromLikeContract()
  const { write, isLoading, isSuccess, error, isError } =
    useUpdateProfileContractAddressForLikeContract(profileAddress)

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

  //   console.log("profile address/like -->", data)
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
  const { refetch } = useGetPublishContractAddressFromLikeContract()
  const { write, isLoading, isSuccess, error, isError } =
    useUpdatePublishContractAddressForLikeContract(publishAddress)

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

  //   console.log("publish address/like -->", data)
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

function UpdatePlatformFee() {
  const [fee, setFee] = React.useState(10)
  const { refetch } = useGetPlatformFee()
  const { write, isLoading, isSuccess, error, isError } =
    useUpdatePlatformFee(fee)

  React.useEffect(() => {
    if (isSuccess) {
      if (refetch) refetch()
      setFee(10)
    }
  }, [isSuccess, refetch])

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    if (typeof fee !== "number" || !fee || fee < 0 || fee > 100 || !write)
      return
    e.preventDefault()
    write()
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFee(Number(e.target.value))
  }

  //   console.log("platform fee/like -->", data)
  return (
    <form className="border-2 border-blue-300" onSubmit={submit}>
      <div className="my-0 mx-auto w-1/3 border-2 border-red-300">
        <label className="block">
          Platform Fee
          <abbr title="This field is mandatory" aria-label="required">
            *
          </abbr>
          <input
            type="number"
            name="platform-fee"
            required
            min={1}
            className="block w-full px-2"
            onChange={handleChange}
            value={fee}
          />
        </label>
      </div>
      <div>
        <button
          type="submit"
          disabled={fee < 0 || fee > 100 || !write || isLoading}
        >
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

function UpdatePriceFeedContract() {
  const [contractAddress, setContractAddress] = React.useState("")
  const { refetch } = useGetPriceFeedContractAddress()
  const { write, isLoading, isSuccess, error, isError } =
    useUpdatePriceFeedContract(contractAddress)

  React.useEffect(() => {
    if (isSuccess) {
      if (refetch) refetch()
      setContractAddress("")
    }
  }, [isSuccess, refetch])

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    if (!contractAddress || !write) return
    e.preventDefault()
    write()
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setContractAddress(e.target.value)
  }

  //   console.log("price feed address/like -->", data)
  return (
    <form className="border-2 border-blue-300" onSubmit={submit}>
      <div className="my-0 mx-auto w-1/3 border-2 border-red-300">
        <label className="block">
          Price Feed Contract
          <abbr title="This field is mandatory" aria-label="required">
            *
          </abbr>
          <input
            type="text"
            name="price-feed"
            required
            className="block w-full px-2"
            onChange={handleChange}
            value={contractAddress}
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

function UpdateLikeFeeRate() {
  const [fee, setFee] = React.useState(10)
  const { data, refetch } = useGetLikeFeeRate()
  const { write, isLoading, isSuccess, error, isError } =
    useUpdateLikeFeeRate(fee)

  React.useEffect(() => {
    if (isSuccess) {
      if (refetch) refetch()
      setFee(10)
    }
  }, [isSuccess, refetch])

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    if (typeof fee !== "number" || !fee || fee < 0 || fee > 100 || !write)
      return
    e.preventDefault()
    write()
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFee(Number(e.target.value))
  }

  console.log("like fee rate/like -->", data)
  return (
    <form className="border-2 border-blue-300" onSubmit={submit}>
      <div className="my-0 mx-auto w-1/3 border-2 border-red-300">
        <label className="block">
          Like Fee Rate
          <abbr title="This field is mandatory" aria-label="required">
            *
          </abbr>
          <input
            type="number"
            name="like-fee-rate"
            required
            min={1}
            className="block w-full px-2"
            onChange={handleChange}
            value={fee}
          />
        </label>
      </div>
      <div>
        <button
          type="submit"
          disabled={fee < 0 || fee > 100 || !write || isLoading}
        >
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

export function Like() {
  return (
    <div className="mb-10">
      <h2>Like Contract</h2>
      <UpdateProfileAddress />
      <UpdatePublishAddress />
      <UpdatePlatformFee />
      <UpdatePriceFeedContract />
      <UpdateLikeFeeRate />
    </div>
  )
}
