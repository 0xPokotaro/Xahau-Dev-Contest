import { PrismaClient } from '@prisma/client'
import { Wallet } from '@transia/xrpl'
import { generate256BitHash } from '../src/utils/hash'
import { WALLET_SEEDS } from '../src/constants/wallet'

const prisma = new PrismaClient()

const employees = [
  {
    name: 'Alice',
    address: Wallet.fromSeed(WALLET_SEEDS.ALICE).address,
    digest: generate256BitHash('1')
  }
]

const main = async () => {
  await prisma.$connect()

  for (const employee of employees) {
    await prisma.employee.upsert({
      where: {
        address: employee.address
      },
      update: {
        name: employee.name
      },
      create: employee
    })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
