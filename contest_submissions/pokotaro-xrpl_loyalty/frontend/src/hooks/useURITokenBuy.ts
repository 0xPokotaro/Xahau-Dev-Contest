import { useState } from 'react'
import { Wallet } from '@transia/xrpl'
import { XRPLClient } from '@/libs/XRPLClient'
import { useBaseHook } from '@/hooks/core/useBaseHook'

const xrplClient = new XRPLClient()

export const useURITokenBuy = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const { execute } = useBaseHook()

  const buy = async (tokenID: string, wallet: Wallet) => {
    try {
      setLoading(true)

      const response = await execute(async () => {
        return await xrplClient.submitURITokenBuy(
          {
            TransactionType: 'URITokenBuy',
            Account: wallet.address,
            URITokenID: tokenID,
            Amount: '0'
          },
          wallet
        )
      })

      console.log(response)
    } catch (error) {
      console.error(error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return {
    buy,
    loading
  }
}
