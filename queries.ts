import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function main() {
  const vendas = await prisma.venda.findMany({
    include: {
      carro: true,
      funcionario: true,
      cliente: true
    }
  })

  console.log(vendas)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
