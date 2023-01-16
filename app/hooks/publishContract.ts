import {
  useContractRead,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi"

import PublishContractV1Dev from "~/abis/localhost/ContentBasePublishV1.json"
import PublishContractV1Test from "~/abis/testnet/ContentBasePublishV1.json"
import type { ENV } from "~/types"

let NODE_ENV: ENV = "development"

if (typeof window !== "undefined") {
  NODE_ENV = window.ENV.NODE_ENV
}

const contractInfo =
  NODE_ENV === "development" ? PublishContractV1Dev : PublishContractV1Test

export function useGetProfileContractAddressFromPublishContract() {
  const { data, isError, isLoading, error, refetch } = useContractRead({
    address: contractInfo.address as any,
    abi: [
      {
        type: "function",
        name: "getProfileContract",
        constant: true,
        stateMutability: "view",
        payable: false,
        inputs: [],
        outputs: [{ type: "address" }],
      },
    ],
    functionName: "getProfileContract",
  })

  return { data: data as string, isError, error, isLoading, refetch }
}

export function useUpdateProfileContractAddressForPublishContract(
  profileContractAddress: string
) {
  const { config } = usePrepareContractWrite({
    address: contractInfo.address as any,
    abi: [
      {
        type: "function",
        name: "updateProfileContract",
        constant: false,
        payable: false,
        inputs: [{ type: "address", name: "contractAddress" }],
        outputs: [],
      },
    ],
    functionName: "updateProfileContract",
    args: [profileContractAddress],
    enabled: Boolean(profileContractAddress),
  })
  const { data, write } = useContractWrite(config)
  const { isLoading, isSuccess, isError, error } = useWaitForTransaction({
    hash: data?.hash,
  })

  return { write, isLoading, isSuccess, isError, error }
}
