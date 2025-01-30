import { Client, Wallet } from '@transia/xrpl'
import { XAHAU_WSS_ENDPOINT } from '@/constants'

export class XRPLClient {
  private static instance: Client

  private constructor() {}

  public static getInstance(): Client {
    if (!XRPLClient.instance) {
      XRPLClient.instance = new Client(XAHAU_WSS_ENDPOINT)
    }
    return XRPLClient.instance
  }

  // ==============================
  // public methods
  // ==============================

  async multiRequest(requests: any[]) {
    try {
      return await this.#withConnection(async () => {
        return await Promise.all(
          requests.map((request) => this.#request(request))
        )
      })
    } catch (error) {
      console.error('XRPLClient: multiRequest: ', error)
      throw error
    }
  }

  async multiSubmit(params: { tx: any; wallet: Wallet }[]) {
    try {
      return await this.#withConnection(async () => {
        return await Promise.all(
          params.map(async ({ tx, wallet }) => {
            tx.NetworkID = await XRPLClient.getInstance().getNetworkID()
            return await this.#submit(tx, wallet)
          })
        )
      })
    } catch (error) {
      console.error('XRPLClient: multiSubmit: ', error)
      throw error
    }
  }

  // ==============================
  // private methods
  // ==============================

  async #withConnection(operation: () => Promise<any>) {
    try {
      await XRPLClient.getInstance().connect()
      return await operation()
    } catch (error) {
      throw error
    } finally {
      await XRPLClient.getInstance().disconnect()
    }
  }

  async #request(request: any) {
    try {
      return await XRPLClient.getInstance().request(request)
    } catch (error) {
      console.error('XRPLClient: #request: ', error)
      throw error
    }
  }

  async #submit(transaction: any, wallet: Wallet) {
    try {
      transaction.NetworkID = await XRPLClient.getInstance().getNetworkID()
      return await XRPLClient.getInstance().submitAndWait(transaction, {
        wallet,
        autofill: true
      })
    } catch (error) {
      console.error('XRPLClient: #submit: ', error)
      throw error
    }
  }
}
