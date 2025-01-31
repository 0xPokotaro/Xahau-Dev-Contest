'use client'

import { useEffect, useState } from 'react'
import { Wallet } from '@transia/xrpl'
import { SnackbarProvider, useSnackbar } from 'notistack'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import EmployeeCard from '@/components/cards/EmployeeCard'
import { useAccountStore } from '@/stores/useAccountStore'
import { useURITokenGet } from '@/hooks/useURITokenGet'
import { useURITokenBuy } from '@/hooks/useURITokenBuy'
import { useURITokenBurn } from '@/hooks/useURITokenBurn'
import { useWalletConnect } from '@/hooks/useWalletConnect'

const EmployeePage = () => {
  // States
  const [loading, setLoading] = useState<boolean>(false)

  // Hooks
  const { account } = useAccountStore()
  const { enqueueSnackbar } = useSnackbar()
  const { connect, disconnect } = useWalletConnect()
  const { data: uritoken, fetch, setData: setURIToken } = useURITokenGet()
  const { buy } = useURITokenBuy()
  const { burn } = useURITokenBurn()
  // Event handlers
  const handleDisconnect = async () => {
    try {
      setLoading(true)
      await disconnect()
      setURIToken(null)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleClaim = async (
    tokenID: string | undefined,
    wallet: Wallet | undefined
  ) => {
    try {
      setLoading(true)
      if (!tokenID || !wallet) {
        throw new Error('URIToken or account is not found')
      }

      await buy(tokenID, wallet)
      await fetch({ account: wallet.address })

      enqueueSnackbar('Claimed successfully', { variant: 'success' })
    } catch (error) {
      console.error(error)
      enqueueSnackbar('Claim failed', { variant: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const handleBurn = async (
    tokenID: string | undefined,
    wallet: Wallet | undefined
  ) => {
    try {
      setLoading(true)
      if (!tokenID || !wallet) {
        throw new Error('URIToken or account is not found')
      }

      await burn(tokenID)
      await fetch({ account: wallet.address })

      enqueueSnackbar('Claimed successfully', { variant: 'success' })
    } catch (error) {
      console.error(error)
      enqueueSnackbar('Claim failed', { variant: 'error' })
    } finally {
      setLoading(false)
    }
  }

  // Effects
  useEffect(() => {
    if (account !== null) {
      setLoading(true)
      fetch({ account: account.wallet.address })
        .then(() => {
          setLoading(false)
        })
        .catch((error) => {
          console.error(error)
          setLoading(false)
        })
    }
  }, [account])

  useEffect(() => {
    if (uritoken) {
      console.log(uritoken)
    }
  }, [uritoken])

  const PageContainer = ({ children }: { children: React.ReactNode }) => {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '90vh'
        }}
      >
        {children}
      </Box>
    )
  }

  const WalletSection = () => {
    return (
      <>
        {account === null && (
          <Button
            variant="contained"
            disableElevation
            loading={loading}
            onClick={connect}
          >
            Connect
          </Button>
        )}
        {account !== null && (
          <Button
            variant="outlined"
            disableElevation
            loading={loading}
            onClick={handleDisconnect}
          >
            Disconnect
          </Button>
        )}
      </>
    )
  }

  return (
    <PageContainer>
      <SnackbarProvider autoHideDuration={3000}>
        {account && (
          <EmployeeCard
            loading={loading}
            uritoken={uritoken}
            handleBuy={() => handleClaim(uritoken?.tokenID, account.wallet)}
            handleBurn={() => handleBurn(uritoken?.tokenID, account.wallet)}
          />
        )}
        <WalletSection />
      </SnackbarProvider>
    </PageContainer>
  )
}

export default EmployeePage
