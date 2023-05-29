import { createContext, ReactNode } from 'react'

import api from '../services/api';

interface usersProps {
  name: string;
  user: string;
  birthDate: Date;
  email: string;
  password: string;
  profile_photo: string | null;
}

type SignInCredentials = {
  email: string;
  password: string;
}

interface editUsersProps {
  id: string | undefined;
  name: string;
  username: string;
  birthDate: Date;
  email: string;
  password: string;
  profilePhoto?: string | null;
}

interface CommentProps {
  postId: string;
  username: string;
  content: string;
}

interface CreatePostInput {
  urlImage: string;
  username: string;
  description: string;
}

interface UsersProviderProps {
  children: ReactNode
}



interface UsersContextType {
  createPost: (data: CreatePostInput) => Promise<void>
  registerUser: (data:usersProps) => Promise<void>
  editProfileUser: (data:editUsersProps) => Promise<void>
  deletePost: (data:string) => Promise<void>
  createComment: (data: CommentProps) => Promise<void>
  deleteComment: (idPost: string, commentToDelete: string) => Promise<void>
  signIn(credentials: SignInCredentials): Promise<boolean>;
  logout(): Promise<void>;
}

export const DataContext = createContext({} as UsersContextType)

export function DataProvider({children}: UsersProviderProps) {
  // ARRUMAR
  async function createPost(data: CreatePostInput) {
    const { description, username } = data
    const newPost = {      
      username: username,
      postDate: new Date(),
      description: description,
      urlImage: "",
    }

    await api.post('/posts', newPost)
  }

  async function deletePost(postToDelete: string) {
    await api.delete(`posts/${postToDelete}`)
    window.location.href = '/home';
  }

  async function registerUser(data: usersProps) {
    const { name, user, birthDate, email, password } = data
    const newUser = {
      name,
      username: user,
      birthDate,
      email,
      password,
      profilePhoto: "",
    }
    await api.post('/users', newUser)
  }

  async function editProfileUser(data: editUsersProps) {
    const { id, name, username, password, birthDate, email, profilePhoto } = data
    const newUser = {
      name,
      username,
      birthDate,
      email,
      password,
      profilePhoto: profilePhoto,
    }

    await api.put(`/users/${id}`, newUser)
  }

  async function signIn({ email, password}: SignInCredentials) {
    try {
      const response = await api.post('/login', {
        email,
        password,
      })

        const token = response.data.jwt;
        localStorage.setItem('@PithanAnimeSocialMidia:authToken', token);
        return true
    } catch (error) {
      console.log(error)
    }
    return false;
  }

  async function logout() {
    localStorage.removeItem('@PithanAnimeSocialMidia:authToken');
    window.location.href = '/';
  };

  async function createComment(data: CommentProps) {
    const { postId, username, content } = data
    const newComment = {      
      postId,
      username,
      content,
    }

    await api.post(`/posts/${postId}/comments`, newComment)
  }

  async function deleteComment(idPost: string, commentToDelete: string) {
    await api.delete(`posts/${idPost}/comments/${commentToDelete}`)
    window.location.href = '/home';
  }


  return (
    <DataContext.Provider value={{ signIn, logout, createPost, editProfileUser, deletePost, createComment,deleteComment, registerUser }}>
      {children}
    </DataContext.Provider>
  )
}