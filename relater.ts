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
 * Relaciona carros existentes com clientes existentes
 * @returns {Promise<void>} procediemetno assincrono sem retorno
 */
async function CarroCliente(): Promise<void> {
  try {
    const min = 1
    const max = await prisma.carro.count()
    const customerAmount = await prisma.cliente.count()

    for(let i = 1; i <= customerAmount; i++){
      await prisma.carro_cliente.create({
        data: {
          id_carro: Math.floor(Math.random() * (max - min + 1)) + min,
          id_cliente: i
        }
      })
      console.log('Carro relacionado a cliente com sucesso')
    }
    
  } catch (error) {
    console.log('Erro ao relacionar carro com cliente', error)
  }
}

async function main() {
  await CarroCor()
  await CarroVersao()
  await CarroMotor()
  await CarroEstoque()
  await CarroCliente()
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