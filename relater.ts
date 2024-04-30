// RELACIONADOR - Script responsavel por relacionar os dados existentes no banco entre si
import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
/**
 * Relaciona carros existentes com cores existentes
 * @returns {Promise<void>} procediemetno assincrono sem retorno
 */
async function CarroCor(): Promise<void> {
  try {
    const min = 1
    const max = await prisma.cor.count()
    const carAmount = await prisma.carro.count()

    for(let i = 1; i <= carAmount; i++){
      await prisma.carro.update({
        where: {
          id_carro: i,
          id_cor_fk: null
        },
        data: {
          id_cor_fk: Math.floor(Math.random() * (max - min + 1)) + min
        }
      })
      console.log('Carro e cor relacionados com sucesso')
    }
  } catch (error) {
    console.log('Erro ao relacionar carro com cor', error)
  }
}
/**
 * Relaciona carros existentes com versoes existentes
 * @returns {Promise<void>} procediemetno assincrono sem retorno
 */
async function CarroVersao(): Promise<void> {
  try {
    const min = 1
    const max = await prisma.versao.count()
    const carAmount = await prisma.carro.count()

    for(let i = 1; i <= carAmount; i++){
      await prisma.carro.update({
        where: {
          id_carro: i,
          id_versao_fk: null
        },
        data: {
          id_versao_fk: Math.floor(Math.random() * (max - min + 1)) + min
        }
      })
      console.log('Carro e versao relacionados com sucesso')
    }
  } catch (error) {
    console.log('Erro ao relacionar carro com versao', error)
  }
}
/**
 * Relaciona carros, clientes e funcionarios na criacao de uma nova venda
 * @param {number} quantidade numero de vendas a serem criadas 
 * @returns {Promise<void>} procediemetno assincrono sem retorno
 */
async function Venda(quantidade?: number) {
  try{
    const qntd: number = quantidade ? quantidade : 0

    const min = 1
    const maxCar = await prisma.carro.count()
    const maxFunc = await prisma.funcionario.count()
    const maxCostumer = await prisma.cliente.count()

    for(let i = 1; i <= qntd; i++){
      let car = await prisma.carro.findUnique({
        where: {
          id_carro: Math.floor(Math.random() * (maxCar - min + 1)) + min
        }
      })

      await prisma.venda.create({
        data: {
          data_venda: faker.date.between({
            from: new Date(`${car?.ano_fab.toString()}-01-01`),
            to: Date.now()
          }),
          id_carro_fk: car?.id_carro as number,
          id_funcionario_fk: Math.floor(Math.random() * (maxFunc - min + 1)) + min,
          id_cliente_fk: Math.floor(Math.random() * (maxCostumer - min + 1)) + min
        }
      })

      console.log('Venda relacionada com sucesso')
    }

  }catch(error){
    console.log('Erro ao criar venda', error)
  }
}

async function main() {
  const vendaQntd = 10
  await CarroCor()
  await CarroVersao()
  await Venda(vendaQntd)
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