import { APP_NAME } from '@/constants'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: APP_NAME,
  description: 'Employee Management System'
}

const RootLayout = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}

export default RootLayout
