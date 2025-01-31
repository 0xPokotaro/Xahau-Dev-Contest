'use client'

import Typography from '@mui/material/Typography'

interface PageHeaderProps {
  title: string
}

const PageHeader = ({ title }: PageHeaderProps) => {
  return (
    <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'gray' }}>
      {title}
    </Typography>
  )
}

export default PageHeader
