import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'XRPL Loyalty',
  description: 'An Employee Reward Management System Powered by XRP Ledger 🎯'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
