import { NextResponse } from 'next/server'
import { prisma } from '@/libs/PrismaClient'

export async function GET(_request: Request) {
  const employees = await prisma.employee.findMany()
  console.log('employees: ', employees)

  return NextResponse.json(
    employees.map((employee) => {
      return {
        id: employee.id,
        degit: employee.degit,
        name: employee.name,
        address: employee.address
      }
    })
  )
}
