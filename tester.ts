import { z } from 'zod'

const brazilianPhoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/

const FormAddFuncSchema = z.object({
  // detalhes
  nome: z.string().min(1, { message: 'Nome é requerido' }),
  nascimeto: z.date(),
  tel: z.string().regex(brazilianPhoneRegex, 'Telefone inválido'),
  // funcionario
  usuario: z.string().min(1, {message: 'Usuario é requerido'}),
  senha: z.string().min(4, 'Senha deve conter pelo menos 4 caracteres'),
  salario: z.number().positive(),
  cargo: z.string().min(1, { message: 'Cargo é requerido' })
})

for(const [k, v] of Object.entries(FormAddFuncSchema.shape)){
  console.log(k, v._def.typeName.replace('Zod', '').toLowerCase())
}