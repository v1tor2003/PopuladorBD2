import { fakerPT_BR } from "@faker-js/faker";

export const funcionarios = [
    {
      detalhes: {
        nome: 'Luiz Moedas',
        phone: '',
        nascimento: new Date('2003-09-22')
      },
      usuario: 'luizinho',
      senha: 'academia',
      salario: 2000.00
    },
    {
      detalhes: {
        nome: 'Valter Pires',
        phone: '',
        nascimento: new Date('2003-09-29'),
      },
      usuario: 'valtin',
      senha: 'amopaty',
      salario: 5000.00
    },
    {
      detalhes: {
        nome: 'Guilherme Fontana',
        phone: '',
        nascimento: new Date('2003-01-07'),
      },
      usuario: 'fontana',
      senha: '3600x',
      salario: 10000.00
    },
    {
      detalhes: {
        nome: 'Bruno Costa',
        phone: '',
        nascimento: new Date('2000-03-10'),
      },
      usuario: 'atsoc',
      senha: 'umdoistresquatro',
      salario: 1000.00
    },
    {
      detalhes: {
        nome: 'Gustavo Aragao',
        phone: '',
        nascimento: new Date('2002-11-26'),
      },
      usuario: 'gugudeneve',
      senha: 'guga123',
      salario: 5000.00
    },
]

export const carros = [
  {modelo:'Jetta', preco: 45000.00},
  {modelo:'Variant', preco: 60000.00},
  {modelo:'Fox', preco: 38000.00},
  {modelo:'Golf', preco: 50000.00},
  {modelo:'Saveiro', preco: 40000.00},
  {modelo:'Polo', preco: 35000.00},
  {modelo:'Gol', preco: 30000.00},
  {modelo:'Amarok', preco: 70000.00},
]

export const versoes = [
  {
    nome: 'gold',
    preco: 1000.00
  },
  {
    nome: 'plus',
    preco: 3000.00
  },
  {
    nome: 'premium',
    preco: 5000.00
  }
]

export const motores = [
  {
    combustivel: 'gasolina',
    cilindrada: 1.0,
    potencia: 115
  },
  {
    combustivel: 'etanol',
    cilindrada: 1.0,
    potencia: 90
  },
  {
    combustivel: 'gasolina',
    cilindrada: 1.5,
    potencia: 150
  },
  {
    combustivel: 'gasolina',
    cilindrada: 2.0,
    potencia: 220
  },
  {
    combustivel: 'diesel',
    cilindrada: 2.8,
    potencia: 256
  },
]