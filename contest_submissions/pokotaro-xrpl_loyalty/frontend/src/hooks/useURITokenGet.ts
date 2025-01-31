import axios from 'axios'
import { useState } from 'react'
import { useBaseHook } from '@/hooks/core/useBaseHook'
import { XRPLClient } from '@/libs/XRPLClient'
import { hexToString } from '@/utils/hex'

interface FetchParams {
  account: string
}

const xrplClient = new XRPLClient()

const getURIToken = async (uri: string, tokenID: string) => {
  const { data } = await axios.get(uri, {
    params: {
      tokenID
    }
  })

  return data
}

export const useURITokenGet = () => {
  // States
  const [data, setData] = useState<{
    owner: string
    tokenID: string
    image: string
  } | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  // Hooks
  const { execute } = useBaseHook()

  // Event handlers
  const fetch = async ({ account }: FetchParams) => {
    try {
      setLoading(true)

      const companyWallet = xrplClient.companyWallet()

      const [employeeURIToken, companyURIToken] = await execute(async () => {
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
          employeeResponse.result.account_objects
            .filter(
              (object: any) => object.LedgerEntryType === 'URIToken',
              (object: any) => object.Issuer === companyWallet.address,
              (object: any) => object.Owner === account
            )
            .shift(),
          companyResponse.result.account_objects
            .filter(
              (object: any) => object.LedgerEntryType === 'URIToken',
              (object: any) => object.Issuer === companyWallet.address,
              (object: any) => object.Destination === account
            )
            .shift()
        ]
      })

      console.log('employeeURIToken: ', employeeURIToken)
      console.log('companyURIToken: ', companyURIToken)

      if (employeeURIToken) {
        const uri = hexToString(employeeURIToken.URI)
        const uritoken = await getURIToken(uri, employeeURIToken.index)

        setData({
          owner: employeeURIToken.Owner,
          tokenID: employeeURIToken.index,
          image: uritoken.image
        })
      } else if (companyURIToken) {
        const uri = hexToString(companyURIToken.URI)
        const uritoken = await getURIToken(uri, companyURIToken.index)

        setData({
          owner: companyURIToken.Owner,
          tokenID: companyURIToken.index,
          image: uritoken.image
        })
      } else {
        setData(null)
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
    fetch,
    setData
  }
}
