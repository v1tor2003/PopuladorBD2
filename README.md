
# Projeto BD2

Instalação
-
Requisitos:
* node.js (preferência maior que v18)
* typescript (preferência maior que v5)
* MySQL
* Importar o arquivo FisicoBD2Final.sql (presente também no classroom)

No terminal:
```bash
    git clone git@github.com:v1tor2003/ProjetoBD2Final.git
    cd ProjetoBD2Final
    echo "DATABASE_URL="mysql://user:password@port/concessionaria_db"" .env
    npm install
    tsc seeder.ts
    node seeder.js
    tsc relater.ts
    node relater.js
```

Descrição
-
O projeto consiste na modelagem de um banco de dados de uma concessionária fictícia: definição, geração de dados e uso em um simples aplicação. Os scripts presente nesse projeto podem e foram utilizados para com o auxilio da ORM prisma.orm (https://www.prisma.io/), dentro do superset TypeScript (https://www.typescriptlang.org/) povoar o banco de dados. 

Para as tabelas:
 * Cliente
 * Carros
 * Cores
 * Versoes
 * Motores

Além de existir e ser utilizado, o script de relacionamento para a crição das relações definidas no banco. 

Geração de Dados (seeder.ts):
- 
Utilizamos a biblioteca Faker.js (https://fakerjs.dev/) para povoar nosso banco de dados com dados fictícios realistas. Ela gerou informações variadas, agilizando o processo e garantindo a confidencialidade dos dados reais. Coloborando para um conjunto final robusto para testes e desenvolvimento da aplicação.

Pelo Faker.js foram gerados:
 * Números 
 * Datas
 * Nomes 
 * Telefones 

Uso na criação de cores aleatórias, com os valores de nome e preço da cor (ressalva-se que para a criação de cores, as cores geradas foram de forma onde as repetições não foram levadas em consideração na inserção no banco):
```javascript
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

```
**Utilização oberservável de forma clara e parcial para as funções:**

* seedCLientes()
* seedCores()
* seedCarros()

Funções que não utilizam o Faker.js, como seedFuncionarios(), seram debatidas mais abaixo.

Relacionando as Tabelas (relater.ts)
-
Já para relacionar as tabelas povoadas, foi utilizado a método .random() do objeto Math encapsulado no .floor() para sortear os ids que seriam parte das relações. Uma vez que .random() só gera números aleatórios dentro do intervalo [0, 1), é necessário que, para gerar inteiros ele seja envolvido em .floor() ou .ceil(). Enquanto que o intervalo de números gerados é definido de tal forma:

 - .random() * (max - min + 1) 

Onde "min" é o inicial do intervalo "max" é o fim e "+ 1" inclui "max",para o nosso contexto podemos assim definir, a geração de números do intervalo de [1, quantidade de registros no banco],  ex:

```javascript 
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
``` 

Podemos assim ver que, para cada carro existente no banco, um cor aleatória nas cores existentes no banco, é sorteada e relacionado com o carro da atual iteração. 

**Abordagem válida e utilizada para o relacionamento das seguintes tabelas, (com suas devidas adaptações):**

* CarroCor
* CarroVersao
* CarroMotor

Ainda em relater.ts a função Venda() existe e é responsável para de que forma analóga e agora com o auxilio do faker para gerar datas, relacione na criação de um registro de venda, o carro, o funcionário e o cliente que participaram dessa ação.


Dados estáticos (seed.ts):
-
Série de constantes utilizadas em funções como seedFuncionario() que são responsáveis por provê dados estáticos para povoar o banco, ex:
```javascript
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

```

Onde é oberservável o não uso do faker, por questões de preferência em utilizar dados previamente definidos na crição de novos funcionarios.

**Abordagem repetida para:**
 * seedVersoes()
 * seedMotores()
 * seedCarros() // em partes, pois houve uso do faker também


Alterações (v1.1):
-
No FisicoB2Final.sql:

* Estoque, exlusão da tabela;
* Detalhespessoa, renomeação de atributo chave primária: id_pessoa -> id_detalhepessoa
* Carro, exclusão de atributo quilometragem;
* Carro, renomeação e ressignificação de atributo: id_estoque (INTEGER) -> quantidade (INTEGER)
* Cliente, renomeação de chave estrangeira: id_pessoa -> id_detalhepessoa_fk
* Funcionario, renomeação de chave estrangeira: id_pessoa -> id_detalhepessoa_fk

