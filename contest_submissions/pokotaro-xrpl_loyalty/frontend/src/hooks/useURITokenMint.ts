import { useState } from 'react'
import { URITokenMintFlags, convertStringToHex } from '@transia/xrpl'
import { XRPLClient } from '@/libs/XRPLClient'
import { useBaseHook } from '@/hooks/core/useBaseHook'
import { generate256BitHash } from '@/utils'
import { BACKEND_API_URL } from '@/constants'

const xrplClient = new XRPLClient()

export const useURITokenMint = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const { execute } = useBaseHook()

  const mint = async (employeeId: string, destination: string) => {
    try {
      setLoading(true)

      const degit = generate256BitHash(employeeId)
      const companyWallet = xrplClient.companyWallet()

      await execute(async () => {
        await xrplClient.submitURITokenMint(
          {
            TransactionType: 'URITokenMint',
            Amount: '0',
            Account: companyWallet.address,
            Destination: destination,
            Digest: degit,
            URI: convertStringToHex(`${BACKEND_API_URL}/uritokens/${degit}`),
            Flags: URITokenMintFlags.tfBurnable
          },
          companyWallet
        )
      })
    } catch (error) {
      console.error(error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return {
    mint,
    loading
  }
}
