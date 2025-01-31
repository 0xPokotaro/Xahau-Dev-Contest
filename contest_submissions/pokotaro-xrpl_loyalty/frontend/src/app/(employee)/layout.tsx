import { APP_NAME } from '@/constants'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: APP_NAME,
  description: 'Employee Management System'
}

const EmployeeLayout = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  return children
}

export default EmployeeLayout
