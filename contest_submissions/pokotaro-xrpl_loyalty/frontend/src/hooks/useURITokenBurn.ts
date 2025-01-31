import { useState } from 'react'
import { XRPLClient } from '@/libs/XRPLClient'
import { useBaseHook } from '@/hooks/core/useBaseHook'

const xrplClient = new XRPLClient()

export const useURITokenBurn = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const { execute } = useBaseHook()

  const burn = async (tokenID: string, owner: string) => {
    try {
      setLoading(true)

      const companyWallet = xrplClient.companyWallet()

      await execute(async () => {
        await xrplClient.submitURITokenBurn(
          {
            TransactionType: 'URITokenBurn',
            Account: owner,
            URITokenID: tokenID
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
    burn,
    loading
  }
}
