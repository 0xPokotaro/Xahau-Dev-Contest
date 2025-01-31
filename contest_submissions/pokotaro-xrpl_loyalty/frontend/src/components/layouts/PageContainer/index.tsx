'use client'

import Container from '@mui/material/Container'

type PageContainerProps = {
  children: React.ReactNode
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const PageContainer = ({ children, maxWidth = 'xl' }: PageContainerProps) => {
  return (
    <Container maxWidth={maxWidth} sx={{ py: 10 }}>
      {children}
    </Container>
  )
}

export default PageContainer
