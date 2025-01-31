import PageContainer from '@/components/layouts/PageContainer'
import PageHeader from '@/components/layouts/PageHeader'
import EmployeesTable from '@/components/tables/EmployeesTable'

const CompanyPage = () => {
  return (
    <PageContainer maxWidth="lg">
      <PageHeader title="Company" />
      <EmployeesTable />
    </PageContainer>
  )
}

export default CompanyPage
