'use client'

import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'

const EmployeeTableHeader = () => (
  <TableHead>
    <TableRow>
      <TableCell>ID</TableCell>
      <TableCell>Name</TableCell>
      <TableCell>Address</TableCell>
      <TableCell>Actions</TableCell>
    </TableRow>
  </TableHead>
)

export default EmployeeTableHeader
