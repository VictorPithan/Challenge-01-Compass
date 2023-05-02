import { z } from 'zod'
import {
  Container,
  ContainerSignIn,
  FormContainer,
  ImgBackground,
  InputForm,
} from './styles'
import { ChangeEvent, FormEvent, useState, useContext } from 'react'

import userIcon from '../../assets/user.svg'
import lockIcon from '../../assets/lock-simple.svg'
import backgroundImg from '../../assets/sideImage.png'
import { useNavigate } from 'react-router-dom'
import { DataContext } from '../../contexts/DataContext'

const signInFormSchema = z.object({
  userName: z
    .string()
    .nonempty({ message: 'O campo usuário é obrigatório' }),
  password: z.string().nonempty({ message: 'O campo senha é obrigatório' }),
})

type signInFormInputs = z.infer<typeof signInFormSchema>

interface UserAuthenticate {
  user: string;
  password: string;
}

export function SignIn() {

  const { userAuthenticate} = useContext(DataContext)

  const navigate = useNavigate()
  
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

  async function handleValidateLoginUser(event: FormEvent) {
    event.preventDefault()

    const newUser:UserAuthenticate = {
      user: user.userName,
      password: user.password
    }

    userAuthenticate(newUser)
    const isLogged = await userAuthenticate(newUser)
    if (!isLogged) {
        const newError = {
          CredencialError: 'Usuário e/ou Senha inválidos.',
        }
        setFormErrors((prev) => newError)

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
          setFormErrors(newErrors)
        }

    } else {
      setUser({ userName: '', password: '' })
      setFormErrors({})
      navigate('/home')
    }   
      
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
