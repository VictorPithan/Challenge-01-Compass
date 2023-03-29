import { z } from "zod"
import userIcon from '../../assets/user.svg'
import lockIcon from '../../assets/lock-simple.svg'
import fingerPrintIcon from '../../assets/fingerPrintIcon.svg'
import cakeIcon from '../../assets/cakeIcon.svg'
import atIcon from '../../assets/atIcon.svg'
import shieldCheckIcon from '../../assets/shieldCheckIcon.svg'
import { Container, FormContainer, InputForm } from "./styles";

const registerFormSchema = z.object({
  name: z.string().min(3),
  userName: z.string().min(2),
  birthDate: z.date(),
  email: z.string().email(),
  password: z.string(),
  confirmPassword: z.string(),
})
.superRefine(({ password, confirmPassword }, ctx) => {
  if (password !== confirmPassword) {
    ctx.addIssue({
      code: "custom",
      path: ["confirmPassword"],
      message: "Password do not match",
    })
  }
})

type registerFormInputs = z.infer<typeof registerFormSchema>

export function Register() {
  return (
    <Container>
      <h1>Olá,</h1>
      <h3>Por favor, registre-se para continuar</h3>
      <FormContainer>
        <fieldset>
          <legend>Registro</legend>
          <InputForm>
            <input type='text' placeholder="Nome" />
            <img src={userIcon} alt="" />
          </InputForm>

          <InputForm>
            <input type='text' placeholder="Usuário" />
            <img src={fingerPrintIcon} alt="" />
          </InputForm>

          <InputForm>
            <input type='date' placeholder="Nascimento" />
            <img src={cakeIcon} alt="" />
          </InputForm>

          <InputForm>
            <input type='email' placeholder="Email" />
            <img src={atIcon} alt="" />
          </InputForm>
          
          <InputForm>
            <input type='password' placeholder="Senha" />
            <img src={lockIcon} alt="" />
          </InputForm>

          <InputForm>
            <input type='password' placeholder="Confirmar senha" />
            <img src={shieldCheckIcon} alt="" />
          </InputForm>
          
          <button type="submit">Registrar-se</button>
          <span>Já possui uma conta? <a href="/">Faça Login</a></span>
        </fieldset>
      </FormContainer>
    </Container>
  )
}