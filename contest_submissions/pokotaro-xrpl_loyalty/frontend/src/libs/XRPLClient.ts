import type {
  AccountObjectsRequest,
  AccountObjectsResponse,
  URITokenBurn,
  URITokenMint,
  URITokenBuy
} from '@transia/xrpl'
import { Client, Wallet } from '@transia/xrpl'
import { XAHAU_WSS_ENDPOINT, WALLET_SEEDS } from '@/constants'

export class XRPLClient {
  private client: Client

  constructor() {
    this.client = new Client(XAHAU_WSS_ENDPOINT)
  }

  // ==============================
  // public methods
  // ==============================

  companyWallet() {
    return Wallet.fromSeed(WALLET_SEEDS.COMPANY)
  }

  employeeWallet() {
    return Wallet.fromSeed(WALLET_SEEDS.ALICE)
  }

  async requestAccountObjects(
    request: AccountObjectsRequest
  ): Promise<AccountObjectsResponse> {
    return await this.#withConnection(async () => {
      const response = await this.#request(request)
      return response as AccountObjectsResponse
    })
  }

  async submitURITokenMint(tx: URITokenMint, executeWallet: Wallet) {
    return await this.#withConnection(async () => {
      return await this.#submit(tx, executeWallet)
    })
  }

  async submitURITokenBurn(tx: URITokenBurn, executeWallet: Wallet) {
    return await this.#withConnection(async () => {
      return await this.#submit(tx, executeWallet)
    })
  }

  async submitURITokenBuy(tx: URITokenBuy, executeWallet: Wallet) {
    return await this.#withConnection(async () => {
      return await this.#submit(tx, executeWallet)
    })
  }

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
            tx.NetworkID = await this.client.getNetworkID()
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
      await this.client.connect()
      return await operation()
    } catch (error) {
      throw error
    } finally {
      await this.client.disconnect()
    }
  }

  async #request(request: any) {
    try {
      return await this.client.request(request)
    } catch (error) {
      console.error('XRPLClient: #request: ', error)
      throw error
    }
  }

  async #submit(transaction: any, wallet: Wallet) {
    try {
      transaction.NetworkID = await this.client.getNetworkID()
      return await this.client.submitAndWait(transaction, {
        wallet,
        autofill: true
      })
    } catch (error) {
      console.error('XRPLClient: #submit: ', error)
      throw error
    }
  }
}
