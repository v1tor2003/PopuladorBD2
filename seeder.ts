import { PrismaClient } from '@prisma/client'
import { funcionarios, carros, versoes, motores } from './seed';
import { fakerPT_BR } from '@faker-js/faker';

const prisma = new PrismaClient()

type Funcionario = {
  detalhes: {
    nome: string,
    phone: string,
    nascimento: Date,
  }
  usuario: string,
  senha: string,
  salario: number
}

type Carro = {
  modelo: string,
  preco: number
}

type Version = {
  nome: string,
  preco: number
}

type Color = {
  nome_cor: string,
  preco_cor: number
}

type Motor = {
  combustivel: string,
  cilindrada: number,
  potencia: number
}

/**
 * Formata numero de telefone gerado pelo faker, tira o +55.
 * @returns {string} retorna string representando numero formatado
 */

function generatePhone(): string {
  let phone: string = fakerPT_BR.phone.number()
  
  if(phone.startsWith('+55 '))
    return phone.replace('+55 ', '')

  return phone
}

/**
 * Semeia a tabela funcionarios.
 * @param {Funcionario[]} funcionarios vetor com os funcionarios a serem inseridos
 * @returns {Promise<void>} a funcao eh um procedimento, sem retorno.
 */

async function seedFuncionarios(funcionarios: Funcionario[]): Promise<void>{
  
  for(const f of funcionarios){
    try {  
      await prisma.funcionario.create({
        data:{
          detalhespessoa:{
            create:{
              nascimento_pessoa: f.detalhes.nascimento,
              nome_pessoa: f.detalhes.nome,
              phone_pessoa: generatePhone()
            }
          },
          usuario_func: f.usuario,
          senha_func: f.senha,
          salario_func: f.salario,
        }
      })

      console.log('Funcionario criado com sucesso')
    }catch (error) {
      console.log('Erro ao criar funcionario', error)
    }
  } 
}

/**
 * Semeia a tabela de clientes.
 * @param {number} quantidade a quantidade de cliente a serem geradas e inseridos
 * @returns {Promise<void>} a funcao eh um procedimento, sem retorno.
 */

async function seedClientes(quantidade: number): Promise<void> {
 
  for(let i = 0; i < quantidade; i++){
    try{  
      await prisma.cliente.create({
        data:{
          detalhespessoa: {
            create: {
              nome_pessoa: fakerPT_BR.person.fullName(),
              phone_pessoa: generatePhone(),
              nascimento_pessoa: fakerPT_BR.date.between({
                from: new Date('1950-01-01'),
                to: Date.now()
              })
            }
          }
        }
      })
      console.error("Cliente criado com sucesso");
    }catch(error){
      console.error("Erro ao criar Cliente:", error);
    } 
  }
  
}

/**
 * Semeia a tabela de carros.
 * @param {Carro[]} carros vetor com os carros a serem inseridos
 * @returns {Promise<void>} a funcao eh um procedimento, sem retorno.
 */

async function seedCarros(carros: Carro[]) {
  
  for(const c of carros){
    try {
      await prisma.carro.create({
        data: {
          modelo: c.modelo,
          preco_carro: c.preco,
          ano_fab: fakerPT_BR.number.int({min: 2000, max: 2024}),
          quilometragem: fakerPT_BR.number.int({min: 0, max: 1000000})
        }
      })

      console.log('Carro criado com sucesso')
    } catch (error) {
      console.log('Erro ao criar carro', error)
    }
  }
  
}

/**
 * Semeia a tabela de cores.
 * @param {number} quantidade quantidade de cores geradas e inseridas
 * @returns {Promise<void>} a funcao eh um procedimento, sem retorno.
 */
async function seedCores(quantidade: number): Promise<void>{
  let colors: Color[] = []

  for(let i = 0; i < quantidade; i++){
    let color: Color = {
      nome_cor: '',
      preco_cor: 0.0
    }
    color.nome_cor = fakerPT_BR.color.human()
    if(!colors.includes(color)) {
      color.preco_cor = fakerPT_BR.number.float({min: 0, max: 1000})
      colors.push(color)
    }
  }

  
  try {
    await prisma.cor.createMany({
      data: colors
    })
    console.log('Cores criadas com sucesso')
  } catch (error) {
    console.log('Erro ao criar cor:', error)
  }
  
}

/**
 * Semeia a tabela de versoes.
 * @param {Version[]} versions vetor com as versoes a serem inseridos
 * @returns {Promise<void>} a funcao eh um procedimento, sem retorno.
 */
async function seedVersoes(versions: Version[]): Promise<void> {
  for(const v of versions){
    try {
      await prisma.versao.create({
        data:{
          nome_versao: v.nome,
          preco_versao: v.preco
        }
      })

      console.log('Versao criada com sucesso')
    } catch (error) {
      console.log('Erro ao criar versao', error)
    }
  }
}

/**
 * Semeia a tabela de motores.
 * @param {Motor[]} motores vetor com os motores a serem inseridos
 * @returns {Promise<void>} a funcao eh um procedimento, sem retorno.
 */
async function seedMotores(motores: Motor[]) {
  for(const m of motores){
    try {
      await prisma.motor.create({
        data: {
          cilindrada: m.cilindrada,
          combustivel: m.combustivel,
          potencia: m.potencia
        }
      })
      console.log('Motor criado com sucesso')
    }
    catch (error) {
      console.log('Erro ao criar motor', error)
    }
  }
}
/**
 * Semeia a tabela de estoque.
 * @param {number} quantidade quantidade de estoques a serem inseridas
 * @returns {Promise<void>} a funcao eh um procedimento, sem retorno.
 */
async function seedEstoque(quantidade?:number): Promise<void> {
  const qntd: number = quantidade ? quantidade : 1

  for(let i = 0; i < qntd; i++){
    try {
      await prisma.estoque.create({data:{quantidade_veiculo: 0}})      
      console.log('Estoque criado com sucesso')
    } catch (error) {
      console.log('Erro ao criar estoque:', error)    
    }
  }
}

/**
 * Semeia a tabela de vendas.
 * @param {number} quantidade quantidade de vendas a serem inseridas
 * @returns {Promise<void>} a funcao eh um procedimento, sem retorno.
 */
async function seedVendas(quantidade?:number): Promise<void> {
  const qntd: number = quantidade ? quantidade : 0

  for(let i = 0; i < qntd; i++){
    try {
      const min = 1
      const maxCar = await prisma.carro.count()
      const maxCliente = await prisma.cliente.count()
      const maxFunc = await prisma.funcionario.count()

      await prisma.venda.create({
        data:{
          id_carro_fk: Math.floor(Math.random() * (maxCar - min + 1)) + min,
          id_cliente_fk: Math.floor(Math.random() * (maxCliente - min + 1)) + min,
          id_funcionario_fk: Math.floor(Math.random() * (maxFunc - min + 1)) + min, 
          data_venda: fakerPT_BR.date.between({
            from: new Date('2020-01-01'),
            to: Date.now()
          })
        }
      })      
      console.log('Venda criada com sucesso')
    } catch (error) {
      console.log('Erro ao criar venda:', error)    
    }
  }
}

async function main(){
  const quantidadeClientes = 10
  const quantidadeCores = 5
  const quantidadeVendas = 5
  await seedEstoque()
  await seedVersoes(versoes)
  await seedFuncionarios(funcionarios) 
  await seedClientes(quantidadeClientes)
  await seedMotores(motores)
  await seedCarros(carros)
  await seedCores(quantidadeCores)
  await seedVendas(quantidadeVendas)
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

