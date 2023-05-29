import { z } from 'zod'
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react'
import {
  Container,
  ContainerRegister,
  FormContainer,
  ImgBackground,
  InputForm,
} from './styles'


import backgroundImg from '../../assets/sideImage.png'
import { useNavigate, useParams } from 'react-router-dom'
import { DataContext } from '../../contexts/DataContext'

import api from '../../services/api'

const editPostFormSchema = z
  .object({
    description: z.string().nonempty({ message: 'O campo descrição é obrigatório' }),
    urlImage: z.string().nullable(),
  })


type editPostFormInputs = z.infer<typeof editPostFormSchema>

interface editPostProps {
  description: string;
  urlImage: string | null;
}

export function EditPost() {
  const navigate = useNavigate()
  const [post, setPost] = useState<editPostProps>({
    description: "",
    urlImage: "",
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  // const [newPostText, setNewPostText] = useState("")
 const { id } = useParams()
 console.log(id)

 useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await api.get(`/posts/${id}`)
      const data = response.data
      console.log(data)
      setPost({description: data.description, urlImage: data.urlImage})
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };
  fetchData();
}, []);

function handleNewPostChange(event: ChangeEvent<HTMLTextAreaElement>) {
  event.target.setCustomValidity("")
  const { name, value } = event.target;
  setPost(prevValue => ({...prevValue, [name]: value}))
}

async function handleUpdatePost(event: FormEvent) {
  event.preventDefault()

  const parsedUser = editPostFormSchema.safeParse(post)
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

  await api.put(`/posts/${id}`, post)
  navigate('/home')
}
console.log(post)
  return (
    <Container>
      <ContainerRegister>
        <FormContainer onSubmit={handleUpdatePost}>

          <fieldset>
            <legend>Edição de post</legend>
            <InputForm>
              <textarea
                name="description"
                placeholder="No que você está pensando?"
                value={post.description}
                onChange={handleNewPostChange}
                className={
                  Object.keys(formErrors)[0] === 'description'
                    ? 'invalid-input'
                    : ''
                }
                // onInvalid={handleNewPostInvalid}
              />
            </InputForm>

            <InputForm>
              <textarea
                name="urlImage"
                placeholder="URL da imagem"
                value={post.urlImage ?? ''}
                onChange={handleNewPostChange}
              /> 
            </InputForm>

            {Object.keys(formErrors)[0] && (
              <p className="invalidInput">
                {formErrors[Object.keys(formErrors)[0]]}
              </p>
            )}

            <div className='buttons'>
              <a href='/home'>Voltar</a>
              <button type="submit">Salvar</button>
            </div>
            
           
          </fieldset>

        </FormContainer>
      </ContainerRegister>
      <ImgBackground src={backgroundImg} alt="" />
    </Container>
  )
}
