'use client'

import { useState } from 'react'
import { Wallet } from '@transia/xrpl'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import IconButton from '@mui/material/IconButton'
import LinearProgress from '@mui/material/LinearProgress'
import Typography from '@mui/material/Typography'
import { useAccountStore } from '@/stores/useAccountStore'
import IDCard from '@/components/idcards/IDCard'

interface EmployeeCardProps {
  loading: boolean
  uritoken: any
  handleBuy: () => void
  handleBurn: () => void
}

const EmployeeCard = ({
  loading,
  uritoken,
  handleBuy,
  handleBurn
}: EmployeeCardProps) => {
  const [loadingClaim, setLoadingClaim] = useState<boolean>(false)
  const { account } = useAccountStore()

  const MenuButton = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      event.stopPropagation()
      setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
      setAnchorEl(null)
    }

    const handleClaim = async () => {
      try {
        setLoadingClaim(true)
        await handleBuy()
        handleClose()
      } catch (error) {
        console.error(error)
      } finally {
        console.log('finally')
        setLoadingClaim(false)
      }
    }

    return (
      <Box>
        {uritoken && (
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? 'card-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <MoreVertIcon />
          </IconButton>
        )}

        <Menu
          id="card-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          slotProps={{
            paper: {
              sx: {
                mt: 1
              }
            }
          }}
          MenuListProps={{
            'aria-labelledby': 'card-menu-button'
          }}
        >
          {uritoken && uritoken.owner !== account?.wallet.address && (
            <MenuItem disabled={loading} onClick={handleClaim}>
              Claim
            </MenuItem>
          )}
          {uritoken && uritoken.owner === account?.wallet.address && (
            <MenuItem disabled={loading} onClick={handleBurn}>
              Burn
            </MenuItem>
          )}
        </Menu>
      </Box>
    )
  }

  return (
    <Card sx={{ mb: 2 }}>
      {(loading || loadingClaim) && <LinearProgress />}
      {loadingClaim && <LinearProgress color="success" />}
      <CardHeader
        title="ID Card"
        subheader={account?.wallet.address}
        action={<MenuButton />}
      />
      <CardContent>
        {uritoken && <IDCard imageURL={uritoken.image} />}
        {!uritoken && !loading && (
          <Typography variant="h6" color="error" textAlign="center">
            No ID Card
          </Typography>
        )}
      </CardContent>
    </Card>
  )
}

export default EmployeeCard
