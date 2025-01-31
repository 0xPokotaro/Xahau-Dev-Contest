'use client'

import { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import MenuIcon from '@mui/icons-material/Menu'
import Sidebar from '@/components/layouts/Sidebar'
import { APP_NAME } from '@/constants'

const Topbar = () => {
  const [open, setOpen] = useState(false)

  const toggleDrawer = (newOpen: boolean) => {
    setOpen(newOpen)
  }

  return (
    <>
      <AppBar>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="div" sx={{ flexGrow: 1 }}>
            {APP_NAME}
          </Typography>
          <Box
            sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}
          >
            <Button variant="outlined" color="inherit">
              Connect
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Sidebar open={open} toggleDrawer={toggleDrawer} />
    </>
  )
}

export default Topbar
