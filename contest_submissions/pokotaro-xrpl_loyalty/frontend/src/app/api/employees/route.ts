import type { Employee } from '@prisma/client'
import { NextResponse } from 'next/server'
import { prisma } from '@/libs/PrismaClient'

export async function GET(_request: Request) {
  const employees = await prisma.employee.findMany()
  console.log('employees: ', employees)

  return NextResponse.json(
    employees.map((employee: Employee) => {
      return {
        id: employee.id,
        digest: employee.digest,
        name: employee.name,
        address: employee.address
      }
    })
  )
}
