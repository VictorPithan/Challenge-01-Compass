import { z } from 'zod'
import {
  Container,
  ContainerSignIn,
  FormContainer,
  ImgBackground,
  InputForm,
} from './styles'
import { ChangeEvent, FormEvent, useState } from 'react'

import userIcon from '../../assets/user.svg'
import lockIcon from '../../assets/lock-simple.svg'
import backgroundImg from '../../assets/sideImage.png'

const signInFormSchema = z.object({
  userName: z
    .string()
    .email({ message: 'O campo usuário deve ser do formato email' })
    .nonempty({ message: 'O campo usuário é obrigatório' }),
  password: z.string().nonempty({ message: 'O campo senha é obrigatório' }),
})

type signInFormInputs = z.infer<typeof signInFormSchema>

export function SignIn() {
  const [users] = useState<signInFormInputs[]>([
    {
      userName: 'victor@email.com',
      password: '123456',
    },
  ])

  const [user, setUser] = useState<signInFormInputs>({
    userName: '',
    password: '',
  })

  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  function handleValidatePasswordChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('')
    user.password = event.target.value
    setUser({ ...user })
  }

  function handleValidateUserChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('')
    user.userName = event.target.value
    setUser({ ...user })
  }

  function handleValidateLoginUser(event: FormEvent) {
    event.preventDefault()

    const isValidated = users.find((data) => {
      return data.userName === user.userName && data.password === user.password
    })

    const parsedUser = signInFormSchema.safeParse(user)
    if (!parsedUser.success) {
      const error = parsedUser.error
      let newErrors = {}
      for (const issue of error.issues) {
        newErrors = {
          ...newErrors,
          [issue.path[0]]: issue.message,
        }
      }
      return setFormErrors(newErrors)
    }

    if (isValidated === undefined) {
      const newError = {
        CredencialError: 'Usuário e/ou Senha inválidos.',
      }
      return setFormErrors(newError)
    }

    setUser({ userName: '', password: '' })
    alert('Logado com sucesso!')
    return setFormErrors({})
  }

  return (
    <Container>
      <ContainerSignIn>
        <h1>Olá,</h1>
        <h3>Para continuar navegando de forma segura, efetue o login</h3>
        <FormContainer onSubmit={handleValidateLoginUser}>
          <fieldset>
            <legend>Login</legend>
            <InputForm>
              <input
                name="userName"
                type="text"
                placeholder="Usuário"
                value={user.userName}
                onChange={handleValidateUserChange}
                className={
                  Object.keys(formErrors)[0] === 'userName' ||
                  Object.keys(formErrors)[0] === 'CredencialError'
                    ? 'invalid-input'
                    : ''
                }
              />
              <img src={userIcon} alt="" />
            </InputForm>

            <InputForm>
              <input
                name="password"
                type="password"
                placeholder="Senha"
                value={user.password}
                onChange={handleValidatePasswordChange}
                className={
                  Object.keys(formErrors)[0] === 'password' ||
                  Object.keys(formErrors)[0] === 'CredencialError'
                    ? 'invalid-input'
                    : ''
                }
              />
              <img src={lockIcon} alt="" />
            </InputForm>

            {Object.keys(formErrors)[0] && (
              <div className="invalidInput">
                <p>{formErrors[Object.keys(formErrors)[0]]}</p>
                <p>Por favor, tente novamente!</p>
              </div>
            )}

            <button type="submit">Logar-se</button>
            <span>
              Novo por aqui? <a href="/register">Registre-se</a>
            </span>
          </fieldset>
        </FormContainer>
      </ContainerSignIn>
      <ImgBackground src={backgroundImg} alt="" />
    </Container>
  )
}
