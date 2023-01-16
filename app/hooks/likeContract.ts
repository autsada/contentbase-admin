import {
  useContractRead,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi"

import LikeContractV1Dev from "~/abis/localhost/ContentBaseLikeV1.json"
import LikeContractV1Test from "~/abis/testnet/ContentBaseLikeV1.json"
import type { ENV } from "~/types"

let NODE_ENV: ENV = "development"

if (typeof window !== "undefined") {
  NODE_ENV = window.ENV.NODE_ENV
}

const contractInfo =
  NODE_ENV === "development" ? LikeContractV1Dev : LikeContractV1Test

export function useGetProfileContractAddressFromLikeContract() {
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

export function useUpdateProfileContractAddressForLikeContract(
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

export function useGetPublishContractAddressFromLikeContract() {
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

export function useUpdatePublishContractAddressForLikeContract(
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

export function useGetPlatformFee() {
  const { data, isError, isLoading, error, refetch } = useContractRead({
    address: contractInfo.address as any,
    abi: [
      {
        type: "function",
        name: "platformFee",
        constant: true,
        stateMutability: "view",
        payable: false,
        inputs: [],
        outputs: [{ type: "uint256" }],
      },
    ],
    functionName: "platformFee",
  })

  return { data: data?.toNumber(), isError, error, isLoading, refetch }
}

export function useUpdatePlatformFee(fee: number) {
  const { config } = usePrepareContractWrite({
    address: contractInfo.address as any,
    abi: [
      {
        type: "function",
        name: "updatePlatformFee",
        constant: false,
        payable: false,
        inputs: [{ type: "uint256", name: "fee" }],
        outputs: [],
      },
    ],
    functionName: "updatePlatformFee",
    args: [fee],
    enabled: Boolean(fee),
  })
  const { data, write } = useContractWrite(config)
  const { isLoading, isSuccess, isError, error } = useWaitForTransaction({
    hash: data?.hash,
  })

  return { write, isLoading, isSuccess, isError, error }
}

export function useGetPriceFeedContractAddress() {
  const { data, isError, isLoading, error, refetch } = useContractRead({
    address: contractInfo.address as any,
    abi: [
      {
        type: "function",
        name: "ethToUsdPriceFeedContract",
        constant: true,
        stateMutability: "view",
        payable: false,
        inputs: [],
        outputs: [{ type: "address" }],
      },
    ],
    functionName: "ethToUsdPriceFeedContract",
  })

  return { data: data as string, isError, error, isLoading, refetch }
}

export function useUpdatePriceFeedContract(contractAddress: string) {
  const { config } = usePrepareContractWrite({
    address: contractInfo.address as any,
    abi: [
      {
        type: "function",
        name: "updatePriceFeedContract",
        constant: false,
        payable: false,
        inputs: [{ type: "address", name: "contractAddress" }],
        outputs: [],
      },
    ],
    functionName: "updatePriceFeedContract",
    args: [contractAddress],
    enabled: Boolean(contractAddress),
  })
  const { data, write } = useContractWrite(config)
  const { isLoading, isSuccess, isError, error } = useWaitForTransaction({
    hash: data?.hash,
  })

  return { write, isLoading, isSuccess, isError, error }
}
