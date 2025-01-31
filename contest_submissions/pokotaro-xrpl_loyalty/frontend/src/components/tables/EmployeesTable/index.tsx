'use client'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import EmployeeTableHeader from './EmployeesTableHeader'
import EmployeeTableRow from './EmployeesTableRow'

const EmployeesTable = () => {
  return (
    <Table>
      <EmployeeTableHeader />
      <TableBody>
        <EmployeeTableRow />
      </TableBody>
    </Table>
  )
}

export default EmployeesTable
