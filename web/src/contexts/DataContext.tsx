import { createContext, ReactNode, useEffect, useState } from 'react'

import ilhaDoComendador from '../assets/ilhaDoComendador.png'

interface usersProps {
  name: string;
  user: string;
  birthDate: string;
  email: string;
  password: string;
  profile_photo: string | null;
}

interface PostProps {
  user?: string;
  name?: string;
  profile_photo?: string;
  post_date: Date | string;
  description: string;
  likes: number;
  comments: CommentProps[];
  url_imagem?: string;
}

interface CommentProps {
  user: string;
  name: string;
  profile_photo: string | null;
  comment: string;
}

interface CreatePostInput {
  description: string;
  url_imagem: string;
}

interface UsersProviderProps {
  children: ReactNode
}

interface UserAuthenticate {
  user: string;
  password: string;
}

interface userLoggedProps {
  name: string;
  profile_photo: string;
}

interface UsersContextType {
  users: usersProps[];
  posts: PostProps[];
  userlogged: userLoggedProps | null | undefined;
  createPost: (data: CreatePostInput) => Promise<void>
  userAuthenticate: (data: UserAuthenticate) => Promise<boolean>
  registerUser: (data:usersProps) => Promise<void>
}

export const DataContext = createContext({} as UsersContextType)

export function DataProvider({children}: UsersProviderProps) {
  const [users, setUsers] = useState<usersProps[]>([])
  const [posts, setPosts] = useState<PostProps[]>([
    {
      user: "victorpithan",
      name: "Victor Pithan",
      profile_photo: "https://github.com/victorpithan.png",
      post_date: new Date("2023-04-28T16:15:00"),
      description: "Minha última viagem para a ilha do Comendador, um lugar simplesmente incrível, natureza praticamente intocada. Recomendo a todos que apreciam o mundo como ele é.",
      likes: 100,
      comments: [
        {
          user: "diegosuarez",
          name: "Diego Suarez",
          profile_photo: null,
          comment: "Linda foto Victor! 🌊"
        },
        {
          user: "luizbrugnera",
          name: "Luiz Brugnera",
          profile_photo: null,
          comment: "Que praia maravilhosa!"
        }
      ],
      url_imagem: ilhaDoComendador
    },
  ])
  const [userlogged, setUserlogged] = useState<userLoggedProps | null>()

  useEffect(() => {
    fetch('http://localhost:3333/api/v1/user')
      .then(response => response.json())
      .then(data => {
        const newUsers: usersProps[] = data.users
        setUsers([...users, ...newUsers])
      })

    fetch('http://localhost:3333/api/v1/user/post')
      .then(response => response.json())
      .then(data => {
        setPosts([...posts, ...data])
      })
  }, [])

  async function createPost(data: CreatePostInput) {
    const { description } = data
    const newPost = {      
      user: userlogged?.name,
      name: userlogged?.name,
      profile_photo: userlogged?.profile_photo,
      post_date: new Date(),
      description: description,
      likes: 0,
      comments: [],
      url_imagem: "",
    }

    setPosts([newPost, ...posts])
  }

  async function registerUser(data: usersProps) {
    const { name, user, birthDate, email, password } = data
    const newUser = {
      name,
      user,
      birthDate,
      email,
      password,
      profile_photo: null,
    }
    // IMPLEMENT POST ROUTE
  }

  async function userAuthenticate(data: UserAuthenticate) {
    let isAuthenticated = false;
    await fetch('http://localhost:3333/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        userName: data.user,
        password: data.password
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Não foi possível fazer o login");
        }
        return response.json();
      })
      .then(data => {
        localStorage.setItem('@userAuth', JSON.stringify(data))
        setUserlogged(JSON.parse(localStorage.getItem('@userAuth')!))
        isAuthenticated = true 
      })
      .catch((err) => {})
      return isAuthenticated
  }

  return (
    <DataContext.Provider value={{ users, posts, userlogged, createPost, userAuthenticate, registerUser }}>
      {children}
    </DataContext.Provider>
  )
}