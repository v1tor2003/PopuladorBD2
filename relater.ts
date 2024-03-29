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
 * Relaciona carros existentes com motores existentes
 * @returns {Promise<void>} procediemetno assincrono sem retorno
 */
async function CarroMotor(): Promise<void> {
  try {
    const min = 1
    const max = await prisma.motor.count()
    const carAmount = await prisma.carro.count()

    for(let i = 1; i <= carAmount; i++){
     await prisma.carro.update({
      where: {
        id_carro: i
      },
      data: {
        id_motor_fk: Math.floor(Math.random() * (max - min + 1)) + min
      }
     })
      console.log('Carro e motor relacionados com sucesso')
    }
  } catch (error) {
    console.log('Erro ao relacionar carros com motores', error)
  }
}
/**
 * Relaciona carros existentes com estoques existentes
 * @returns {Promise<void>} procediemetno assincrono sem retorno
 */
async function CarroEstoque(): Promise<void> {
  try {
    const min = 1
    const max = await prisma.estoque.count()
    const carAmount = await prisma.carro.count()

    for(let i = 1; i <= carAmount; i++){
      let res = await prisma.carro.update({
        where: {
          id_carro: i
        },
        data:{
          id_estoque_fk: Math.floor(Math.random() * (max - min + 1)) + min
        }
      })
      if(res){
        const e = await prisma.estoque.findUnique({
          where:{
            id_estoque: res.id_estoque_fk as number
          }
        })

        await prisma.estoque.update({
          where:{
            id_estoque: res.id_estoque_fk as number
          },
          data:{
            quantidade_veiculo: (e?.quantidade_veiculo as number) + 1
          }
        })
      }
    }
    console.log('Carro relacionado a estoque com sucesso')
  } catch (error) {
    console.log('Erro ao relacionar carro com estoque', error)
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
  await CarroMotor()
  await CarroEstoque()
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