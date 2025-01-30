'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'
// Icons
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import BadgeIcon from '@mui/icons-material/Badge'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import HomeIcon from '@mui/icons-material/Home'
import SendIcon from '@mui/icons-material/Send'
import SettingsIcon from '@mui/icons-material/Settings'
import WebhookIcon from '@mui/icons-material/Webhook'

interface SidebarProps {
  open: boolean
  toggleDrawer: (newOpen: boolean) => void
}

const Sidebar = ({ open, toggleDrawer }: SidebarProps) => {
  const router = useRouter()

  const [openSettings, setOpenSettings] = useState<boolean>(false)

  const handleClick = (href: string) => {
    router.push(href)
    toggleDrawer(false)
  }

  return (
    <Drawer anchor="left" open={open} onClose={() => toggleDrawer(false)}>
      <Box sx={{ width: 250 }}>
        <List>
          <ListSubheader>MENU</ListSubheader>
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleClick('/')}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => handleClick('/employees')}>
              <ListItemIcon>
                <BadgeIcon />
              </ListItemIcon>
              <ListItemText primary="Employees" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => handleClick('/tokens')}>
              <ListItemIcon>
                <AccountBalanceIcon />
              </ListItemIcon>
              <ListItemText primary="Tokens" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => handleClick('/hooks')}>
              <ListItemIcon>
                <WebhookIcon />
              </ListItemIcon>
              <ListItemText primary="Hooks" />
            </ListItemButton>
          </ListItem>

          <ListItemButton onClick={() => setOpenSettings(!openSettings)}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
            {openSettings ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openSettings} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => handleClick('/tx/genesis-mint')}
              >
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary="GenesisMint" />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
      </Box>
    </Drawer>
  )
}

export default Sidebar
