'use client'

import { SnackbarProvider } from 'notistack'
import PageContainer from '@/components/layouts/PageContainer'
import PageHeader from '@/components/layouts/PageHeader'
import EmployeesTable from '@/components/tables/EmployeesTable'
import { useEmployeesList } from '@/hooks/useEmployeesList'

const CompanyPage = () => {
  const { data: employees } = useEmployeesList()

  return (
    <SnackbarProvider autoHideDuration={3000}>
      <PageContainer maxWidth="lg">
        <PageHeader title="Company" />
        <EmployeesTable employees={employees} />
      </PageContainer>
    </SnackbarProvider>
  )
}

export default CompanyPage
