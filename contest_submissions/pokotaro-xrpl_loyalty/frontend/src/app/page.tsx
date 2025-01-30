'use client'

import { useRouter } from 'next/navigation'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

const Home = () => {
  const router = useRouter()

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        gap: 1
      }}
    >
      <Button
        variant="contained"
        disableElevation
        onClick={() => router.push('/employee')}
      >
        Employee
      </Button>
      <Button
        variant="contained"
        disableElevation
        onClick={() => router.push('/company')}
      >
        Company
      </Button>
    </Box>
  )
}

export default Home
