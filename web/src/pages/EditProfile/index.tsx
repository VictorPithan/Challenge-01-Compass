import { z } from 'zod'
import { ChangeEvent, FormEvent, useContext, useState } from 'react'
import {
  Container,
  ContainerRegister,
  FormContainer,
  ImgBackground,
  InputForm,
} from './styles'

import userIcon from '../../assets/user.svg'
import lockIcon from '../../assets/lock-simple.svg'
import fingerPrintIcon from '../../assets/fingerPrintIcon.svg'
import cakeIcon from '../../assets/cakeIcon.svg'
import atIcon from '../../assets/atIcon.svg'
import shieldCheckIcon from '../../assets/shieldCheckIcon.svg'
import backgroundImg from '../../assets/sideImage.png'
import { useNavigate, useParams } from 'react-router-dom'
import { DataContext } from '../../contexts/DataContext'

const registerFormSchema = z
  .object({
    name: z.string().nonempty({ message: 'O campo nome é obrigatório' }),
    userName: z.string().nonempty({ message: 'O campo usuário é obrigatório' }),
    birthDate: z.coerce
      .date({
        required_error: 'O campo data de nascimento é obrigatório',
        invalid_type_error: 'Formato de dado inválido',
      })
      .min(new Date('1900-01-01'), { message: 'Data inválida' })
      .max(new Date(), { message: 'Data inválida' }),
    email: z
      .string()
      .email({ message: 'Formato de email inválido' })
      .min(1, { message: 'O campo email é obrigatório' }),
    password: z.string().nonempty({ message: 'O campo senha é obrigatório' }),
    confirmPassword: z
      .string()
      .nonempty({ message: 'O campo confirmar senha é obrigatório' }),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        path: ['confirmPasswordInvalid'],
        message: 'As senhas não correspondem',
      })
    }
  })

type registerFormInputs = z.infer<typeof registerFormSchema>

interface registeredUsersProps {
  id: string | undefined;
  name: string;
  username: string;
  birthDate: Date;
  email: string;
  password: string;
  profilePhoto?: string | null;
}

export function EditProfile() {
  const { editProfileUser } = useContext(DataContext)
  const navigate = useNavigate()
  const { id } = useParams()
  const [user, setUser] = useState<registerFormInputs>({
    name: '',
    userName: '',
    birthDate: new Date(''),
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  function handleValidateNameChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('')
    user.name = event.target.value
    setUser({ ...user })
  }

  function handleValidateUserNameChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('')
    user.userName = event.target.value
    setUser({ ...user })
  }

  function handleValidateBirthDateChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('')
    user.birthDate = new Date(event.target.value)
    setUser({ ...user })
  }

  function handleValidateEmailChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('')
    user.email = event.target.value
    setUser({ ...user })
  }

  function handleValidatePasswordChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('')
    user.password = event.target.value
    setUser({ ...user })
  }

  function handleValidateConfirmPasswordChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    event.target.setCustomValidity('')
    user.confirmPassword = event.target.value
    setUser({ ...user })
  }

  function handleValidateRegisterUser(event: FormEvent) {
    event.preventDefault()

    const parsedUser = registerFormSchema.safeParse(user)
    if (!parsedUser.success) {
      const error = parsedUser.error
      let newErrors = {}
      for (const issue of error.issues) {
        if (issue.message === 'Invalid date' && issue.path[0] === 'birthDate') {
          issue.message = 'O campo data de nascimento é obrigatório'
        }
        newErrors = {
          ...newErrors,
          [issue.path[0]]: issue.message,
        }
      }
      return setFormErrors(newErrors)
    }

    const newUserData: registeredUsersProps = {
      id,
      name: user.name,
      username: user.userName,
      birthDate: new Date(user.birthDate),
      email: user.email,
      password: user.password,
      profilePhoto: "",
    }
    editProfileUser(newUserData)

    navigate('/home')

    setUser({
      name: '',
      userName: '',
      birthDate: new Date(),
      email: '',
      password: '',
      confirmPassword: '',
    })

    setTypeInput('text')
    return setFormErrors({})
  }

  const [typeInput, setTypeInput] = useState('text')
  return (
    <Container>
      <ContainerRegister>
        <h1>Olá,</h1>
        <h3>Por favor, atualize seus dados para continuar</h3>
        <FormContainer onSubmit={handleValidateRegisterUser}>
          <fieldset>
            <legend>Editar Perfil</legend>
            <InputForm>
              <input
                name="name"
                type="text"
                placeholder="Nome"
                value={user.name}
                onChange={handleValidateNameChange}
                className={
                  Object.keys(formErrors)[0] === 'name' ? 'invalid-input' : ''
                }
              />
              <img src={userIcon} alt="" />
            </InputForm>

            <InputForm>
              <input
                name="userName"
                type="text"
                placeholder="Usuário"
                value={user.userName}
                onChange={handleValidateUserNameChange}
                className={
                  Object.keys(formErrors)[0] === 'userName'
                    ? 'invalid-input'
                    : ''
                }
              />
              <img src={fingerPrintIcon} alt="" />
            </InputForm>

            <InputForm>
              <input
                name="birthDate"
                type={typeInput}
                onFocus={() => setTypeInput('date')}
                placeholder="Nascimento"
                onChange={handleValidateBirthDateChange}
                className={
                  Object.keys(formErrors)[0] === 'birthDate'
                    ? 'invalid-input'
                    : ''
                }
              />
              <img src={cakeIcon} alt="" />
            </InputForm>

            <InputForm>
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={user.email}
                onChange={handleValidateEmailChange}
                className={
                  Object.keys(formErrors)[0] === 'email' ? 'invalid-input' : ''
                }
              />
              <img src={atIcon} alt="" />
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
                  Object.keys(formErrors)[0] === 'confirmPasswordInvalid'
                    ? 'invalid-input'
                    : ''
                }
              />
              <img src={lockIcon} alt="" />
            </InputForm>

            <InputForm>
              <input
                name="confirmPassword"
                type="password"
                placeholder="Confirmar senha"
                value={user.confirmPassword}
                onChange={handleValidateConfirmPasswordChange}
                className={
                  Object.keys(formErrors)[0] === 'confirmPassword' ||
                  Object.keys(formErrors)[0] === 'confirmPasswordInvalid'
                    ? 'invalid-input'
                    : ''
                }
              />
              <img src={shieldCheckIcon} alt="" />
            </InputForm>
            {Object.keys(formErrors)[0] && (
              <p className="invalidInput">
                {formErrors[Object.keys(formErrors)[0]]}
              </p>
            )}

            <button type="submit">Salvar</button>

          </fieldset>
        </FormContainer>
      </ContainerRegister>
      <ImgBackground src={backgroundImg} alt="" />
    </Container>
  )
}
