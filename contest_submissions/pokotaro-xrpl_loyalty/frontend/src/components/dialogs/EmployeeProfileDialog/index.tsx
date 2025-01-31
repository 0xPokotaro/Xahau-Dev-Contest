'use client'

import type { Employee } from '@/types'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid2'
import IconButton from '@mui/material/IconButton'
import LinearProgress from '@mui/material/LinearProgress'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'
import IDCard from '@/components/idcards/IDCard'
import { useURITokenGet } from '@/hooks/useURITokenGet'
import { useURITokenMint } from '@/hooks/useURITokenMint'
import { useURITokenBurn } from '@/hooks/useURITokenBurn'
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
  // States
  const [mintBurnLoading, setMintBurnLoading] = useState<boolean>(false)

  // Hooks
  const { enqueueSnackbar } = useSnackbar()

  const {
    data: uriToken,
    fetch: fetchURIToken,
    loading: uriTokenLoading
  } = useURITokenGet()

  const { mint } = useURITokenMint()

  const { burn } = useURITokenBurn()

  // Effects
  useEffect(() => {
    if (open) {
      fetchURIToken({ account: employee.address })
    }
  }, [open])

  // Event handlers
  const truncateHash = (hash: string): string => {
    if (hash.length <= 20) return hash
    return `${hash.substring(0, 10)}...${hash.substring(hash.length - 10)}`
  }

  const handleMint = async () => {
    try {
      setMintBurnLoading(true)
      await mint(employee.id.toString(), employee.address)
      await fetchURIToken({ account: employee.address })

      enqueueSnackbar('Minted successfully', { variant: 'success' })
    } catch (error) {
      console.error(error)
      enqueueSnackbar('Failed to mint', { variant: 'error' })
    } finally {
      setMintBurnLoading(false)
    }
  }

  const handleBurn = async () => {
    try {
      setMintBurnLoading(true)
      if (!uriToken) {
        throw new Error('No URI token found')
      }

      await burn(uriToken.tokenID)
      await fetchURIToken({ account: employee.address })

      enqueueSnackbar('Burned successfully', { variant: 'success' })
    } catch (error) {
      console.error(error)
      enqueueSnackbar('Failed to burn', { variant: 'error' })
    } finally {
      setMintBurnLoading(false)
    }
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
          <Typography>ID Card status</Typography>
        </Grid>
        <Grid size={8}>
          {uriToken == null && (
            <Chip label="Not minted" size="small" color="error" />
          )}
          {uriToken != null && uriToken.owner !== employee.address && (
            <Chip label="Not claimed" size="small" color="warning" />
          )}
          {uriToken != null && uriToken.owner === employee.address && (
            <Chip label="Claimed" size="small" color="success" />
          )}
        </Grid>
        <Grid size={12}>
          <Divider sx={{ my: 1 }} />
        </Grid>
      </>
    )
  }

  const IDCardItem = ({ imageURL }: { imageURL: string }) => {
    return (
      <Grid size={12} textAlign="center">
        <IDCard imageURL={imageURL} />
      </Grid>
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
              {uriToken != null && uriToken.image && (
                <IDCardItem imageURL={uriToken.image} />
              )}
            </>
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        {!uriTokenLoading && uriToken == null && (
          <Button
            variant="contained"
            loading={mintBurnLoading}
            disableElevation
            onClick={() => handleMint()}
          >
            Mint
          </Button>
        )}
        {uriToken != null && uriToken.image && (
          <Button
            variant="contained"
            color="error"
            loading={mintBurnLoading}
            disableElevation
            onClick={() => handleBurn()}
          >
            Burn
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}

export default EmployeeProfileDialog
