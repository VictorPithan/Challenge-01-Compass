import { z } from 'zod'
import {
  Container,
  ContainerSignIn,
  FormContainer,
  ImgBackground,
  InputForm,
} from './styles'
import { ChangeEvent, FormEvent, useState, useEffect } from 'react'

import userIcon from '../../assets/user.svg'
import lockIcon from '../../assets/lock-simple.svg'
import backgroundImg from '../../assets/sideImage.png'
import { useNavigate } from 'react-router-dom'

const signInFormSchema = z.object({
  userName: z
    .string()
    .email({ message: 'O campo usuário deve ser do formato email' })
    .nonempty({ message: 'O campo usuário é obrigatório' }),
  password: z.string().nonempty({ message: 'O campo senha é obrigatório' }),
})

type signInFormInputs = z.infer<typeof signInFormSchema>

interface userLoggedProps {
  name: string;
  profile_photo: string;
}



export function SignIn() {

  const navigate = useNavigate()
  
  const [userlogged, setUserlogged] = useState<userLoggedProps | null>()

  const [user, setUser] = useState<signInFormInputs>({
    userName: '',
    password: '',
  })

  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  let isValidated = false

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

    let isValidated = false
    await fetch('http://localhost:3333/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        userName: user.userName,
        password: user.password
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Não foi possível fazer o login");
        }
        return response.json();
      })
      .then(data => {
        console.log("DATA =>" ,data)
        setUserlogged(data)
        isValidated = true
        // console.log("USERLOGGED", userlogged)
        // console.log("ISValidated", isValidated)
        setFormErrors({})
        alert('Logado com sucesso!')
        navigate('/home')
      })
      .catch((err) => {
        console.log('entrou aq?',err)
          const newError = {
          CredencialError: 'Usuário e/ou Senha inválidos.',
        }
        console.log("Entrou no erro de autenticação")
        setFormErrors((prev) => newError)
        console.log("FormErrors", formErrors)

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
        alert("Credenciais Inválidas")
      })

    // const isValidated = users.find((data) => {
    //   return data.userName === user.userName && data.password === user.password
    // })

    console.log("ISValidatedAgain", isValidated)

    

    
    // if (isValidated) { //isValidated === false
    //   const newError = {
    //     CredencialError: 'Usuário e/ou Senha inválidos.',
    //   }
    //   console.log("Entrou no erro de autenticação")
    //   return setFormErrors(newError)
    // }
    // console.log("passou no erro de autenticação")
    setUser({ userName: '', password: '' })
    // alert('Logado com sucesso!')
    
  }

  console.log("USERLOGGED FORA DA FUNÇÃO", userlogged)

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
