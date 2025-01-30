import type { Metadata } from 'next'
import { APP_NAME } from '@/constants'
import Topbar from '@/components/layouts/Topbar'

export const metadata: Metadata = {
  title: APP_NAME,
  description: 'Company Management System'
}

const RootLayout = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <Topbar />
        {children}
      </body>
    </html>
  )
}

export default RootLayout
