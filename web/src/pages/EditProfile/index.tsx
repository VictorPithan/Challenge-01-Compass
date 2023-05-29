import { z } from 'zod'
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react'
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
import { useNavigate } from 'react-router-dom'
import { DataContext } from '../../contexts/DataContext'

import { addDays, format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import api from '../../services/api'

const editProfileFormSchema = z
  .object({
    name: z.string().nonempty({ message: 'O campo nome é obrigatório' }),
    username: z.string().nonempty({ message: 'O campo usuário é obrigatório' }),
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
      profilePhoto: z.string().nullable(),
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


type editProfileFormInputs = z.infer<typeof editProfileFormSchema>

interface editUsersProps {
  name: string;
  username: string;
  email: string;
  birthDate: string;
  profilePhoto?: string | null;
  password: string;
  confirmPassword: string;
}

interface editedUsersProps {
  name: string;
  username: string;
  email: string;
  birthDate: Date;
  profilePhoto?: string | null;
  password: string;
}

export function EditProfile() {
  const { editProfileUser } = useContext(DataContext)
  const navigate = useNavigate()

  const [user, setUser] = useState<editUsersProps>({
    name: '',
    username: '',
    email: '',
    birthDate: '',
    password: '',
    confirmPassword: '',
    profilePhoto: '',
  })

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await api.get('/users/profile')
        const data: editUsersProps = responseData.data
        
        setUser({
            name: data.name,
            username: data.username,
            email: data.email,
            birthDate: data.birthDate,
            password: '',
            confirmPassword: '',
            profilePhoto: data.profilePhoto ?? ''
        })
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);

  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  function handleValidateNameChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('')
    user.name = event.target.value
    setUser({ ...user })
  }

  function handleValidateUserNameChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('')
    user.username = event.target.value
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

    const parsedUser = editProfileFormSchema.safeParse(user)
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

    const newUserData: editedUsersProps = {
      name: user.name,
      username: user.username,
      email: user.email,
      birthDate: new Date(user.birthDate),
      password: user.password,
      profilePhoto: user.profilePhoto ?? '',
    }
    editProfileUser(newUserData)
    console.log(newUserData)
    alert('Edição feita com sucesso')


    setUser({
      name: '',
      username: '',
      email: '',
      birthDate: '',
      password: '',
      confirmPassword: '',
      profilePhoto: '',
    })

    navigate('/')
    return setFormErrors({})
  }

  return (
    <Container>
      <ContainerRegister>
        <FormContainer onSubmit={handleValidateRegisterUser}>
          <fieldset>
            <legend>Edição de perfil</legend>
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
                name="username"
                type="text"
                placeholder="Usuário"
                value={user.username}
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

            <button type="submit">Registrar-se</button>
            <span>
              Já possui uma conta? <a href="/">Faça Login</a>
            </span>
          </fieldset>
        </FormContainer>
      </ContainerRegister>
      <ImgBackground src={backgroundImg} alt="" />
    </Container>
  )
}
