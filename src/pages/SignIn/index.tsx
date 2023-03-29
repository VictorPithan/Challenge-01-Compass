import { z } from "zod"
import { Container, ContainerSignIn, FormContainer, ImgBackground, InputForm } from "./styles";

import userIcon from '../../assets/user.svg'
import lockIcon from '../../assets/lock-simple.svg'
import backgroundImg from '../../assets/sideImage.png'
import { ChangeEvent, FormEvent, useState } from "react";

const signInFormSchema = z.object({
  userName: z.string().email({message: 'O campo deve ser do formato email'}).min(1, {message: 'O campo usuário é obrigatório'}),
  password: z.string().min(6, {message: "O campo senha é obrigatório"}),
})

type SignInFormInputs = z.infer<typeof signInFormSchema>

export function SignIn() {
  const [users, setUsers] = useState<SignInFormInputs[]>([
    {
      userName: 'victor@email.com',
      password: '123456',
    },
  ])

  const [user, setUser] = useState<SignInFormInputs>({
    userName: '',
    password: '',
  })

  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  function handleValidatePasswordChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("");
    user.password = event.target.value
    setUser({...user})
  }

  function handleValidateUserChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("");
    user.userName = event.target.value
    setUser({...user})
  }

  function handleValidateLoginUser(event: FormEvent) {
    event.preventDefault()

    const isValidated = users.find(data => {
      return data.userName === user.userName && data.password === user.password
    })

    console.log("formData", user)
    const parsedUser = signInFormSchema.safeParse(user)
    if(!parsedUser.success) {
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

    if(isValidated === undefined) {
      let newError = {
        "CredencialError": "Usuário e/ou Senha inválidos."
      }
      return setFormErrors(newError)
    }
    
    setUser({userName: '', password: ''})
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
                type='text'
                placeholder="Usuário"
                value={user.userName}
                onChange={handleValidateUserChange}
              />
              <img src={userIcon} alt="" />
            </InputForm>

            { formErrors.userName && <p className="invalidInput">{formErrors.userName}</p> }
            
            <InputForm>
              <input
                name="password"
                type='password'
                placeholder="Senha"
                value={user.password}
                onChange={handleValidatePasswordChange}
              />
              <img src={lockIcon} alt="" />
            </InputForm>

            { formErrors.password && <p className="invalidInput">{formErrors.password}</p> }
            { formErrors.CredencialError && <div className="invalidInput"><p>{formErrors.CredencialError}</p><p>Por favor, tente novamente!</p></div> }
              
            <button type="submit">Logar-se</button>
            <span>Novo por aqui? <a href="/register">Registre-se</a></span>
          </fieldset>
        </FormContainer>
      </ContainerSignIn>
      <ImgBackground src={backgroundImg} alt="" />
    </Container>
  )
}