import { useState } from 'react'
import { useBaseHook } from '@/hooks/core/useBaseHook'
import { XRPLClient } from '@/libs/XRPLClient'

interface FetchParams {
  account: string
  digest: string
}

const xrplClient = new XRPLClient()

export const useURITokenGet = () => {
  // States
  const [data, setData] = useState<{
    owner: string
    tokenID: string
  } | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  // Hooks
  const { execute } = useBaseHook()

  // Event handlers
  const fetch = async ({ account, digest }: FetchParams) => {
    try {
      setLoading(true)

      const companyWallet = xrplClient.companyWallet()

      const [employeeResponse, companyResponse] = await execute(async () => {
        const [employeeResponse, companyResponse] =
          await xrplClient.multiRequest([
            {
              command: 'account_objects',
              account,
              ledgerIndex: 'current'
            },
            {
              command: 'account_objects',
              account: companyWallet.address,
              ledgerIndex: 'current'
            }
          ])

        return [
          employeeResponse.result.account_objects.filter(
            (object: any) => object.LedgerEntryType === 'URIToken',
            (object: any) => object.Issuer === companyWallet.address
          ),
          companyResponse.result.account_objects.filter(
            (object: any) => object.LedgerEntryType === 'URIToken',
            (object: any) => object.Issuer === companyWallet.address
          )
        ]
      })

      const employeeURIToken = employeeResponse
        .filter((object: any) => object.Digest === digest)
        .shift()
      console.log('employeeURIToken: ', employeeURIToken)

      const companyURIToken = companyResponse
        .filter((object: any) => object.Digest === digest)
        .shift()
      console.log('companyURIToken: ', companyURIToken)

      if (employeeURIToken) {
        setData({
          owner: employeeURIToken.Owner,
          tokenID: employeeURIToken.index
        })
      }

      if (companyURIToken) {
        setData({
          owner: companyURIToken.Owner,
          tokenID: companyURIToken.index
        })
      }
    } catch (error) {
      console.error(error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return {
    data,
    loading,
    fetch
  }
}
