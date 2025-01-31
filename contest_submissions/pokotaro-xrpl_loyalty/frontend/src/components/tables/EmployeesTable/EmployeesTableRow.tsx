'use client'

import type { Employee } from '@/types'
import { useState } from 'react'
import Button from '@mui/material/Button'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import EmployeeProfileDialog from '@/components/dialogs/EmployeeProfileDialog'

type EmployeeTableRowProps = {
  employee: Employee
}

const EmployeeTableRow = ({ employee }: EmployeeTableRowProps) => {
  const [open, setOpen] = useState<boolean>(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <TableRow>
      <TableCell>{employee.id}</TableCell>
      <TableCell>{employee.name}</TableCell>
      <TableCell>{employee.address}</TableCell>
      <TableCell>
        <Button variant="contained" disableElevation onClick={handleOpen}>
          Detail
        </Button>
        <EmployeeProfileDialog
          open={open}
          onClose={handleClose}
          employee={employee}
        />
      </TableCell>
    </TableRow>
  )
}

export default EmployeeTableRow
