'use client'

import type { Employee } from '@/types'
import { useEffect, useState } from 'react'
import Chip from '@mui/material/Chip'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid2'
import IconButton from '@mui/material/IconButton'
import LinearProgress from '@mui/material/LinearProgress'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'
import { useURITokenGet } from '@/hooks/useURITokenGet'

interface EmployeeProfileDialogProps {
  open: boolean
  onClose: () => void
  employee: Employee
}

const EmployeeProfileDialog = ({
  open,
  onClose,
  employee
}: EmployeeProfileDialogProps) => {
  // Hooks
  const {
    data: uriToken,
    fetch: fetchURIToken,
    loading: uriTokenLoading
  } = useURITokenGet()

  // Effects
  useEffect(() => {
    if (open) {
      fetchURIToken({ account: employee.address, digest: employee.digest })
    }
  }, [open])

  useEffect(() => {
    console.log('data: ', uriToken)
  }, [uriToken])

  // Event handlers
  const truncateHash = (hash: string): string => {
    if (hash.length <= 20) return hash
    return `${hash.substring(0, 10)}...${hash.substring(hash.length - 10)}`
  }

  const ProfileItem = ({
    label,
    value,
    showDivider = true
  }: { label: string; value: string | number; showDivider?: boolean }) => {
    return (
      <>
        <Grid size={4}>
          <Typography>{label}</Typography>
        </Grid>
        <Grid size={8}>
          <Typography>{value}</Typography>
        </Grid>
        {showDivider && (
          <Grid size={12}>
            <Divider sx={{ my: 1 }} />
          </Grid>
        )}
      </>
    )
  }

  const URITokenItem = () => {
    return (
      <>
        <Grid size={4}>
          <Typography>URIToken</Typography>
        </Grid>
        <Grid size={8}>
          {uriToken == null && (
            <Chip label="Not minted" size="small" color="error" />
          )}
          {uriToken != null && uriToken.owner === employee.address && (
            <Chip label="Not claimed" size="small" color="warning" />
          )}
          {uriToken != null && uriToken.owner !== employee.address && (
            <Chip label="Claimed" size="small" color="success" />
          )}
        </Grid>
        <Grid size={12}>
          <Divider sx={{ my: 1 }} />
        </Grid>
      </>
    )
  }

  return (
    <Dialog open={open} fullWidth maxWidth="sm">
      <IconButton
        aria-label="close"
        onClick={() => onClose()}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8
        }}
      >
        <CloseIcon />
      </IconButton>
      {uriTokenLoading && <LinearProgress color="primary" />}
      <DialogTitle>Employee Profile</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <ProfileItem label="ID" value={employee.id} />
          <ProfileItem label="Digest" value={truncateHash(employee.digest)} />
          <ProfileItem label="Address" value={employee.address} />
          <ProfileItem label="Name" value={employee.name} />
          {uriTokenLoading ? (
            <Grid size={12}>
              <Skeleton variant="rounded" height={200} />
            </Grid>
          ) : (
            <>
              <URITokenItem />
            </>
          )}
        </Grid>
      </DialogContent>
    </Dialog>
  )
}

export default EmployeeProfileDialog
