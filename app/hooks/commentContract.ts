import {
  useContractRead,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi"

import CommentContractV1Dev from "~/abis/localhost/ContentBaseCommentV1.json"
import CommentContractV1Test from "~/abis/testnet/ContentBaseCommentV1.json"
import type { ENV } from "~/types"

let NODE_ENV: ENV = "development"

if (typeof window !== "undefined") {
  NODE_ENV = window.ENV.NODE_ENV
}

const contractInfo =
  NODE_ENV === "development" ? CommentContractV1Dev : CommentContractV1Test

export function useGetProfileContractAddressFromCommentContract() {
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

export function useUpdateProfileContractAddressForCommentContract(
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

export function useGetPublishContractAddressFromCommentContract() {
  const { data, isError, isLoading, error, refetch } = useContractRead({
    address: contractInfo.address as any,
    abi: [
      {
        type: "function",
        name: "getPublishContract",
        constant: true,
        stateMutability: "view",
        payable: false,
        inputs: [],
        outputs: [{ type: "address" }],
      },
    ],
    functionName: "getPublishContract",
  })

  return { data: data as string, isError, error, isLoading, refetch }
}

export function useUpdatePublishContractAddressForCommentContract(
  publishContractAddress: string
) {
  const { config } = usePrepareContractWrite({
    address: contractInfo.address as any,
    abi: [
      {
        type: "function",
        name: "updatePublishContract",
        constant: false,
        payable: false,
        inputs: [{ type: "address", name: "contractAddress" }],
        outputs: [],
      },
    ],
    functionName: "updatePublishContract",
    args: [publishContractAddress],
    enabled: Boolean(publishContractAddress),
  })
  const { data, write } = useContractWrite(config)
  const { isLoading, isSuccess, isError, error } = useWaitForTransaction({
    hash: data?.hash,
  })

  return { write, isLoading, isSuccess, isError, error }
}
