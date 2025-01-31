import { XRPLClient } from '@/libs/XRPLClient'
import { useAccountStore } from '@/stores/useAccountStore'

const xrplClient = new XRPLClient()

export const useWalletConnect = () => {
  const { setAccount, resetAccount } = useAccountStore()

  const connect = async () => {
    try {
      const wallet = xrplClient.employeeWallet()
      setAccount({ wallet, isConnected: true })
    } catch (error) {
      console.error(error)
    }
  }

  const disconnect = () => {
    resetAccount()
  }

  return { connect, disconnect }
}
