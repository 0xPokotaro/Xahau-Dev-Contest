'use client'

import { useEffect } from 'react'
import { SnackbarProvider } from 'notistack'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useAccountStore } from '@/stores/useAccountStore'
import { useURITokenGet } from '@/hooks/useURITokenGet'
import { useWalletConnect } from '@/hooks/useWalletConnect'

const EmployeePage = () => {
  // Hooks
  const { account } = useAccountStore()
  const { connect, disconnect } = useWalletConnect()
  const { data: uritoken, fetch } = useURITokenGet()

  // Effects
  useEffect(() => {
    if (account !== null) {
      fetch({ account: account.wallet.address })
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
          <Button variant="contained" disableElevation onClick={connect}>
            Connect
          </Button>
        )}
        {account !== null && (
          <Button variant="outlined" disableElevation onClick={disconnect}>
            Disconnect
          </Button>
        )}
      </>
    )
  }

  const EmployeeURITokenSection = () => {
    return <>hoge</>
  }

  return (
    <SnackbarProvider autoHideDuration={3000}>
      <PageContainer>
        <EmployeeURITokenSection />
        <WalletSection />
      </PageContainer>
    </SnackbarProvider>
  )
}

export default EmployeePage
