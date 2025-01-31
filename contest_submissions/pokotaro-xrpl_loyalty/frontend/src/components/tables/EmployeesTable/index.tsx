'use client'

import type { Employee } from '@/types'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import EmployeeTableHeader from './EmployeesTableHeader'
import EmployeeTableRow from './EmployeesTableRow'

interface EmployeesTableProps {
  employees: Employee[]
}

const EmployeesTable = ({ employees }: EmployeesTableProps) => {
  return (
    <Table>
      <EmployeeTableHeader />
      <TableBody>
        {employees.map((employee) => (
          <EmployeeTableRow key={employee.id} employee={employee} />
        ))}
      </TableBody>
    </Table>
  )
}

export default EmployeesTable
