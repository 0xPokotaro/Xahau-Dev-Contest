import { create } from 'zustand'
import { Wallet } from '@transia/xrpl'

export interface Account {
  wallet: Wallet
  isConnected: boolean
}

export interface AccountStore {
  account: Account | null
  setAccount: (account: Account) => void
  resetAccount: () => void
}

export const useAccountStore = create<AccountStore>((set) => ({
  account: null,
  setAccount: (account: Account) => set({ account }),
  resetAccount: () => set({ account: null })
}))
